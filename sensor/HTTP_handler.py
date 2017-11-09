import requests

#   Anytime the sensor picks up interesting activity (entering or leaving)
#   call this method to send a POST call to backend and update room population count accordingly
def post_event(event_type):
    # timeout is 5 seconds at which point we store it on a queue.
    response = requests.post("http://httpbin.org/post", data={'event':event_type}, timeout=3.0)