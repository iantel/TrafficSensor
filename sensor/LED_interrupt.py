import RPi.GPIO as GPIO
import requests
import time
import HTTP_handler

sensor1_state = 0 # 0 = LOW, 1 = HIGH
sensor2_state = 0

# pin: indicates the pin on which the GPIO interrupt was triggered.
def sensor1_callback(pin):
	global sensor1_state
	global sensor2_state
	input = GPIO.input(pin)
	GPIO.output(17, input)
	if (input == 1): # sensor triggered by movement
		sensor1_state = 1
		print('sensor 1 tripped')
		if(sensor2_state == 1): # if the front triggered is high, then this is the 2nd sensor to trip, e.g someone is leaving the room
			sensor1_state = 0 	# set state to 0 to avoid false positives on leaving people
			print('leaving')
			send_http(-1)
	else:	# no movement detected
		sensor1_state = 0

def sensor2_callback(pin):
	global sensor1_state
	global sensor2_state
	input = GPIO.input(pin)
	GPIO.output(12, input)
	if (input == 1):
		sensor2_state = 1
		print('sensor 2 tripped')
		if(sensor1_state == 1):
			sensor2_state = 0
			print('entering')
			send_http(1)
	else:
		sensor2_state = 0

#setup GPIO pins on Pi
def initialize():
	GPIO.setmode(GPIO.BCM)
	GPIO.setwarnings(False)
	GPIO.setup(26, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) #PIR sensor 1
	GPIO.setup(17, GPIO.OUT) # LED 1, goes high when sensor 1 is triggered (for testing)
	GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) #PIR sensor 2
	GPIO.setup(12, GPIO.OUT) # LED 2, high when sensor 2 is triggered

	# Enable interrupt detection on PIR sensor high edge or low edge.
	GPIO.add_event_detect(26, GPIO.BOTH, callback=sensor1_callback, bouncetime=300)
	GPIO.add_event_detect(23, GPIO.BOTH, callback=sensor2_callback, bouncetime=300)

initialize()

# Interrupt driven event loop, dont need to do anything, just wait for interrupts from the sensors.
while(1):
	x = 1 # make compiler happy