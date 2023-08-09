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
    .controller('JSCrucipixel', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
		$scope.inizializza= function(){
	        $scope.id=null;
	        $scope.nome='Aprile 23 - 1';
	        $scope.colonne=5;
	        $scope.righe=5;
	        $scope.fase='I';//I -> iniz P -> progetta F -> gioca
            $scope.crucipixelSalvate = [];
	    	$http.get("/logika/crucipixel").then(function(response) {
	          	for (var i=0; i < response.data.length; i++) {
					el={ 
						prog: i, 
						id: response.data[i].id, 
						nome: response.data[i].nome,
						board: response.data[i].board,
						testoBoard: response.data[i].testoBoard,
						datiColonnaBoard: response.data[i].datiColonnaBoard,
						historyBoard: response.data[i].historyBoard,
						datiRigaBoard: response.data[i].datiRigaBoard,
					 };
	            	$scope.crucipixelSalvate.push(el);
	          	}
		        $scope.crucipixelSelezionata = null;
			  
	        })
	        .catch(function(error) {
	            console.log(error);
	        });
		}
		$scope.inizializza();
		$scope.progetta= function(){
			$scope.initBoard();				
			$scope.cosaScrivo=[];
			$scope.cosaScrivo[0]=1;				
			$scope.valCosaScrivo=1;
			$scope.valDatiRigaBoard=[];
			$scope.valDatiColonnaBoard=[];
			$scope.verifica=false;
			$scope.linea=false;
        	$scope.fase='P';
		}
		$scope.getColor= function(righe,colonne){
			if (colonne==0) return 'black';
			return $scope.getBgColor(righe,colonne);
		}
		$scope.getColori= function(valore){
			if (valore==3) return 'gray';
			if (valore==2) return 'beige';
			if (valore==1) return 'black';
			return 'lightgreen';
		}
		$scope.getBgColor= function(righe,colonne){
			if (!$scope.board) return;
			if (colonne==0 || colonne==$scope.colonne+1 ){
				if ($scope.evidRiga==righe){
					return 'yellow';
				}
				return 'beige';
			}
				else {
				return $scope.getColori($scope.board[righe][colonne-1]);
			}
		}
		$scope.clona= function(arr){
			var ret = [];
			for (var r=0; r < arr.length; r++) {
			  ret[r]=[];
			  for (var c=0; c < arr[r].length; c++) {
		    	ret[r][c]=arr[r][c];
			  }
			}
			return ret;
		}
		$scope.cliccaCella= function(tipo, righe, colonne){
			if ($scope.fase=='P'){
				if (tipo=='IND' && colonne !=0 && colonne != $scope.colonne+1){
					$scope.datiColonnaBoard[colonne-1]=[];
					for (var i=0;i<$scope.cosaScrivo.length;i++){
						$scope.datiColonnaBoard[colonne-1].push($scope.cosaScrivo[i]);
					}
				}
				if (tipo=='BOARD' && colonne==0 || colonne == $scope.colonne+1){
					$scope.datiRigaBoard[righe]=[];
					for (var i=0;i<$scope.cosaScrivo.length;i++){
						$scope.datiRigaBoard[righe].push($scope.cosaScrivo[i]);
					}
				}
			}
			if ($scope.fase=='G' && tipo=='BOARD' && colonne>0 ){
				$scope.evidRiga=righe;
				$scope.evidColonna=colonne;
				var history={
					board: $scope.clona($scope.board),
					testoBoard: $scope.clona($scope.testoBoard)
				}
				$scope.historyBoard.push(history);
				if ($scope.linea){
					for (var i=0; i < $scope.righe; i++) {
						if ($scope.board[i][colonne-1]==0){
							$scope.board[i][colonne-1]=$scope.mossa;
							$scope.testoBoard[i][colonne-1]=$scope.testoMossa;
						}
					}
				} else {
					$scope.board[righe][colonne-1]=$scope.mossa;
					$scope.testoBoard[righe][colonne-1]=$scope.testoMossa;
				}
			}
		}
		$scope.undo= function(){
			    if ($scope.historyBoard){
					var history=$scope.historyBoard.pop();
					if (history){
						$scope.board=history.board;
						$scope.testoBoard=history.testoBoard;
					}
				}
		}
		$scope.verificami= function(){
				$scope.verifica=!$scope.verifica;
		}
		$scope.allLine= function(){
				$scope.linea=!$scope.linea;
		}
		$scope.getIntestazioneBoard= function(colonne){
			if (colonne==0) {
				return '';
			} else {
				if ($scope.datiColonnaBoard){
					var att=$scope.datiColonnaBoard[colonne-1];
					var ret="";
					var sep="<br>";
					for (var i=0; i < att.length; i++) {
						ret=ret + sep+ att[i];
					}
					if ($scope.verifica){
						var valori=[];
						for (var i=0; i < $scope.righe; i++) {
							valori.push($scope.board[i][colonne-1]);
						}
						ret+=$scope.contaRipetizioni(valori, sep);
					}
					return  $sce.trustAsHtml(ret);
				}
			}
		}
		$scope.getCellaBoard= function(righe, colonne){
			if ($scope.board){
				if (colonne!=0 && colonne != $scope.colonne+1){
                	return $scope.testoBoard[righe][colonne-1];
				} else {
					if ($scope.datiRigaBoard){
						var att=$scope.datiRigaBoard[righe];
						var sep="&nbsp;&nbsp;";
						var ret="";
						for (var i=0; i < att.length; i++) {
							ret=ret + sep + att[i];
						}
						if ($scope.verifica){
							ret+=$scope.contaRipetizioni($scope.board[righe], sep);
						}
						return  $sce.trustAsHtml(ret);
					}
				}
			}
		}
		$scope.contaRipetizioni= function(riga, sep){
			var contaAtt=0;
			var ret="<p style='color:red; font-weight:bold'>" + sep+sep+sep;
			for (var i=0; i < riga.length; i++) {
				var att=riga[i];
				if (att==1){
					contaAtt++;
				} else {
					if (contaAtt>0){
						ret=ret+" " + contaAtt + sep;
					}
					contaAtt=0;
				}
			}
			if (contaAtt>0){
				ret=ret+" " + contaAtt + sep;
			}
			return ret + "</p>";
		}
		$scope.charCosaScrivo= function(carattere){
			if ($scope.cosaScrivo){
				if (carattere==$scope.cosaScrivo.length){
					return "+";
				}
				return $scope.cosaScrivo[carattere];
			}
		}
		
		$scope.pushCharCosaScrivo= function(){
			$scope.cosaScrivo.push(1);
		}
		$scope.okValCosaScrivoColonna=function(colonna){
			$scope.datiColonnaBoard[colonna]=$scope.stringToArray($scope.valDatiColonnaBoard[colonna]);
		}
		$scope.okValCosaScrivoRiga=function(riga){
			$scope.datiRigaBoard[riga]=$scope.stringToArray($scope.valDatiRigaBoard[riga]);
		}
		$scope.okValCosaScrivo= function(){
			$scope.valCosaScrivo=$scope.stringToArray($scope.valCosaScrivo);
		}
		$scope.stringToArray=function(valore){
			if (!valore) return [];
			var numbersArray = valore.split(' ');
		    numbersArray = numbersArray.map(function(numString) {
		      return parseInt(numString); // Converte ogni stringa in un numero intero
		    });
			return  numbersArray;
		}
		$scope.plusCharCosaScrivo= function(carattere){
			$scope.cosaScrivo[carattere]=$scope.cosaScrivo[carattere]+1;
		}

		$scope.minusCharCosaScrivo= function(carattere){
			$scope.cosaScrivo[carattere]=$scope.cosaScrivo[carattere]-1;
			if ($scope.cosaScrivo[carattere]==0){
				$scope.cosaScrivo.splice(carattere,1);
			}
		}
		$scope.inserisci= function(){
	        var body={
				nome: $scope.nome,
				board: $scope.board,
				testoBoard: $scope.testoBoard,
				datiColonnaBoard: $scope.datiColonnaBoard,
				datiRigaBoard: $scope.datiRigaBoard,
				historyBoard: $scope.historyBoard
			};
        	$http.post("/logika/crucipixel",body).then(function(response) {
	        	$scope.avviaGioco();
	        	$scope.id=response.data.id;
				$scope.timeAttuale=response.headers('Time-Attuale');
            })
            .catch(function(error) {
                console.log(error);
            });
		}
		$scope.ricomincia= function(){
			$scope.inizializza();
		}
		$scope.aggiorna= function(){
	        var body={
				nome: $scope.nome,
				board: $scope.board,
				testoBoard: $scope.testoBoard,
				datiColonnaBoard: $scope.datiColonnaBoard,
				datiRigaBoard: $scope.datiRigaBoard,
				historyBoard: $scope.historyBoard
			};
        	$http.put("/logika/crucipixel/"+$scope.id, body).then(function(response) {
				if ($scope.fase=='P'){
	        		$scope.avviaGioco();
				}
				$scope.timeAttuale=response.headers('Time-Attuale');
            })
            .catch(function(error) {
                console.log(error);
            });
		}
		$scope.cancella= function(id){
        	$http.delete("/logika/crucipixel/" + id).then(function() {
				$scope.inizializza();
            })
            .catch(function(error) {
                console.log(error);
            });
		}
		$scope.carica= function(daCaricare){
	        $scope.id=daCaricare.id;
	        $scope.nome=daCaricare.nome;
			$scope.board=daCaricare.board;
			$scope.testoBoard=daCaricare.testoBoard;
			$scope.datiColonnaBoard=daCaricare.datiColonnaBoard;
			$scope.datiRigaBoard=daCaricare.datiRigaBoard;
			$scope.righe=$scope.board.length;
			$scope.colonne=$scope.board[0].length;
			$scope.historyBoard=daCaricare.historyBoard;
			$scope.cosaScrivo=[];
			$scope.cosaScrivo[0]=1;				
			$scope.valCosaScrivo=1;
			$scope.valDatiRigaBoard=[];
			$scope.valDatiColonnaBoard=[];
			$scope.verifica=false;
			$scope.linea=false;
        	$scope.fase='P';
		}
		$scope.avviaGioco=function(){
			/*
				$scope.board=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
				$scope.testoBoard=[["A","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""],["","","","","","","","","","","","","","","","","","","","","","","","",""]];
				$scope.datiColonnaBoard=[[1,2],[1,2,3],[2,7],[1,9,1,2],[14,4],[3,4,2,4,6],[25],[2,14,6],[5,6,3,4],[1,13,2],[2,3,5],[1,2,2,1,6],[1,3,1,1,1],[2,6],[14,1,1,1,1],[14,1,1,1],[2,1,5,1,1],[2,1,1,1,6],[2,1,1,1,1,1],[14,1,1,5],[2,1,1,6,1,1],[2,1,1,1,1,1,1],[2,1,1,1,5],[2,1,6,1,1],[14,5]];
				$scope.datiRigaBoard=[[1,11],[2,11],[4,2,1,1],[2,2,2,1,1],[5,2,1,1],[2,4,2,1,1],[7,2,1,1],[5,3,2,3,1],[8,2,1,1],[10,2,1,1],[2,6,2,1,1],[11,2,1,1],[9,2,1,1],[5,5,11],[6,3],[12,8],[3,7,2,1,1,1],[15,8],[1,1,1,1],[7,7,1,1],[7,1,1,1,6],[5,7,1,1,1],[5,1,1,1,6],[3,1,1,1,1,1,1],[3,14]];
				$scope.righe=$scope.board.length;
				$scope.colonne=$scope.board[0].length;
			*/
        	$scope.fase='G';
        	$scope.mossa=1;
        	$scope.testoMossa=' ';
		}
		$scope.getColorIntestazioneBoard=function(colonne){
			if ($scope.evidColonna==colonne && colonne>0){
				return 'yellow';
			}
			return 'beige';
		}
		$scope.evidCell=function(righe,colonne, accendi){
			if (accendi){
				$scope.evidRiga=righe;
				$scope.evidColonna=colonne;
			} else {
				$scope.evidRiga=-1;
				$scope.evidColonna=-1;
			}
		}
		$scope.getCellaWidth=function(colonne){
			if (colonne==0 || colonne==$scope.colonne+1) return '100px';
			if ($scope.fase=='P')  return '50px';
			return '20px';
		}
		$scope.impostaTestoMossa=function(){
        	if ($scope.testoMossa==' '){
				$scope.testoMossa='A';
			} else {
	        	$scope.testoMossa=String.fromCharCode($scope.testoMossa.charCodeAt(0)+1);
	        	if ($scope.testoMossa=='F'){
					$scope.testoMossa=' ';
				}
			}
		}
		$scope.impostaValoreMossa=function(index){
        	$scope.mossa=index;
		}
		$scope.initBoard= function(){
			$scope.board=[];
			$scope.testoBoard=[];
			for (var r=0; r < $scope.righe; r++) {
			  $scope.board[r]=[];
			  $scope.testoBoard[r]=[];
			  for (var c=0; c < $scope.colonne; c++) {
		    	$scope.board[r][c]=0;
		    	$scope.testoBoard[r][c]="";
			  }
			}
			$scope.historyBoard=[];
			$scope.datiColonnaBoard=[];
            for (var c=0; c < $scope.colonne; c++) {
	            $scope.datiColonnaBoard[c]=[];
				$scope.datiColonnaBoard[c].push('?');
			}
			$scope.datiRigaBoard=[];
			for (var r=0; r < $scope.righe; r++) {
	            $scope.datiRigaBoard[r]=[];
				$scope.datiRigaBoard[r].push('?');		
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
				nome: $scope.nome,
				board: $scope.board,
				piani: $scope.piani
			};
        	$http.put("/logika/grattacieli/"+$scope.id, body).then(function(response) {
				if ($scope.fase=='P'){
	        		$scope.avviaGioco();
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
		$scope.avviaGioco=function(){
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
