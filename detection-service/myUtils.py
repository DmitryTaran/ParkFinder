import numpy as np
from shapely.geometry import Polygon as shapely_poly
import cv2
from utils.datasets import letterbox


def cvFrameToYoloImage(frame):
    img = letterbox(frame)[0]
    img = img[:, :, ::-1].transpose(2, 0, 1)  # BGR to RGB, to 3x416x416
    img = np.ascontiguousarray(img)
    return img


def parseMarkUp(mark_up):
    parking_lots = []
    for lot in mark_up:
        parking_lot = []
        for point in lot['points']:
            parking_lot.append((point['x'], point['y']))
        parking_lots.append(parking_lot)
    return parking_lots


def getCarBoxes(detected_boxes):
    boxes = list(filter(lambda box: box['class'] in [2, 6, 7], detected_boxes))
    return [box['points'] for box in boxes]


def compute_overlaps(parking_lots, car_boxes):
    car_boxes_points = []
    for box in car_boxes:
        x1 = box[0]
        y1 = box[1]
        x2 = box[2]
        y2 = box[3]

        p1 = (x1, y1)
        p2 = (x2, y1)
        p3 = (x2, y2)
        p4 = (x1, y2)
        car_boxes_points.append([p1, p2, p3, p4])

    overlaps = np.zeros((len(parking_lots), len(car_boxes_points)))
    for i in range(len(parking_lots)):
        for j in range(len(car_boxes)):
            pol1_xy = parking_lots[i]
            pol2_xy = car_boxes_points[j]
            polygon1_shape = shapely_poly(pol1_xy)
            polygon2_shape = shapely_poly(pol2_xy)
            overlaps[i][j] = get_iou(polygon1_shape, polygon2_shape)
    return overlaps


def get_iou(polygon1, polygon2):
    if polygon1.intersects(polygon2):
        polygon_intersection = polygon1.intersection(polygon2).area
        polygon_union = polygon1.union(polygon2).area
        return polygon_intersection / polygon_union
    else:
        return 0


def getFreeParkingLotsCount(parking_lots, overlaps):
    count = 0
    checked_lots = []
    for lot, overlap in zip(parking_lots, overlaps):
        max_IoU_overlap = np.max(overlap)
        if max_IoU_overlap < 0.15:
            checked_lots.append(dict({'lot': lot, 'isFree': True}))
            count += 1
        else:
            checked_lots.append(dict({'lot': lot, 'isFree': False}))
    return [checked_lots, count]


def drawLotsOnImage(parking_lots, image):
    for lot in parking_lots:
        points = np.array(lot['lot'], np.int32)
        points = points.reshape((-1, 1, 2))
        if  lot['isFree']:
            cv2.polylines(image, [points], isClosed=True, color=(0, 255, 0), thickness=2)
        else:
            cv2.polylines(image, [points], isClosed=True, color=(0, 0, 255), thickness=2)

