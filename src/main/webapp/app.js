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
    .controller('JSStelle', ['$scope', '$http', function($scope, $http) {
        $scope.nome='Aprile 23 - 1';
        $scope.colonne=7;
        $scope.righe=7;
        $scope.stellePerZona=1;
        $scope.zoneColore=4;
        $scope.fase='I';//I -> inizializza P -> progetta F -> gioca
		$scope.coloriZona=[];
		$scope.coloriZona.push('white');
		$scope.coloriZona.push('#DCDCDC');
		$scope.coloriZona.push('#C0C0C0');
		$scope.coloriZona.push('#E0FFFF');
		$scope.coloriZona.push('#00FFFF');
		$scope.coloriZona.push('lightgreen');
		$scope.coloriZona.push('yellow');
		$scope.coloriZona.push('orange');
		$scope.coloriZona.push('cyan');
		$scope.coloriZona.push('green');
		$scope.coloriZona.push('maroon');

		$scope.leggiListaStelle= function(){
            $scope.stelleSalvate = [];
	    	$http.get("/logika/stelle").then(function(response) {
	          	for (var i=0; i < response.data.length; i++) {
					el={ 
						prog: i, 
						id: response.data[i].id, 
						zone: response.data[i].zone, 
						nome: response.data[i].nome,
						stellePerZona: response.data[i].stellePerZona,
						board: response.data[i].board,
						boardGioco: response.data[i].boardGioco,
					 };
	            	$scope.stelleSalvate.push(el);
	          	}
		        $scope.stelleSelezionata = null;
			  
	        })
	        .catch(function(error) {
	            console.log(error);
	        });
		}


		$scope.leggiListaStelle();

		$scope.carica= function(daCaricare){
	        $scope.id=daCaricare.id;
	        $scope.nome=daCaricare.nome;
	        $scope.righe=0;
	        $scope.colonne=0;
	        $scope.stellePerZona=daCaricare.stellePerZona;
			$scope.zoneColore=daCaricare.zone;
			$scope.colora=1;
			$scope.board=daCaricare.board;
			$scope.boardGioco=daCaricare.boardGioco;
        	$scope.fase='P';
		}


		$scope.cancella= function(id){
        	$http.delete("/logika/stelle/" + id).then(function() {
				$scope.leggiListaStelle();
            })
            .catch(function(error) {
                console.log(error);
            });
		}

		$scope.progetta= function(){
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
		$scope.impostaValoreCella= function(){
        	$scope.colora=$scope.colora+1;
        	if ($scope.colora == $scope.zoneColore +1){
				$scope.colora =1; 		
			}
		}

		$scope.clickCella= function(righe,colonne){
        	if ($scope.fase=='P'){
				$scope.cambiaValoreCella(righe,colonne);
			} else {
	        	if ($scope.boardGioco[righe][colonne]==' ') {
					$scope.boardGioco[righe][colonne]="-";
				} else if ($scope.boardGioco[righe][colonne]=='-') {
					$scope.boardGioco[righe][colonne]="*";
				} else if ($scope.boardGioco[righe][colonne]=='*') {
					$scope.boardGioco[righe][colonne]="?";
				} else {
					$scope.boardGioco[righe][colonne]=" ";
				}
			}
		}
		
		$scope.scriviCella= function(righe,colonne){
        	if ($scope.fase=='P'){
	        	return $scope.board[righe][colonne];
			} else {
	        	return $scope.boardGioco[righe][colonne];
			}
		}
		
		$scope.cambiaValoreCella= function(righe,colonne){
        	$scope.board[righe][colonne]=$scope.colora;
		}
		
		$scope.coloraCella=function(cella){
			return $scope.coloriZona[cella];
		}
		$scope.sizeFont=function(){
        	if ($scope.fase=='P'){
				return '1px';
			} else {
				return '20px';
			}
		}
		$scope.coloraFontCella=function(righe,colonne){
        	if ($scope.fase=='P'){
				return $scope.coloraSfondo(righe,colonne);
			} else {
				return 'black';
			}
		}
		$scope.coloraSfondo=function(righe,colonne){
			return $scope.coloraCella($scope.board[righe][colonne]);
		}
		$scope.ricomincia= function(){
        	$scope.fase='I';
			$scope.leggiListaStelle();
		}
		$scope.inserisci= function(){
	        var body={
				zone: $scope.zoneColore,
				nome: $scope.nome,
				board: $scope.board,
				stellePerZona: $scope.stellePerZona
			};
        	$http.post("/logika/stelle",body).then(function(response) {
	        	$scope.avviaGioco();
	        	$scope.id=response.data.id;
				$scope.timeAttuale=response.headers('Time-Attuale');
            })
            .catch(function(error) {
                console.log(error);
            });
		}
		$scope.aggiorna= function(){
	        var body={
				zone: $scope.zoneColore,
				nome: $scope.nome,
				board: $scope.board,
				boardGioco: $scope.boardGioco,
				stellePerZona: $scope.stellePerZona
			};
        	$http.put("/logika/stelle/"+$scope.id, body).then(function(response) {
	        	$scope.fase='G';
				$scope.timeAttuale=response.headers('Time-Attuale');
            })
            .catch(function(error) {
                console.log(error);
            });
		}
		$scope.avviaGioco= function(){
			$scope.boardGioco=[];
			for (var r=0; r < $scope.board.length; r++) {
			  $scope.boardGioco[r]=[];
			  for (var c=0; c < $scope.board[r].length; c++) {
			    $scope.boardGioco[r][c]=' ';
			  }
			}
        	$scope.fase='G';
		}

		}])
    .controller('JSController', ['$scope','$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
					
		$scope.init= function(){
	        $scope.inizio='OK';
		}

		$scope.vai=function(){
        	$http.get("/logika/all").then(function(response) {
				$scope.timeAttuale=response.headers('Time-Attuale');
	            $scope.retVai=response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
		}
					
		}]);
