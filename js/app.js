"use strict";
angular.module('TonicApp', [])

  .controller('TonicController', ["$scope", "TonicService", "$http", function($scope, TonicService, $http){
    $scope.chords = [];

    var allCards = [];
    $http.get('/resources/cards.json')
      .then(function(res){
        allCards = res.data;
        $scope.randomizeCard();
      });

    $scope.randomizeCard = function(){
      $scope.chords = [];
      $scope.actualCard = allCards[Math.floor(Math.random()*allCards.length)];
      if($scope.actualCard.chords ){
        $scope.chords = TonicService.getRandomChords($scope.actualCard.chords);
      }
    };
  }])

  .service('TonicService', function(){
    var chords = ["A", "Am", "Bµ",
                  "Bm", "C", "D",
                  "Dm", "E", "Em",
                  "F", "G"];

    var cards = [
      {
        "libelle" : "USE",
        "description" : "Two notes. When you get bored, keep one and pick a new one. Repeat as long as you can.",
        "img" : undefined,
        "chords" : 2
      },
      {
        "libelle" : "USE",
        "description" : "Three notes until you get bored. Then pick three new ones. Repeat as long as you can.",
        "img" : undefined,
        "chords" : 3
      },
      {
        "libelle" : "PLAY THIS GRAPH",
        "description" : "The vertical axis is pitch. The horizontal is time. It should take about 2 minutes to play.",
        "img" : undefined
      }
    ];

		this.getRandomChords = function(iNbCards){
      console.log(iNbCards);
      var ret = [];

			var tmpChords = chords.slice();
      var randomIdx = -1;
			for(var i = 0 ; i < iNbCards ; i++){
        randomIdx = Math.floor(Math.random()*chords.length);
        if(ret.indexOf(tmpChords[randomIdx]) != -1){
          i++;
        }
        else{
          ret.push(tmpChords[randomIdx]);  
          // Suppression de l'élement sélectionné, pour éviter les doublons
          tmpChords.splice(randomIdx, 1);
          console.log(tmpChords);
        }
			}

      return ret;
		};

    this.randomChord = function(){
      return chords[Math.floor(Math.random()*chords.length)];
    };

    this.randomCard = function(){
      return cards[Math.floor(Math.random()*cards.length)];
    };
  });
