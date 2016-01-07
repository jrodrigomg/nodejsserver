angular.module('services',[])

.factory('$socket',function(socketFactory){
	var socket = io.connect("192.168.2.30",{'force new connection':true, 'max reconnection attemps': 10,transports: ["websocket"],'reconnection':true,'reconnection delay':5000});
	mySocket = socketFactory({
		ioSocket: socket
	});
	return mySocket;
});
