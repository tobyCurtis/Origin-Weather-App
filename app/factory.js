(function() {
    'use strict';

    angular
        .module('app')
        .factory('WeatherFactory', WeatherFactory);// https://docs.angularjs.org/guide/services

    WeatherFactory.$inject = ['$http', '$log', '$q']; // https://github.com/johnpapa/angular-styleguide/tree/master/a1#manual-annotating-for-dependency-injection

    /* @ngInject */
    function WeatherFactory($http, $log, $q) {

        var service = {
            getWeather: getWeather
        };
        return service;

//'http://api.openweathermap.org/data/2.5/weather?q=sandiego&APPID=fbe8d3c5bbdf529fc2c01b2859b54fa3'
        function getWeather(url) {

            var defer = $q.defer();

            $http({
                    method: 'GET',
                    url: url
                }).then(function(response){
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                            toastr.success('We found your city!');
                        } else {
                            defer.reject(response);
                            //error if found but empty
                            toastr.warning('No city found </br>' + response.config.url);
                        }
                    },
                    // failure
                    function(error){
                        //error if the file isn't found
                        defer.reject(error);
                        $log.error(error);
                        toastr.error('error: ' + error.data + '<br/>status: ' + error.statusText);
                    });

            return defer.promise;
             }
         }
    
})();
