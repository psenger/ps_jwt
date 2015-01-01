'use strict';

angular.module('psJwtApp')
  .controller('RegisterCtrl', function($scope, $rootScope, $http, alert) {
    $scope.submit = function() {
      
      var url = "/";
      var user = {};
        
      $http.post(url, user)
        .success(function(res) {
          console.log('sucess');
        })
        .error(function(err) { 
          alert('warning','Opps!','Could not register');
        });
    };
  });
