from requests import Request, Session, exceptions
import grequests
from threading import Thread
from time import sleep

class HTTP_handler:
    
    _queue = None
    _url = None
    _pending = None

    def __init__(self):
        self._queue = []
        self._url = 'http://httpbin.org/post'
        self._pending = 0

    #   Anytime the sensor picks up interesting activity (entering or leaving)
    #   call this method to create a thread that sends the POST call, so that it doesn't block
    def init_thread(self, event_type):
        t = Thread(target=self._send_post, args=(event_type,))
        t.start()


    #   Send POST call, waits for return code, if its not 200, retry a few more times
    #   then put the request onto a queue to be attempted later (in batch)   
    def _send_post(self, event_type):
        tries = 0
        sleep_time = 1
        while (tries < 3):
            print("Attempting to send...")
            # timeout is 3 seconds at which point we store it on a queue to POST at a later point in time.
            request = Request('POST', self._url, json={'count':event_type}).prepare()
            try:
                response = Session().send(request, timeout=3.0)
                response.raise_for_status() # raise an HTTPError if response code wasn't 200 
                return
            except (exceptions.Timeout, exceptions.HTTPError) as e:
                sleep(2**sleep_time)
                sleep_time = sleep_time + 1
                tries = tries + 1
                continue
        self._queue.append(grequests.post(self._url, json={'count':event_type}))
    
    #   Start a thread that will send a batch request for previously failed POST calls
    def _init_batch(self):
        t = Thread(target=self._send_batch)
        t.start()
        t.join()
    #   Send POST calls for every event in the queue, and empty it of successful ones once finished
    #   Uses grequests library to send all POST calls at the same time 
    def _send_batch(self):
        grequests.map(self._queue)
        # for i in range(len(requests)):
        #     if (requests[i] is not None):
        #         if requests[i].response == 200: # clear queue of requests that sent successfully
        #             print(requests[i].response)
        #             del self._queue[i]

                    
#   For testing purposes
if __name__ == '__main__':
    h = HTTP_handler()
    h._queue = [grequests.post(h._url, json={'count':'up'}),
    grequests.post(h._url, json={'count':'up'}),
    grequests.post(h._url, json={'count':'up'}),
    grequests.post(h._url, json={'count':'up'})]

    h._init_batch()
    while (h._queue[0].response is None):
       print(h._queue[0].response)
    # for i in range(len(h._queue)):
    #     print(h._queue[i].response)