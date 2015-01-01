'use strict';
 console.log('loaded');
angular.module('psJwtApp').service('alert', function ($rootScope, $timeout) { 
    var alertTimeout; 
    return function(type,title,message,timeout){ 
        $rootScope.alert = {
            hasBeenShown:false,
            show:true,
            type:type,
            message: message,
            title: title
        };
        $timeout.cancel(alertTimeout);
        alertTimeout = $timeout(function(){ 
            $rootScope.alert.show = false;
        }, timeout || 3000 );
    }
  });
