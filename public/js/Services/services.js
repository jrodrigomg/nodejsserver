angular.module('services',[])

.factory('$socket',function(socketFactory){
	var socket = io.connect("http://192.168.122.121:3000",{transports: ["websocket"]});
	mySocket = socketFactory({
		ioSocket: socket
	});
	return mySocket;
});