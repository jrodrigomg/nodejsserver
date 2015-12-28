angular.module('services',[])

.factory('$socket',function(socketFactory){
	var socket = io.connect({transports: ["websocket"],'reconnection':true,'reconnection delay':5000});
	mySocket = socketFactory({
		ioSocket: socket
	});
	return mySocket;
});