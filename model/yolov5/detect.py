import argparse
import time
from pathlib import Path

import cv2
import torch
import torch.backends.cudnn as cudnn
from numpy import random

from models.experimental import attempt_load
from utils.datasets import LoadStreams, LoadImages
from utils.general import check_img_size, check_requirements, check_imshow, non_max_suppression, apply_classifier, \
    scale_coords, xyxy2xywh, strip_optimizer, set_logging, increment_path
from utils.plots import plot_one_box
from utils.torch_utils import select_device, load_classifier, time_synchronized
import time

start_time = time.time()

source = 'test.jpg'
weights = ['crowdhuman_yolov5m.pt']
save_dir = './save'
imgsz = 480
device = select_device('cpu')
set_logging()
model = attempt_load(weights, map_location=device)
stride = int(model.stride.max())  # model stride
imgsz = check_img_size(imgsz, s=stride)
#half = False  # half precision only supported on CUDA
names = model.module.names if hasattr(model, 'module') else model.names

def detect(dataset, save_name, save_img=True):

    # Get names and colors
    

    # Run inference
    if device.type != 'cpu':
        model(torch.zeros(1, 3, imgsz, imgsz).to(device).type_as(next(model.parameters())))  # run once
        
    for path, img, im0s, vid_cap in dataset:
        img = torch.from_numpy(img).to(device)
        img = img.float()  # uint8 to fp16/32
        img /= 255.0  # 0 - 255 to 0.0 - 1.0
        if img.ndimension() == 3:
            img = img.unsqueeze(0)

        # Inference
        pred = model(img, augment=opt.augment)[0]

        # Apply NMS
        pred = non_max_suppression(pred, 0.25, 0.45, classes=opt.classes, agnostic=opt.agnostic_nms)
        t2 = time_synchronized()


        # Process detections
        for i, det in enumerate(pred):  # detections per image

            im0, frame = im0s, getattr(dataset, 'frame', 0)

            save_path = save_dir + '/' + save_name  # img.jpg
            #s += '%gx%g ' % img.shape[2:]  # print string
            gn = torch.tensor(im0.shape)[[1, 0, 1, 0]]  # normalization gain whwh
            if len(det):
                # Rescale boxes from img_size to im0 size
                det[:, :4] = scale_coords(img.shape[2:], det[:, :4], im0.shape).round()

                # Print results
                #for c in det[:, -1].unique():
                #    n = (det[:, -1] == c).sum()  # detections per class
                #    s += f"{n} {names[int(c)]}{'s' * (n > 1)}, "  # add to string

                # Write results
                for *xyxy, conf, cls in reversed(det):
                    if save_img:  # Add bbox to image
                        label = f'{names[int(cls)]} {conf:.2f}'
                        if 'person' in label:
                            plot_one_box(xyxy, im0, label=label, color=[0, 0, 0], line_thickness=5)
                            #detect có người, send mqtt hoặc gì đó
                            #process here, not implemented yet
                           


            # Print time (inference + NMS)
            #print(f'{s}Done. ({t2 - t1:.3f}s)')


            cv2.imwrite(save_path, im0)


        #print(f"Results saved to {save_dir}{s}")

    #print(f'Done. ({time.time() - t0:.3f}s)')

parser = argparse.ArgumentParser()


parser.add_argument('--augment', action='store_true', help='augmented inference')
parser.add_argument('--classes', nargs='+', type=int, help='filter by class: --class 0, or --class 0 2 3')
parser.add_argument('--agnostic-nms', action='store_true', help='class-agnostic NMS')
    
opt = parser.parse_args()
#print(opt)
#check_requirements()


import os
root_dir = './test'

"""
while True:
    time.sleep(1000)
    for dir in os.listdir(root_dir):
        house = os.path.join(root_dir, dir)
        for subdir in os.listdir(house):
            room = os.path.join(house, subdir)
            # checking if it is a file
            image_path = os.path.join(room, 'result.png')
            dataset = LoadImages(image_path, img_size=imgsz, stride=stride)
            with torch.no_grad():
                detect(dataset)
"""
while True:
    time.sleep(1)
    print('begin')
    for dir in os.listdir(root_dir):
        img = os.path.join(root_dir, dir)
        dataset = LoadImages(img, img_size=imgsz, stride=stride)
        with torch.no_grad():
                detect(dataset, str(dir))
    print('done 1 time')