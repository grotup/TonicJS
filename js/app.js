"use strict";
angular.module('TonicApp', [])

  .controller('TonicController', ["$scope", "$http", "cardService", "chordService", function($scope, $http, cardService, chordService){
    $scope.chords = [];

    $scope.randomizeCard = function(){
      $scope.chords = [];
      cardService.getRandomCard(function(card){
         $scope.actualCard = card;
         console.log($scope.actualCard.chords);
         if($scope.actualCard.chords > 0){
           chordService.getRandomChords($scope.actualCard.chords, function(chords){
             $scope.chords = chords;
           });
         }
      });
    };

    $scope.randomizeCard();
  }])
  .service('chordService', ["$http", function($http){
    var allChords = [];

    this.getRandomChords = function(iNbChords, callback){
      if(allChords.length === 0){
        $http.get('./resources/chords.json')
          .then(function(res){
            allChords = res.data;
            getRandomChords(iNbChords, callback);
          });
      }
      else{
        getRandomChords(iNbChords, callback);
      }
    }

    var getRandomChords = function(iNbChords, callback) {
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
      callback(ret);
    }
  }])
  .service('cardService', ["$http", function($http){
    var that = this;
    var allCards = [];

    this.getRandomCard = function(callback){
      if(allCards.length === 0){
        $http.get('./resources/cards.json')
          .then(function(res){
            allCards = res.data;
            callback(allCards[Math.floor(Math.random()*allCards.length)]);
          });
      }
      else{
        callback(allCards[Math.floor(Math.random()*allCards.length)]);
      }
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
