from requests import Request, Session, exceptions
import grequests
from threading import Thread, Lock
from queue import Queue
from time import sleep

class HTTP_handler:
    
    _queue = None
    _url = None
    _pending = None
    _queue_lock = None

    def __init__(self):
        self._queue = Queue()
        self._url = 'http://httpbin.org/'   # placeholder until we find a host
        self._pending = 0
        self._queue_lock = Lock()

    #   Anytime the sensor picks up interesting activity (entering or leaving)
    #   call this method to create a thread that sends the POST call, so that it doesn't block
    def handle(self, event_type):
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
                print("OK: " + str(response.status_code)) 
                return
            except (exceptions.Timeout, exceptions.HTTPError) as e:
                sleep(2**sleep_time)
                sleep_time = sleep_time + 1
                tries = tries + 1
                continue
        self._queue.put_nowait(grequests.post(self._url, json={'count':event_type}))

        # If we have enough previously failed calls, attempt to send them at once
        with self._queue_lock:
            self._pending = self._pending + 1
            if (self._pending == 5):
                self._send_batch()
                self._pending = 0
        print(self._pending)

        
    #   Start a batch POST request for previously failed POST calls
    #   Send POST calls for every event in the queue, and empty it of successful ones once finished
    #   Uses grequests library to send all POST calls at the same time 
    def _send_batch(self):
        pending_calls = []
        while (self._queue.qsize() != 0):
            pending_calls.append(self._queue.get_nowait())
        
        grequests.map(pending_calls, gtimeout=5)
        # only keep queue entries that didn't get an OK response from the server
        for call in pending_calls:
            if (self._is_invalid(call)):
                self._queue.put_nowait(call)
    
    def _is_invalid(self, request):
        return request.response is None or not request.response.ok

#   For testing purposes
if __name__ == '__main__':
    h = HTTP_handler()

    h.handle("up")
    h.handle("down")
    h.handle("down")
