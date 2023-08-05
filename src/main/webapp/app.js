angular.module('myApp', [])

	.run(function($rootScope) {
		$rootScope.getRange=function (numElements) {
 			var result=[];
          	for (var i=0; i < numElements; i++) {
            	result.push(i);
          	}
          	return result;
          };		    
	})
    .controller('JSStelle', ['$scope','$rootScope', '$http', function($scope, $rootScope, $http) {
       	$scope.loading=true;
        $scope.nome='Aprile 23 - 1';
        $scope.colonne=7;
        $scope.righe=7;
        $scope.stellePerZona=1;
        $scope.zone=4;
        $scope.fase='I';//I -> inizializza P -> progetta S -> salva
		$scope.coloriZona=[];
		$scope.coloriZona[0]='white';
		$scope.coloriZona[1]='grey';
		$scope.coloriZona[2]='lightgrey';
		$scope.coloriZona[3]='cyan';
		$scope.coloriZona[4]='lightcyan';
		$scope.coloriZona[5]='green';
		$scope.coloriZona[6]='lightgreen';
		$scope.coloriZona[7]='yellow';
		$scope.coloriZona[8]='maroon';
		$scope.coloriZona[9]='orange';
		$scope.coloriZona[10]='black';

    	$http.get("/logika/stelle").then(function(response) {
		  $scope.stelleSalvate = [];
          	for (var i=0; i < response.data.length; i++) {
				el={ 
					prog: i, 
					id: response.data[i].id, 
					zone: response.data[i].zone, 
					nome: response.data[i].nome,
					stellePerZona: response.data[i].stellePerZona,
					board: response.data[i].board,
				 };
            	$scope.stelleSalvate.push(el);
          	}
		  
        	$scope.loading=false;
        })
        .catch(function(error) {
            console.log(error);
        });
		
        $scope.stelleSelezionata = null;

		$scope.carica= function(daCaricare){
	        $scope.id=daCaricare.id;
	        $scope.nome=daCaricare.nome;
	        $scope.righe=0;
	        $scope.colonne=0;
	        $scope.stellePerZona=daCaricare.stellePerZona;
			$scope.zone=daCaricare.zone;
			$scope.colora=1;
			$scope.board=daCaricare.board;
        	$scope.fase='P';
		}

		$scope.progetta= function(righe,colonne,stelle,zone,nome){
	        $scope.nome=nome;
	        $scope.righe=righe;
	        $scope.colonne=colonne;
	        $scope.stellePerZona=stelle;
			$scope.zone=zone;
			$scope.colora=1;
			$scope.board=[];
			for (var r=0; r < $scope.righe; r++) {
			  $scope.board[r]=[];
			  for (var c=0; c < $scope.colonne; c++) {
			    $scope.board[r][c]=0;
			  }
			}
        	$scope.fase='P';
		}
		$scope.impostaValoreCella= function(cella){
        	$scope.colora=$scope.colora+1;
        	if ($scope.colora == $scope.zone +1){
				$scope.colora =1; 		
			}
		}
		
		$scope.cambiaValoreCella= function(righe,colonne){
        	$scope.board[righe][colonne]=$scope.colora;
		}
		
		$scope.coloraCella=function(cella){
			return $scope.coloriZona[cella];
		}
		$scope.coloraSfondo=function(righe,colonne){
			return $scope.coloraCella($scope.board[righe][colonne]);
		}
		$scope.inizializza= function(){
        	$scope.fase='I';
		}
		$scope.inserisci= function(nome, stellePerZona, zone){
	        $scope.loading=false;
	        var body={
				zone: zone,
				nome: nome,
				board: $scope.board,
				stellePerZona: stellePerZona
			};
        	$http.post("/logika/stelle",body).then(function(response) {
	        	$scope.loading=true;
	        	$scope.fase='S';
				$scope.timeAttuale=response.headers('Time-Attuale');
            })
            .catch(function(error) {
                console.log(error);
            });
		}
		$scope.aggiorna= function(id, nome, stellePerZona, zone){
	        $scope.loading=false;
	        var body={
				zone: zone,
				nome: nome,
				board: $scope.board,
				stellePerZona: stellePerZona
			};
        	$http.put("/logika/stelle/"+id, body).then(function(response) {
	        	$scope.loading=true;
	        	$scope.fase='S';
				$scope.timeAttuale=response.headers('Time-Attuale');
            })
            .catch(function(error) {
                console.log(error);
            });
		}

		}])
    .controller('JSController', ['$scope','$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
					
		$scope.init= function(){
	        $scope.inizio='OK';
	        $scope.loading=true;
		}

		$scope.vai=function(){
        	$http.get("/logika/all").then(function(response) {
	        	$scope.loading=false;
				$scope.timeAttuale=response.headers('Time-Attuale');
	            $scope.retVai=response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
		}
					
		}]);
