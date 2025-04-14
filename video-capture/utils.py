import cv2 as cv


def getCaptureWidthAndHeight(capture):
    return capture.get(cv.CAP_PROP_FRAME_WIDTH), capture.get(cv.CAP_PROP_FRAME_HEIGHT)


def denormalizeCoords(mark_up, width, height):
    for parking_lot in mark_up:
        points = parking_lot['points']
        for point in points:
            point['x'] *= width
            point['y'] *= height

    return mark_up
