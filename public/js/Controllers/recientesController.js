message.controller('recientesCtrl', ['$scope', '$mdSidenav', '$window', function ($scope, $mdSidenav, $window) {
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

        $scope.mensaje=[];
    	/*
        for(var i=0;i<10;i++){
            $scope.mensaje.shift();
        }
        */
    }

    setInterval(function() {
  	// method to be executed;
  	  $scope.$apply(function() {
            clearHeap();
            callWS();
        });
	}, 5000);

	callWS();
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
}]);