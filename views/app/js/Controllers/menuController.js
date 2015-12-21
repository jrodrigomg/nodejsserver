message.controller('menuCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
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
