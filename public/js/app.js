var message = angular.module('message', ['ngRoute', 'ngMaterial', 'ngAnimate','btford.socket-io','controllers']);
var configFunction = function ($routeProvider) {
    $routeProvider.
        when('/recientes', {
            templateUrl: 'templates/recientes.html',
            controller: 'recientesCtrl'
        })
        .when('/buscar', {
            templateUrl: 'templates/buscar.html',
            controller: 'buscarCtrl'
        })
        .otherwise({
            redirectTo: '/recientes'
        });

}
configFunction.$inject = ['$routeProvider'];

message.config(configFunction);


