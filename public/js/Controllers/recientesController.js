angular.module('controllers',['services'])
.controller('recientesCtrl', ['$scope', '$mdSidenav', '$window','$socket', function ($scope, $mdSidenav, $window, $socket) {
	$scope.mensaje = [];

    $socket.on('nuevotweet',function(tweet){
        $scope.mensaje.push({
            nombre:  tweet.user,
            alias: tweet.alias,
            message: tweet.txt,
            categoria: tweet.categoria
        });
        if($scope.mensaje.length > 10)
            $scope.mensaje.shift();
    });

    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

}]);

message.controller('buscarCtrl', ['$scope', '$mdSidenav', '$window', function ($scope, $mdSidenav, $window) {
	$scope.mensaje = [];
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    function callWS(){
    	for(var i=0;i<10;i++){
    		$scope.mensaje.push({
    			nombre: "Nombre"+Math.floor((Math.random() * 10) + 1),
    			message: "Hola este es mi twt"+Math.floor((Math.random() * 10) + 1),
    			categoria: "categoria"+Math.floor((Math.random() * 10) + 1)
    		});
   		}
    }

    function clearHeap(){
    	for(var i=0;i<10;i++){
    		$scope.mensaje.shift();
    	}
    }

    setInterval(function() {
  	// method to be executed;
  	  $scope.$apply(function() {
            clearHeap();
            callWS();
        });
	}, 5000);

	callWS();
}])

.controller('menuCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.usuarios   = 0;
    $scope.mensajes   = 0;
    $scope.categorias = 0;
    
    setInterval(function() {
    // method to be executed;
      $scope.$apply(function() {
            callWS();
        });
    }, 3000);

     function callWS(){
            $scope.usuarios   +=   Math.floor((Math.random() * 2) + 1);
            $scope.mensajes   +=   Math.floor((Math.random() * 10) + 1);
            $scope.categorias +=   Math.floor((Math.random() * 2) + 1);

    }

}]);
