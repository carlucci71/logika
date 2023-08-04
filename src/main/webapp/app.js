angular.module('myApp', [])
    .controller('JSController', ['$scope', '$http', '$location', function($scope, $http, $location) {
	        $scope.nome = 'nome';
		
		$scope.init= function(){
	        $scope.inizio = 'OK';
	        $scope.loading=true;
		}

		$scope.vai=function(){
        	$http.get("/logika/all").then(function(response) {
	        	$scope.loading=false;
				$scope.timeAttuale = response.headers('Time-Attuale');
	            $scope.retVai = response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
		}

		    

					
		}
    ]);
