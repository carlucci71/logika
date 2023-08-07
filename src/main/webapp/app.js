angular.module('myApp', ['ngSanitize'])

	.run(function($rootScope) {
		$rootScope.getRange=function (numElements) {
 			var result=[];
          	for (var i=0; i < numElements; i++) {
            	result.push(i);
          	}
          	return result;
          };		    
	})
    .controller('JSCrucipixel', ['$scope', '$sce', function($scope, $sce) {
		$scope.inizializza= function(){
	        $scope.id=null;
	        $scope.nome='Aprile 23 - 1';
	        $scope.maxIndicazioni=5;
	        $scope.colonne=15;
	        $scope.righe=10;
	        $scope.fase='I';//I -> iniz P -> progetta F -> gioca
	        /*
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
	        */
		}
		$scope.inizializza();
		$scope.progetta= function(){
			$scope.initBoard();				
        	$scope.fase='P';
		}
		$scope.getColor= function(righe,colonne){
			if (colonne==0) return 'black';
			return $scope.getBgColor(righe,colonne);
		}
		$scope.getBgColor= function(righe,colonne){
			if (righe==1 && colonne==1) return 'red';
			return 'white';
		}
		$scope.getCellaBoard= function(righe, colonne){
			if ($scope.board){
				if (colonne>0){
					 return $scope.board[righe][colonne-1];
				}
				return 'xxxxxxxxxxxxx';
			}
		}
		$scope.getIntestazioneBoard= function(colonna){
			if (colonna==0) {
				return '';
			} else {
				return  $sce.trustAsHtml(colonna+"<br>"+colonna);
			}
		}
		$scope.initBoard= function(){
			$scope.board=[];
			for (var r=0; r < $scope.righe; r++) {
			  $scope.board[r]=[];
			  for (var c=0; c < $scope.colonne; c++) {
		    	$scope.board[r][c]=0;
			  }
			}
		}
		}])
    .controller('JSGrattacieli', ['$scope', '$http', function($scope, $http) {
		$scope.inizializza= function(){
	        $scope.id=null;
	        $scope.nome='Aprile 23 - 1';
	        $scope.piani=4;
	        $scope.fase='I';//I -> iniz P -> progetta F -> gioca
			$scope.initBoard= function(){
				$scope.board=[];
				for (var r=0; r < $scope.piani+2; r++) {
				  $scope.board[r]=[];
				  for (var c=0; c < $scope.piani+2; c++) {
					if (r==0 || r==$scope.piani+1 || c==0 || c==$scope.piani+1){
				    	$scope.board[r][c]=0;
				    } else {
				    	$scope.board[r][c]=0;
					}
				  }
				}
			}
			$scope.progetta= function(){
				$scope.initBoard();				
	        	$scope.fase='P';
			}
            $scope.grattacieliSalvate = [];
	    	$http.get("/logika/grattacieli").then(function(response) {
	          	for (var i=0; i < response.data.length; i++) {
					el={ 
						prog: i, 
						id: response.data[i].id, 
						piani: response.data[i].piani, 
						nome: response.data[i].nome,
						board: response.data[i].board
					 };
	            	$scope.grattacieliSalvate.push(el);
	          	}
		        $scope.grattacieliSelezionata = null;
			  
	        })
	        .catch(function(error) {
	            console.log(error);
	        });
		}
		$scope.inizializza();
		$scope.sfondoCella= function(righe,colonne){
			if (righe==0 && colonne==0){
				return 'white';
			}
			if (righe==0 && colonne==$scope.piani+1){
				return 'white';
			}
			if (righe==$scope.piani+1 && colonne==0){
				return 'white';
			}
			if (righe==$scope.piani+1 && colonne==$scope.piani+1){
				return 'white';
			}
			if (righe==0 || colonne==0 || righe==$scope.piani+1 || colonne==$scope.piani+1){
				return 'beige';
			} else {
				return 'white';
			}
		}
		$scope.ricomincia= function(){
			$scope.inizializza();
		}
		$scope.inserisci= function(){
	        var body={
				nome: $scope.nome,
				board: $scope.board,
				piani: $scope.piani
			};
        	$http.post("/logika/grattacieli",body).then(function(response) {
	        	$scope.avviaGioco("I");
	        	$scope.id=response.data.id;
				$scope.timeAttuale=response.headers('Time-Attuale');
            })
            .catch(function(error) {
                console.log(error);
            });
		}
		$scope.aggiorna= function(){
	        var body={
				nome: $scope.nome,
				board: $scope.board,
				piani: $scope.piani
			};
        	$http.put("/logika/grattacieli/"+$scope.id, body).then(function(response) {
				if ($scope.fase=='P'){
	        		$scope.avviaGioco("A");
				}
				$scope.timeAttuale=response.headers('Time-Attuale');
            })
            .catch(function(error) {
                console.log(error);
            });
		}
		$scope.cancella= function(id){
        	$http.delete("/logika/grattacieli/" + id).then(function() {
				$scope.inizializza();
            })
            .catch(function(error) {
                console.log(error);
            });
		}
		$scope.carica= function(daCaricare){
	        $scope.id=daCaricare.id;
	        $scope.nome=daCaricare.nome;
	        $scope.piani=daCaricare.piani;
			$scope.board=daCaricare.board;
        	$scope.fase='P';
		}
		$scope.avviaGioco=function(modalitaSaltavaggio){
        	$scope.fase='G';
        	$scope.cosaScrivo=1;
		}
		$scope.getCosaScrivo=function(){
        	if ($scope.cosaScrivo==0) return "";
        	return $scope.cosaScrivo;
		}
		$scope.impostaValoreCella= function(){
			$scope.cosaScrivo=$scope.cosaScrivo+1;
			if ($scope.cosaScrivo==$scope.piani+1){
				$scope.cosaScrivo=0;
			}
		}
		$scope.getChar= function(index){
			return String.fromCharCode(65+index);
		}
		$scope.clickCella= function(righe,colonne){
			if ($scope.fase=='G'){
				if (righe==0 || colonne==0 || righe==$scope.piani+1 || colonne==$scope.piani+1) return;
				if ($scope.cosaScrivo==0){
					$scope.board[righe][colonne]=0;
				} else {
					var attuale=$scope.board[righe][colonne];
					if (attuale==0){
						$scope.board[righe][colonne]=$scope.cosaScrivo;
					} else {
						attuale=""+attuale;
						var indexToRemove=attuale.indexOf($scope.cosaScrivo); 
						if (indexToRemove==-1){
							$scope.board[righe][colonne]=attuale + $scope.cosaScrivo;
						} else {
							$scope.board[righe][colonne]= attuale.substring(0, indexToRemove) + attuale.substring(indexToRemove + 1);						
						}
					}
				}
			} else if ($scope.fase=='P'){
				$scope.board[righe][colonne]=$scope.board[righe][colonne]+1;
				if ($scope.board[righe][colonne]==$scope.piani+1){
					$scope.board[righe][colonne]=0;
				}
			}
		}
		$scope.defaultValoreCella=function(valore){
			$scope.cosaScrivo=valore;
		}
		$scope.colorVisInput= function(righe,colonne){
			if ($scope.board){
				if ($scope.colorCellCornice(righe,colonne)){
					if ($scope.board[righe][colonne]==0) {
						return 'beige';
					} else {
						return 'red';
					}
				} 
				if (righe==0 && colonne==0) return 'white';
				if (righe==0 && colonne==$scope.piani+1) return 'white';
				if (righe==$scope.piani+1 && colonne==0) return 'white';
				if (righe==$scope.piani+1 && colonne==$scope.piani+1) return 'white';
				if ($scope.fase=='P') return 'white';
				if ($scope.board[righe][colonne]==0) return 'white';
				return 'black';
			}
		}
		$scope.colorCellCornice= function(righe,colonne){
			if (righe==0 && colonne==0) return false;
			if (righe==0 && colonne==$scope.piani+1) return false;
			if (righe==$scope.piani+1 && colonne==0) return false;
			if (righe==$scope.piani+1 && colonne==$scope.piani+1) return false;
			if (righe==0 || righe==$scope.piani+1 || colonne==0 || colonne==$scope.piani+1){
				return true;
			} else {
				return false;
			}
		}
		}])
    .controller('JSStelle', ['$scope', '$http', function($scope, $http) {
		$scope.coloriZona=[];
		$scope.coloriZona.push('white');
		$scope.coloriZona.push('#DCDCDC');
		$scope.coloriZona.push('#A9A9A9');
		$scope.coloriZona.push('#E0FFFF');
		$scope.coloriZona.push('#00FFFF');
		$scope.coloriZona.push('lightgreen');
		$scope.coloriZona.push('yellow');
		$scope.coloriZona.push('orange');
		$scope.coloriZona.push('cyan');
		$scope.coloriZona.push('green');
		$scope.coloriZona.push('maroon');

		$scope.inizializza= function(){
	        $scope.id=null;
	        $scope.nome='Aprile 23 - 1';
	        $scope.colonne=7;
	        $scope.righe=7;
	        $scope.stellePerZona=1;
	        $scope.zoneColore=4;
	        $scope.fase='I';//I -> iniz P -> progetta F -> gioca
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


		$scope.inizializza();

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
        	$scope.piani=daCaricare.board.length;
		}


		$scope.cancella= function(id){
        	$http.delete("/logika/stelle/" + id).then(function() {
				$scope.inizializza();
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
			if ($scope.fase=='P'){
	        	$scope.colora=$scope.colora+1;
	        	if ($scope.colora == $scope.zoneColore +1){
					$scope.colora =1; 		
				}
			} else {
	        	if ($scope.cosaScrivo==' ') {
					$scope.cosaScrivo="-";
				} else if ($scope.cosaScrivo=='-') {
					$scope.cosaScrivo="*";
				} else if ($scope.cosaScrivo=='*') {
					$scope.cosaScrivo='A';
				} else {
		        	$scope.cosaScrivo=String.fromCharCode($scope.cosaScrivo.charCodeAt(0)+1);
		        	if ($scope.cosaScrivo=='F'){
						$scope.cosaScrivo=' ';
					}
				}
			}
		}

		$scope.clickCella= function(righe,colonne){
        	if ($scope.fase=='P'){
				$scope.cambiaValoreCella(righe,colonne);
			} else {
				var attuale=$scope.boardGioco[righe][colonne];
				if ($scope.cosaScrivo == ' ' || $scope.cosaScrivo == '-' || $scope.cosaScrivo == '*'){
					$scope.boardGioco[righe][colonne]=$scope.cosaScrivo;
				}
				else {
					if (attuale==' ' || attuale=='-' || attuale=='*'){
						$scope.boardGioco[righe][colonne]=$scope.cosaScrivo;
					} else if (attuale != $scope.cosaScrivo){
						var indexToRemove=attuale.indexOf($scope.cosaScrivo); 
						if (indexToRemove==-1){
							$scope.boardGioco[righe][colonne]=attuale + $scope.cosaScrivo;
						} else {
 							$scope.boardGioco[righe][colonne]= attuale.substring(0, indexToRemove) + attuale.substring(indexToRemove + 1);						
 						}
					}
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
		$scope.getValColora= function(){
        	if ($scope.fase=='P'){
				return $scope.colora;
			} else{
				return $scope.cosaScrivo;
			} 
	
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
        	if ($scope.fase=='P' && righe && colonne){
				return $scope.coloraSfondo(righe,colonne);
			} else {
				return 'black';
			}
		}
		$scope.coloraSfondo=function(righe,colonne){
			return $scope.coloraCella($scope.board[righe][colonne]);
		}
		$scope.ricomincia= function(){
			$scope.inizializza();
		}
		$scope.inserisci= function(){
	        var body={
				zone: $scope.zoneColore,
				nome: $scope.nome,
				board: $scope.board,
				stellePerZona: $scope.stellePerZona
			};
        	$http.post("/logika/stelle",body).then(function(response) {
	        	$scope.avviaGioco("I");
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
				if ($scope.fase=='P'){
	        		$scope.avviaGioco("A");
				}
				$scope.timeAttuale=response.headers('Time-Attuale');
            })
            .catch(function(error) {
                console.log(error);
            });
		}
		$scope.avviaGioco=function(modalitaSaltavaggio){
			if (modalitaSaltavaggio=='I'){
				$scope.boardGioco=[];
				for (var r=0; r < $scope.board.length; r++) {
				  $scope.boardGioco[r]=[];
				  for (var c=0; c < $scope.board[r].length; c++) {
				    $scope.boardGioco[r][c]=' ';
				  }
				}
			}
        	$scope.fase='G';
        	$scope.colora=0;
        	$scope.cosaScrivo='-';
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
