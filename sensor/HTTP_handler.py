import requests
import grequests
import threading


class HTTP_handler:
    
    _queue = []
    url = ""

    def __init__(self):
        print("Set backend url here.")

    #   Anytime the sensor picks up interesting activity (entering or leaving)
    #   call this method to create a thread that sends the POST call, so that it doesn't block
    def init_thread(self, event_type):
        t = threading.Thread(target=self.send_post, args=(event_type,))
        t.start()

    #   Send POST call, waits for return code, if its not 200, error is raised and we put the event
    #   onto a queue, to try and send later.    
    def send_post(self, event_type):
        event_str = 'up' if event_type == 1 else 'down'
        # timeout is 3 seconds at which point we store it on a queue to POST at a later point in time.
        try:
            response = requests.post("http://httpbin.org/get", json={'count':event_str}, timeout=3.0)
            response.raise_for_status # raise an HTTPError if response code wasn't 200
            print(response.text)
        except (requests.exceptions.Timeout, requests.exceptions.HTTPError) as e:
            print(e)
            __queue.append(event_type) # save failed update on a queue and attempt to POST it later
    def send_batch(self):
        return

if __name__ == '__main__':
    h = HTTP_handler()
    h.init_thread('up')
    for i in range(10):
        print(i)