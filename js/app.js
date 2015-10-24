"use strict";
angular.module('TonicApp', [])

  .controller('TonicController', ["$scope", "$http", function($scope, $http){
    $scope.chords = [];

    var allCards = [];
    var allChords = [];
    $http.get('./resources/cards.json')
      .then(function(res){
        allCards = res.data;
        $http.get('./resources/chords.json')
          .then(function(res){
            allChords = res.data;
            $scope.randomizeCard();
          });
      });

    $scope.randomizeCard = function(){
      $scope.chords = [];
      $scope.actualCard = getRandomCard();
      if($scope.actualCard.chords ){
        $scope.chords = getRandomChords($scope.actualCard.chords);
      }
    };

    var getRandomCard = function(){
      return allCards[Math.floor(Math.random()*allCards.length)];
    };

    var getRandomChords = function(iNbChords){
      var ret = [];

      var tmpChords = allChords.slice();
      var randomIdx = -1;
      for(var i = 0 ; i < iNbChords ; i++){
        randomIdx = Math.floor(Math.random()*allChords.length);
        if(ret.indexOf(tmpChords[randomIdx]) != -1){
          i++;
        }
        else{
          ret.push(tmpChords[randomIdx]);  
          // Suppression de l'élement sélectionné, pour éviter les doublons
          tmpChords.splice(randomIdx, 1);
        }
      }

      return ret;
    };
  }])
  .directive('tonicCard', function(){
    return {
      restrict : 'E',
      templateUrl : 'templates/card.html',
      scope: {
        actualCard : '=card',
        chords : '=chords'
      }
    };
  });

