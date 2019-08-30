$(document).ready(function() {
	// définition des objets card
    var cards = [
		{
			name: "red apple",
			img: "img/red_apple.png",
			id: 1,
		},
		{
			name: "banana",
			img: "img/banana.png",
			id: 2
		},
		{
			name: "orange",
			img: "img/orange.png",
			id: 3
		},
		{
			name: "lime",
			img: "img/lime.png",
			id: 4
		}, 
		{
			name: "berry",
			img: "img/berry.png",
			id: 5
		},
		{
			name: "apricot",
			img: "img/apricot.png",
			id: 6
		},
		{
			name: "lemon",
			img: "img/lemon.png",
			id: 7
		},
		{
			name: "strawberry",
			img: "img/strawberry.png",
			id: 8
		},
		{
			name: "green apple",
			img: "img/green_apple.png",
			id: 9
		},
		{
			name: "peach",
			img: "img/peach.png",
			id: 10
		},
		{
			name: "grappe",
			img: "img/grappe.png",
			id: 11
		},
		{
			name: "water melon",
			img: "img/water_melon.png",
			id: 12
        },
	];
	
	// le jeu en lui-même
	var Memory = {
		init: function(cards){
			this.game = $(".game");
            this.time = false;
            this.timer;
            this.score = 0;
			this.cardsArray = $.merge(cards, cards); // Ici on merge le tableau avec lui même afin d'éviter les répititions de code
			this.shuffleCards(this.cardsArray);
			this.setup();
		},
		shuffleCards: function(cardsArray){
			this.cards = $(this.shuffle(this.cardsArray));
		},
		setup: function(){
			this.html = this.buildHTML();
			this.game.html(this.html);
			this.memoryCards = $(".card");
			this.paused = false;
     	    this.guess = null;
			this.binding();
		},
		binding: function(){
			this.memoryCards.on("click", this.cardClicked);
		},
		
		cardClicked: function(){
			var _ = Memory;
			var card = $(this);
			// lancement du chrono au premier clic sur une carte
            if( !_.time){
                _.time = true;
                _.timer = setInterval( function(){
					_.score = _.score + 100; 
					if(Memory.score >= 60000){
						Memory.loose();
					}
                }, 100);
                _.progress();
			}
			// controle des cartes sélectionnées
			if(!_.paused && !card.find(".inside").hasClass("matched") && !card.find(".inside").hasClass("picked")){
				card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
        },
		
		// démarage de l'animation de la progress bar
        progress: function(){
            $('#pbar').css("animation-name", "progress");
            $('#pbar').css("animation-duration", "60s");
            $('#pbar').css("animation-timing-function", "linear");
            $('#pbar').css("animation-iteration-count", "1");
        },

		// en cas de défaite
        loose: function(){
			alert('Vous avez perdu, pas de chance !')
			window.location.href = "index.php";
            this.paused = true;
			$('#pbar').hide(500);
        },

		// en cas de victoire
		win: function(){
			this.paused = true;
			// on stop le chrono et l'animation de la progress bar
            clearInterval(Memory.timer);
			$('#pbar').css("animation-play-state", "paused");   
			// envoi du chrono à php pour qu'il puisse être traité
			$.post( "index.php", { score: Memory.score  })
				// si le chrono a bien été réceptionné
                .done(function(  ){
					alert('Incroyable, vous avez réussi !');
					window.location.href = "index.php";
				})
				/* si le chrono n'a pas pu être récéptionné par php
				 pour le débuggage, il est possible de faire :
						.fail(function(data){
							alert(data);
						})
				la fenêtre d'erreur affichera alors le message d'erreur retourné */
				.fail(function() {
					alert( "Vous avez gagné ! Cependant pour des raisons techniques, votre temps n'a pas pu être sauvegardé" );
					window.location.href = "index.php";
				})
		},

        // Cette fonction n'a d'autre but que d'améliorer l'aléatoire du mélange.
		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = Math.floor(Math.random() * counter);
                // Decrease counter by 1
                counter--;
                // And swap the last element with it
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
	    	}
	    	return array;
		},

		// génération du tableau des cartes 
		buildHTML: function(){
			var frag = '';
			this.cards.each(function(key, value){
				frag += '<div class="card" data-id="'+ value.id +'"><div class="inside">\
				<div class="front"><img src="'+ value.img +'"\
				alt="'+ value.name +'" /></div>\
				<div class="back"><img src="img/interro.png"\
				alt="?" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	// initialisation de la page d'accueil
    $('.game').hide();
    $('#pbarContainer').hide();

	// affichage et lancement d'une instance du jeu au clic
    $('.play').click(function(){
        $('.scores').hide();
        $('.game').show(500);
        $('#pbarContainer').show(500);
        Memory.init(cards);
    });
	

});