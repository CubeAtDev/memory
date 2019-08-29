$(document).ready(function() {

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
    
	var Memory = {
		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
            this.$overlay = $(".modal-overlay");
            this.$time = false;
            this.$timer;
            this.score = 0;
			this.cardsArray = $.merge(cards, cards); // Ici on merge le tableau avec lui même afin d'éviter les répititions de code
			this.shuffleCards(this.cardsArray);
			this.setup();
		},
		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},
		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	    this.guess = null;
			this.binding();
		},
		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
		},
		
		cardClicked: function(){
			var _ = Memory;
            var $card = $(this);
            if( !_.time){
                _.time = true;
                _.timer = setInterval( function(){
                    _.score = _.score + 10; 
                }, 10);
                _.progress();
            }
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
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
        
        progress: function(){
            $('#pbar').css("animation-name", "progress");
            $('#pbar').css("animation-duration", "60s");
            $('#pbar').css("animation-timing-function", "linear");
            $('#pbar').css("animation-iteration-count", "1");
            var timer = 0;
            if(timer >= 60000){
                Memory.loose();
            }
        },

        loose: function(){
            this.paused = true;
            setTimeout(function(){
				Memory.showModal();
                Memory.$game.fadeOut();
                $('#pbar').hide();
			}, 1000)
        },

		win: function(){
            this.paused = true;
            clearInterval(Memory.timer);
            console.log(Memory.score);
            $('#pbar').css("animation-play-state", "paused");   
            $.post( "index.php", { score: Memory.score  })
                .done(function( data ){
                alert(data);

                });
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

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(key, value){
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

    $('.game').hide();
    $('#pbarContainer').hide();

    $('.play').click(function(){
        $('.scores').hide();
        $('.game').show(500);
        $('#pbarContainer').show(500);
        Memory.init(cards);
    });
	

});