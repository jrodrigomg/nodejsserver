angular.module('services',[])

.factory('$socket',function(socketFactory){
	var socket = io.connect({transports: ["websocket"]});
	mySocket = socketFactory({
		ioSocket: socket
	});
	return mySocket;
});