angular.module('controllers',['services'])
.controller('recientesCtrl', ['$scope', '$mdSidenav', '$window','$socket', function ($scope, $mdSidenav, $window, $socket) {
	$scope.mensajes = [];
    $scope.topsl = [];
    $socket.on('tweets',function(tweets){
        $scope.mensajes = [];
        $scope.mensajes = tweets;
    });


  

     chartMem = new Highcharts.Chart({
            chart: {
                renderTo: 'chartMemory',
                type: 'bar',
                events: {
                load: function() {
                    // Cada vez que reciba un valor desde el socket, lo meto en la gráfica
                    $socket.on('memoryUpdate', function (free, used, buffered, cached) {
                        chartMem.series[0].setData([{y: used, color: 'red'}, {y: free, color: 'black'}, {y: buffered, color: 'green'}, {y: cached, color: 'orange'}]);
                      });
                    }
                  }
            },
            title: {
                text: 'Memoria'
            },
            xAxis: {
                categories: ['Memoria en uso', 'Memoria Libre', 'En Buffer', 'En Cache'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Porcentaje",
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' %'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },            
            credits: {
                enabled: false
            },
            series: [{
                name: "Memory",
                data: [{y: 0, color: 'red'}, {y: 0, color: 'green'}, {y: 0, color: 'blue'}, {y: 0, color: 'orange'}]
            }]
        });
  $socket.on('toplist',function(tops){
         $scope.topsl = tops.split("\n");
         console.log(tops);
         $("#lista").text("");
         for(var i =0; i<$scope.topsl.length;i++){
            $("#lista").append("<li>"+$scope.topsl[i]+"</li>");
         }
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
    $scope.type = 0;
    $scope.info = {};


    $socket.on('tweetsf',function(tweets){
        $scope.mensajes = [];
        $scope.mensajes = tweets;
        $scope.info.alias = tweets[0].user;
        $scope.info.nombre = tweets[0].nombre;
    });


    $socket.on('tweetscf',function(count){
        $scope.info.tweets = count;
    });

    $scope.searchTweets = function(type){
        $scope.type = type;
        $scope.info  = {};
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
