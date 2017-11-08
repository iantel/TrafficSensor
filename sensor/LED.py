import RPi.GPIO as GPIO
import time

sleep = 0.05
sensor1_state = 0 # 0 = LOW, 1 = HIGH
sensor1_val = 0

sensor2_state = 0
sensor1_val = 0 
count = 0
def send_http():
	print (count)

def initialize():
	GPIO.setmode(GPIO.BCM)
	GPIO.setwarnings(False)
	GPIO.setup(26, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) #PIR sensor 1
	GPIO.setup(17, GPIO.OUT) # LED 1
	GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) #PIR sensor 2
	GPIO.setup(12, GPIO.OUT) # LED 2
	#time.sleep(30) # sleep for 30s to intialize PIR sensors
initialize()

# Poll sensors for now, may change to use GPIO interrupt instead
while(1):
	sensor1_read = GPIO.input(26)
	sensor2_read = GPIO.input(23)
	if(sensor1_read == 1):
		if (sensor1_state == 0): # only do stuff on motion detected (high edge)
			sensor1_state = 1
			GPIO.output(17,GPIO.HIGH)
			if(sensor2_state == 1): # somebody tripped sensor 2
				count = count + 1
				send_http()
	else: #PIR sensor has gone low
		if(sensor1_state == 1):
			sensor1_state = 0 
			GPIO.output(17, GPIO.LOW)
	if(sensor2_read == 1):
		if(sensor2_state == 0):
			sensor2_state = 1
			GPIO.output(12, GPIO.HIGH)
			if(sensor1_state == 1): # somebody tripped sensor 1
				if (count > 0):
					count = count - 1
					send_http()
	else: # PIR sensor 2 has gone low
		if(sensor2_state == 1):
			sensor2_state = 0
			GPIO.output(12, GPIO.LOW)
	time.sleep(sleep)
