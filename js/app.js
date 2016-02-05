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
        fetchChords(function(){
          getRandomChords(iNbChords, callback);
        })
      }
      else{
        getRandomChords(iNbChords, callback);
      }
    }

    var fetchChords = function(callback){
      if(allChords.length === 0){
        $http.get('./resources/chords.json')
          .then(function(res){
            allChords = res.data;
            callback();
          });
      }
      else{
        callback();
      }
    }

    var randomArray = function(array){
      var ret = array.slice();
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = ret[i];
        ret[i] = ret[j];
        ret[j] = temp;
      }
      return ret;
    }

    var getRandomChords = function(iNbChords, callback) {
      callback(randomArray(allChords).slice(0, iNbChords));
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
