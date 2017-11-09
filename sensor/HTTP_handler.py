import requests

class HTTP_handler:
    #   Anytime the sensor picks up interesting activity (entering or leaving)
    #   call this method to send a POST call to backend and update room population count accordingly
    __queue = []

    @staticmethod
    def post_event(event_type):
        # timeout is 5 seconds at which point we store it on a queue.
        try:
            response = requests.post("http://httpbin.org/post", data={'event':event_type}, timeout=3.0)
        except requests.exceptions.Timeout:
            __queue.append(event_type)