import requests

class HTTP_handler:
    
    __queue = []
    url = ""

    def __init__(self):
        print("Set backend url here.")

    #   Anytime the sensor picks up interesting activity (entering or leaving)
    #   call this method to send a POST call to backend and update room population count accordingly
    @staticmethod
    def post_event(event_type):
        event_str = 'up' if event_type == 1 else 'down'
        # timeout is 5 seconds at which point we store it on a queue to POST at a later point in time.
        try:
            response = requests.post("http://httpbin.org/post", data={'event':event_str}, timeout=3.0)
        except requests.exceptions.Timeout:
            __queue.append(event_type) # save failed update on a queue and attempt to post it later