(function()
{
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$log', 'WeatherFactory', '$scope'];



    /* @ngInject */
    function MainController($log, WeatherFactory, $scope)
    {
        var vm = this;
        vm.title = 'MainController';

        activate();
        $scope.cityName = '';
        $scope.histories = [];

        function addHistory(name, time)
        {

            $scope.histories.push(
            {
                'name': name,
                'time': time,      
            });


        }

        $scope.format = function()
        {

            var name = $scope.cityName;
            var changed = name.replace(" ", "");
            changed = changed.toLowerCase();
            $scope.newWeather(changed);
        };

        $scope.newWeather = function(city)
        {
            
            var first = 'http://api.openweathermap.org/data/2.5/weather?q=';
            var appId = '&units=imperial&APPID=fbe8d3c5bbdf529fc2c01b2859b54fa3';
            var url = first + city + appId;


            WeatherFactory.getWeather(url).then(
                function(response)
                {
                    vm.weather = response.data;
                    addHistory(vm.weather.name, moment().format('MM-DD-YY h:mm:ss a'));
                },
                function(error)
                {
                    $log.error(error);
                });
           

        };

        function activate()
        {

            WeatherFactory.getWeather('http://api.openweathermap.org/data/2.5/weather?q=palmsprings&units=imperial&APPID=fbe8d3c5bbdf529fc2c01b2859b54fa3').then(
                function(response)
                {
                    vm.weather = response.data;
                    addHistory(vm.weather.name, moment().format('MM-DD-YY h:mm:ss a'));
                },
                function(error)
                {
                    $log.error(error);
                });

        }
    }
})();
