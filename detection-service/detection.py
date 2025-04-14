import time
import uuid
import torch
from numpy import random

from utils.general import non_max_suppression, \
    scale_coords, increment_path
from utils.plots import plot_one_box
from utils.torch_utils import time_synchronized


def detect(frame, image, model, device, confidence, iou):
    names = model.module.names if hasattr(model, 'module') else model.names
    colors = [[random.randint(0, 255) for _ in range(3)] for _ in names]

    t0 = time.time()
    image = torch.from_numpy(image).to(device)
    image = image.float()  # uint8 to fp16/32

    image /= 255.0  # 0 - 255 to 0.0 - 1.0

    if image.ndimension() == 3:
        image = image.unsqueeze(0)

    # Inference
    t1 = time_synchronized()
    with torch.no_grad():  # Calculating gradients would cause a GPU memory leak
        pred = model(image, augment=True)[0]
    t2 = time_synchronized()

    # Apply NMS
    pred = non_max_suppression(pred, confidence, iou, agnostic=True)
    t3 = time_synchronized()
    result = []
    # Process detections
    for i, det in enumerate(pred):  # detections per image

        s, im0 = '', frame
        path = str(uuid.uuid4()) + '.jpg'
        gn = torch.tensor(im0.shape)[[1, 0, 1, 0]]  # normalization gain whwh
        if len(det):
            # Rescale boxes from img_size to im0 size
            det[:, :4] = scale_coords(image.shape[2:], det[:, :4], im0.shape).round()

            # Print results
            for c in det[:, -1].unique():
                n = (det[:, -1] == c).sum()  # detections per class
                s += f"{n} {names[int(c)]}{'s' * (n > 1)}, "  # add to string

            # Write results
            for *xyxy, conf, cls in reversed(det):

                # xywh = (xyxy2xywh(torch.tensor(xyxy).view(1, 4)) / gn).view(-1).tolist()  # normalized xywh
                className = int(cls.cpu().numpy())
                points = []
                for x in xyxy:
                    points.append(float(x.cpu().numpy()))
                confidence = float(conf.cpu().numpy())
                jsonedResult = ({"class": className, "points": points, "confidence": confidence})
                line = (cls, *xyxy, conf)
                result.append(jsonedResult)
                label = f'{names[int(cls)]} {conf:.2f}'
                plot_one_box(xyxy, im0, label=label, color=colors[int(cls)], line_thickness=1)

        print(f'{s}Done. ({(1E3 * (t2 - t1)):.1f}ms) Inference, ({(1E3 * (t3 - t2)):.1f}ms) NMS')

    # print(f'Done. ({time.time() - t0:.3f}s)')
    return result
