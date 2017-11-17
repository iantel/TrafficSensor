import asyncio
import aiohttp
from threading import Thread

class HTTP_handler:

	_url = None
	_event_loop = None
	_worker_thread = None
	_pending_calls = None


	# POST calls triggered by sensors are handled by a worker thread, running an async event loop
	# this is different vs the old implementation where a new thread was spawned for each call. 
	def __init__(self):
		self._url = 'http://lit-brook-11855.herokuapp.com/rooms/'
		self._event_loop = asyncio.new_event_loop()
		self._worker_thread = Thread(target=self.start_worker, args=(self._event_loop,)) 
		self._worker_thread.start()
		self._pending_calls = []
		print('started')

	def start_worker(self, loop): # start the event loop in the worker thread
		asyncio.set_event_loop(loop)
		loop.run_forever()


	async def handle(self, event_type):
		print('hello')
		async with aiohttp.ClientSession() as session:
			response_code = await self.send_post(session, event_type)
			print(response_code)


	# by default POST will auto timeout after 5 minutes.
	async def send_post(self, session, event_type):
		print('in post')
		url = self._url
		async with session.post(url, params={'name':'BA3200', 'count': event_type}) as response:
			return response.status

#   For testing purposes
if __name__ == '__main__':
	h = HTTP_handler()
	asyncio.run_coroutine_threadsafe(h.handle('up'), h._event_loop)