"use strict";
angular.module('TonicApp', [])

  .controller('TonicController', ["$scope", "$http", "cardService", "chordService", function($scope, $http, cardService, chordService){
    $scope.chords = [];

    $scope.randomizeCard = function(){
      $scope.chords = [];
      $scope.actualCard = cardService.getRandomCard();
      if($scope.actualCard.chords ){
        $scope.chords = chordService.getRandomChords($scope.actualCard.chords);
      }
    };

    $scope.randomizeCard();
  }])
  .service('chordService', ["$http", function($http){
    var allChords = [];

    $http.get('./resources/chords.json')
      .then(function(res){
        allChords = res.data;
      });

    this.getRandomChords = function(iNbChords){
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
    }
  }])
  .service('cardService', ["$http", function($http){
    var allCards = [];



    this.init = function(){
      $http.get('./resources/cards.json')
        .then(function(res){
          allCards = res.data;
        });
    }

    this.getRandomCard = function(){
      return allCards[Math.floor(Math.random()*allCards.length)];
    }
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
