# Importing Libraries
import cv2
import matplotlib.pyplot as plt
import numpy as np
import pygame.camera
import pygame.image
import sys
import os
import time

# Program Constants
THRESHOLD = 0.1
POINT_CONNECTIONS = [[0,1], [1,2], [2,3], [3,4], [1,5], [5,6], [6,7],[1,14],
[14,8], [8,9], [9,10], [14,11], [11,12], [12,13]]

# Fonts & Text
pygame.init()
mediumFont = pygame.font.Font("OpenSans-Regular.ttf", 30)
startText = mediumFont.render("Jumping Jack Started!", True, (10, 255, 1))
endText = mediumFont.render("Jumping Jack Completed!", True, (10, 255, 1))

# Loading the Pre-Trained Neural Network
# --> Caffe Deep Learning Framework: https://caffe.berkeleyvision.org/
prototxtPath = "pose_deploy_linevec_faster_4_stages.prototxt"
weightsPath = "pose_iter_160000.caffemodel"
network = cv2.dnn.readNetFromCaffe(prototxtPath, weightsPath)

# Defining Jumping Jack Boolean
started = False

# Defining Jumping Jack Helper Functions
def verify_arms_up(points):
    
    # Defining Default Positions
    head, right_wrist, left_wrist = 0, 0, 0

    # Finding Corresponding Coordinates
    for i, point in enumerate(points):
        if i == 0:
            head = point[1]
        elif i == 4:
            right_wrist = point[1]
        elif i == 7:
            left_wrist = point[1]
  
    # Checking Body Coordinates
    if right_wrist < head and left_wrist < head:
        return True
    else:
        return False

def verify_legs_apart(points):

    # Defining Default Positions
    left_hip, rigth_hip = 0, 0
    left_ankle, right_ankle = 0, 0

    # Finding Corresponding Coordinates
    for i, point in enumerate(points):
        if i == 11:
            left_hip = point[0]
        elif i == 8:
            rigth_hip = point[0]
        elif i == 13:
            left_ankle = point[0]
        elif i == 10:
            rigth_ankle = point[0]

    # Checking Body Coordinates
    if (left_ankle > left_hip) and (rigth_ankle < rigth_hip):
        return True
    else:
        return False

def jumping_jack_start(points):
    return not verify_arms_up(points) and not verify_legs_apart(points)

def jumping_jack_end(points):
    return verify_arms_up(points) and verify_legs_apart(points)

# Accessing Web Camera
pygame.camera.init()
cameras = pygame.camera.list_cameras()
webcam = pygame.camera.Camera(cameras[0])
webcam.start()

# Displaying Camera
img = webcam.get_image()
WIDTH = img.get_width()
HEIGHT = img.get_height()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pygame Camera View")

# Running Gesture Recognition
while True:

    # Checking for Events
    for e in pygame.event.get():

        # Checking for Quit Event
        if e.type == pygame.QUIT:

            # Quitting Program
            webcam.stop()
            sys.exit()

    # Drawing Current Frame
    screen.blit(img, (0,0))

    # Saving Current Frame
    pygame.image.save(img, 'temp.png') # 640 x 480
    frame = cv2.imread('temp.png')

    # Calling Network on Current Frame
    image_blob = cv2.dnn.blobFromImage(image = frame, scalefactor = 1.0 / 255, size = (256, 256))
    network.setInput(image_blob)
    output = network.forward()
    position_height = output.shape[2]
    position_width = output.shape[3]

    # Getting Body Coordinate Locations
    num_points = 15
    points = []

    # Looping Through Points
    for i in range(num_points):

        # Getting Coordinate Information
        confidence_map = output[0, i, :, :]
        _, confidence, _, point = cv2.minMaxLoc(confidence_map)
        x = int((frame.shape[1] * point[0]) / position_width)
        y = int((frame.shape[0] * point[1]) / position_height)

        # Checking Network Confidence
        if confidence > THRESHOLD:

            # Drawing Circle
            pygame.draw.circle(screen, (0, 255, 0), (x, y), 5)

            # Updating Points Array
            points.append((x, y))

        else:
            points.append(None)

    # Drawing Gesture Connections
    for connection in POINT_CONNECTIONS:

        # Getting Coordinates
        partA = connection[0]
        partB = connection[1]

        # Checking Coordinates
        if points[partA] and points[partB]:

            # Drawing Line
            pygame.draw.line(screen, (255, 0, 0), points[partA], points[partB])

    # Updating Screen
    pygame.display.flip()

    # Checking Jumping Jack Boolean
    if started == False:

        try:
            # Checking for Start
            if jumping_jack_start(points):

                # Updating Jumping Jack Boolean
                started = True

                # Adding Start Text
                screen.blit(startText, (50, 10))
                pygame.display.flip()
                pygame.image.save(screen, 'JJ Start.png')
                time.sleep(1)
        except: pass

    else:

        try:
            # Checking for End
            if jumping_jack_end(points):

                # Adding End Text
                screen.blit(endText, (50, 10))
                pygame.display.flip()
                pygame.image.save(screen, 'JJ End.png')

                # Adding Delay & Quitting Program
                time.sleep(5)
                webcam.stop()
                sys.exit()
        except: pass

    # Deleting Saved Image
    try: 
        os.remove("temp.png")
    except: pass

    # Updating Frame 
    img = webcam.get_image()




