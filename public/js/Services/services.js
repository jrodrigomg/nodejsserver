angular.module('services',[])

.factory('$socket',function(socketFactory){
	var socket = io.connect({'force new connection':true, 'max reconnection attemps': 3,transports: ["websocket"],'reconnection':true,'reconnection delay':1000});
	mySocket = socketFactory({
		ioSocket: socket
	});
	return mySocket;
});
