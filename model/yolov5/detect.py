import argparse
import time

import cv2
import torch


from models.experimental import attempt_load
from utils.datasets import LoadImages
from utils.general import check_img_size, non_max_suppression,  \
    scale_coords, set_logging
from utils.plots import plot_one_box
from utils.torch_utils import select_device, time_synchronized





weights = ['crowdhuman_yolov5m.pt']
root_dir = './var/www/image'
imgsz = 200
device = select_device('cpu')
#set_logging()
model = attempt_load(weights, map_location=device)
stride = int(model.stride.max())  # model stride
imgsz = check_img_size(imgsz, s=stride)
#half = False  # half precision only supported on CUDA
names =  model.names

def detect(dataset, save_path, save_img=True):
        
    for _, img, im0s, _ in dataset:
        img = torch.from_numpy(img).to(device)
        img = img.float()  # uint8 to fp16/32
        img /= 255.0  # 0 - 255 to 0.0 - 1.0
        if img.ndimension() == 3:
            img = img.unsqueeze(0)

        # Inference
        pred = model(img, augment=opt.augment)[0]

        # Apply NMS
        pred = non_max_suppression(pred, 0.25, 0.45, classes=opt.classes, agnostic=opt.agnostic_nms)
        #t2 = time_synchronized()


        # Process detections
        for _, det in enumerate(pred):  # detections per image

            im0, _ = im0s, getattr(dataset, 'frame', 0)

            #s += '%gx%g ' % img.shape[2:]  # print string
            #gn = torch.tensor(im0.shape)[[1, 0, 1, 0]]  # normalization gain whwh
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
                            plot_one_box(xyxy, im0, label=label, color=[0, 0, 0], line_thickness=3)
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
import psutil
with torch.no_grad():
    while True:
        for dir in os.listdir(root_dir):
            house = os.path.join(root_dir, dir)
            for subdir in os.listdir(house):
                room = os.path.join(house, subdir)
                # checking if it is a file
                save_path = os.path.join(room, 'processed_result.png')
                image_path = os.path.join(room, 'result.png')
                if os.path.isfile(image_path):
                    dataset = LoadImages(image_path, img_size=imgsz, stride=stride)
                    detect(dataset, save_path)
        print(psutil.Process(os.getpid()).memory_info().rss / 1024 ** 2)  
        time.sleep(1)

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
"""