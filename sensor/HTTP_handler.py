from requests import Request, Session, exceptions
from grequests import map
from threading import Thread


class HTTP_handler:
    
    _queue = []
    _url = ""

    def __init__(self):
        self._url= 'http://httpbin.org/post'

    #   Anytime the sensor picks up interesting activity (entering or leaving)
    #   call this method to create a thread that sends the POST call, so that it doesn't block
    def init_thread(self, event_type):
        t = Thread(target=self._send_post, args=(event_type,))
        t.start()

    #   Send POST call, waits for return code, if its not 200, error is raised and we put the event
    #   onto a queue, to try and send later.    
    def _send_post(self, event_type):
        # timeout is 3 seconds at which point we store it on a queue to POST at a later point in time.
        try:
            request = Request('POST', self._url, json={'count':event_type}).prepare()
            response = Session().send(request)
            response.raise_for_status() # raise an HTTPError if response code wasn't 200
            print(response.status_code)

        except (exceptions.Timeout, exceptions.HTTPError) as e:
            print(e)
            self._queue.append(request) # save failed update on a queue and attempt to POST it later
            print(self._queue)
    
    #   Start a thread that will send a batch request for previously failed POST calls
    def init_batch(self):
        t = Thread(target=self._send_batch)

    #   Send POST calls for every event in the queue, and empty it of successful ones once finished
    #   Uses grequests library to send all POST calls at the same time 
    def _send_batch(self):
        requests = []
        while (len(_queue) != 0):
            requests.append(_queue.pop(0))
        map(requests)
        
        for (i in range(len(requests))):
            if (requests[i] is not None):
                if requests[i].status_code == 200: # clear queue of requests that sent successfully
                    del self._queue[i]

if __name__ == '__main__':
    h = HTTP_handler()
    h.init_thread('up')
    for i in range(10):
        print(i)