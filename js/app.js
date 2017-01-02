'use strict';

const angular = require('angular');
require('angular-material');
require('angular-material/angular-material.css');

angular.module('TonicApp', ['ngMaterial'])

	.controller('TonicController', [function () {
		var that = this;
		this.chords = [];
		this.cards = [];

		this.randomizeCard = function () {
			that.chords = [];
			changeCard(getRandomCard());
		};

		this.choseCard = function (card) {
			that.searchCard = '';
			changeCard(card);
		};

			// Utility functions and variables
		var allCards = this.cards = require('../resources/cards.json');
		var allChords = this.chords = require('../resources/chords.json');

		var changeCard = function (card) {
			that.actualCard = card;
			if (that.actualCard.chords && that.actualCard.chords !== 0) {
				that.chords = getRandomChords(that.actualCard.chords);
			} else {
				that.chords = [];
			}
		};

		var getRandomCard = function () {
			return that.cards[Math.floor(Math.random() * allCards.length)];
		};

		var getRandomChords = function (iNbChords) {
			var ret = [];

			var tmpChords = allChords.slice();
			var randomIdx = -1;
			while (ret.length !== iNbChords) {
				randomIdx = Math.floor(Math.random() * (allChords.length - ret.length));

				if (ret.indexOf(tmpChords[randomIdx]) === -1) {
					ret.push(tmpChords[randomIdx]);
						// Suppression de l'élement sélectionné, pour éviter les doublons
					tmpChords.splice(randomIdx, 1);
				}
			}
			return ret;
		};

		this.randomizeCard();
	}])

	.directive('tonicCard', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/card.html',
			scope: {
				actualCard: '=card',
				chords: '=chords'
			}
		};
	});

