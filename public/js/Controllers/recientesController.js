angular.module('controllers',['services'])
.controller('recientesCtrl', ['$scope', '$mdSidenav', '$window','$socket', function ($scope, $mdSidenav, $window, $socket) {
	$scope.mensajes = [];
    $socket.on('tweets',function(tweets){
        $scope.mensajes = [];
        $scope.mensajes = tweets;
    });
    /*
    $socket.on('nuevotweet',function(tweet){
        $scope.mensaje = [];
        $scope.mensaje.push({
            nombre:  tweet.user,
            alias: tweet.alias,
            message: tweet.txt,
            categoria: tweet.categoria
        });

    });*/

    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

}]);

message.controller('buscarCtrl', ['$scope', '$mdSidenav', '$window','$socket', function ($scope, $mdSidenav, $window,$socket) {
	$scope.mensajes = [];
    $scope.usuario = "";
    $scope.categoria = "";
     $socket.on('tweetsf',function(tweets){
        $scope.mensajes = [];
        $scope.mensajes = tweets;
    });

    $scope.searchTweets = function(type){
        if(type==1){
            console.log('emitiendo'+type+$scope.usuario);
            $socket.emit('searchTweets',type,$scope.usuario);
        }else{
            console.log('emitiendo'+type+$scope.categoria);
            $socket.emit('searchTweets',type,$scope.categoria);
        }
        $scope.mensaje = [];
    }
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    /*setInterval(function() {
  	// method to be executed;
  	  $scope.$apply(function() {
            clearHeap();
            callWS();
        });
	}, 5000);

	callWS();*/
}])

.controller('menuCtrl', ['$scope', '$mdSidenav', '$socket', function ($scope, $mdSidenav, $socket) {
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.usuarios   = 0;
    $scope.mensajes   = 0;
    $scope.categorias = 0;

    $scope.usermax = {};
    $scope.categoriamax = {};

    $socket.on('tweetsc',function(count){
        if(count>0){
            $scope.mensajes = count;
        }
    });

    $socket.on('usersc',function(count){
        if(count>0){
            $scope.usuarios = count;
        }
    });

    $socket.on('categoriasc',function(count){
        if(count>0){
            $scope.categorias = count;
        }
    });

    $socket.on('usermax',function(resultado){
        $scope.usermax = resultado;
    });

    $socket.on('categoriamax',function(resultado){
        $scope.categoriamax = resultado;
    });

}]);
