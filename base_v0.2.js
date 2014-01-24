$('[data-toggle=tab]').click(function(){
  if ($(this).parent().hasClass('active')){
	$($(this).attr("href")).toggleClass('active');
  }
})

//variables

var game = {
	flax_collector_gold: 1,
	lobster_fisher_gold: 5,
	pure_essence_miner_gold: 25,
	yew_chopper_gold: 125,
	runite_ore_miner_gold: 625,
	frost_dragon_slayer_gold: 3125,
	merchanter_gold: 15625,
	pvm_clan_gold: 78125,
	dicer_gold: 390625,

	flax_collector_cost: 25,
	lobster_fisher_cost: 175,
	pure_essence_miner_cost: 1225,
	yew_chopper_cost: 8575,
	runite_ore_miner_cost: 60025,
	frost_dragon_slayer_cost: 420175,
	merchanter_cost: 2941225,
	pvm_clan_cost: 17647350,
	dicer_cost: 105884100

};

var player = {
	gold: 0,
    lifetime_gold: 0,
	gold_per_second: 0,
	flax_collector_count: 0,
	lobster_fisher_count: 0,
	pure_essence_miner_count: 0,
	yew_chopper_count: 0,
	runite_ore_miner_count: 0,
	frost_dragon_slayer_count: 0,
	merchanter_count: 0,
	pvm_clan_count: 0,
	dicer_count: 0,
	
	experience: 0,
	experience_per_second: 0,
	level: 0,

	flax_collector_level: 0,
	lobster_fisher_level: 0,
	pure_essence_miner_level: 0,
	yew_chopper_level: 0,
	runite_ore_miner_level: 0,
	frost_dragon_slayer_level: 0,
	merchanter_level: 0,
	pvm_clan_level: 0,
	dicer_level: 0

};

var speed = 1000;
var cost_multiplier = 1.10;
var game_Version = 0.2;

//--------------------------------------------------//

setInterval(function() {
    player.gold = Math.round((player.gold + player.gold_per_second) * 100) / 100;
    player.lifetime_gold = player.lifetime_gold + Math.round(player.gold_per_second * 100) / 100;
    update_view();
}, speed);

function get_gold(number) {
    'use strict';
    player.gold = Math.round((player.gold + number) * 100) / 100;
    document.getElementById("player_gold").innerHTML = player.gold;
}

//function set_gold_per_second() {
//    player.gold_per_second = (player.flax_collector_count * (game.flax_collector_gold * (player.flax_collector_level + 1))) 
//	+(player.lobster_fisher_count * (game.lobster_fisher_gold * (player.lobster_fisher_level + 1)));
//}

function update_view() {
    'use strict';
    var e = document.getElementById("player_gold"),
            e3 = document.getElementById("flax_collector_cost"),
            e2 = document.getElementById("gold_per_second");
    e.innerHTML = player.gold;
    e2.innerHTML = player.gold_per_second;
	e3.innerHTML = game.flax_collector_cost;
	
	var b1 = document.getElementById("player_gold");
		b1.innerHTML = number_with_commas(parseFloat(Math.round(player.gold * 100) / 100).toFixed(2));
	var b2 = document.getElementById("gold_per_second");
		b2.innerHTML = number_with_commas(parseFloat(Math.round(player.gold_per_second * 100) / 100).toFixed(2));

	var c1 = document.getElementById("player_gold");
		c1.innerHTML = number_with_commas(parseFloat(Math.round(player.gold * 100) / 100).toFixed(2));
	var c2 = document.getElementById("player_gold");
		c2.innerHTML = number_with_commas(parseFloat(Math.round(player.gold * 100) / 100).toFixed(2));
	var c3 = document.getElementById("player_gold");
		c3.innerHTML = number_with_commas(parseFloat(Math.round(player.gold * 100) / 100).toFixed(2));
	var c4 = document.getElementById("player_gold");
		c4.innerHTML = number_with_commas(parseFloat(Math.round(player.gold * 100) / 100).toFixed(2));
	var c5 = document.getElementById("player_gold");
		c5.innerHTML = number_with_commas(parseFloat(Math.round(player.gold * 100) / 100).toFixed(2));
	
}

function number_with_commas(x) {
    "use strict";
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.onload = function()
                {
                   document.getElementById('game_version').innerHTML = game_version;
                };
//--------------------------------------------------//

function buy_flax_collector(){
	'use strict';
	if (player.gold >= game.flax_collector_cost) { //if player.gold is greater than or equal to flax_collector_cost
		player.flax_collector_count = player.flax_collector_count + 1; //add one to player.flax_collector_count
		player.gold = Math.round((player.gold - game.flax_collector_cost) * 100) / 100; //subtract game.flax_collector_cost from player.gold
		player.gold_per_second = Math.round((player.gold_per_second + game.flax_collector_gold) * 100) / 100; //add game.flax_collector_gold to player.gold_per_second
        game.flax_collector_cost = Math.round((game.flax_collector_cost * cost_multiplier) * 100) / 100; //multiply game.flax_collector_cost by cost_multiplier
		document.getElementById('flax_collector_count').innerHTML = player.flax_collector_count; //update player.flax_collector_count in webpage to display new value
		document.getElementById('player_gold').innerHTML = player.gold; //update player.gold in webpage to display new value
		document.getElementById('gold_per_second').innerHTML = player.gold_per_second; //update player.gold_per_second in webpage to display new value
        document.getElementById('flax_collector_cost').innerHTML = game.flax_collector_cost; //update game.flax_collector_cost in webpage to display new value
        update_view();
	}
}

function buy_lobster_fisher(){
	'use strict';
	if (player.gold >= game.lobster_fisher_cost) {
		player.lobster_fisher_count = player.lobster_fisher_count + 1;
		player.gold = Math.round((player.gold - game.lobster_fisher_cost) * 100) / 100;
		player.gold_per_second = Math.round((player.gold_per_second + game.lobster_fisher_gold) * 100) / 100;
        game.lobster_fisher_cost = Math.round((game.lobster_fisher_cost * cost_multiplier) * 100) / 100;
		document.getElementById('lobster_fisher_count').innerHTML = player.lobster_fisher_count;
		document.getElementById('player_gold').innerHTML = player.gold;
		document.getElementById('gold_per_second').innerHTML = player.gold_per_second;
        document.getElementById('lobster_fisher_cost').innerHTML = game.lobster_fisher_cost;
        update_view();
	}
}

function buy_pure_essence_miner(){
	'use strict';
	if (player.gold >= game.pure_essence_miner_cost) {
		player.pure_essence_miner_count = player.pure_essence_miner_count + 1;
		player.gold = Math.round((player.gold - game.pure_essence_miner_cost) * 100) / 100;
		player.gold_per_second = Math.round((player.gold_per_second + game.pure_essence_miner_gold) * 100) / 100;
        game.pure_essence_miner_cost = Math.round((game.pure_essence_miner_cost * cost_multiplier) * 100) / 100;
		document.getElementById('pure_essence_miner_count').innerHTML = player.pure_essence_miner_count;
		document.getElementById('player_gold').innerHTML = player.gold;
		document.getElementById('gold_per_second').innerHTML = player.gold_per_second;
        document.getElementById('pure_essence_miner_cost').innerHTML = game.pure_essence_miner_cost;
        update_view();
	}
}

function buy_yew_chopper(){
	'use strict';
	if (player.gold >= game.yew_chopper_cost) {
		player.yew_chopper_count = player.yew_chopper_count + 1;
		player.gold = Math.round((player.gold - game.yew_chopper_cost) * 100) / 100;
		player.gold_per_second = Math.round((player.gold_per_second + game.yew_chopper_gold) * 100) / 100;
        game.yew_chopper_cost = Math.round((game.yew_chopper_cost * cost_multiplier) * 100) / 100;
		document.getElementById('yew_chopper_count').innerHTML = player.yew_chopper_count;
		document.getElementById('player_gold').innerHTML = player.gold;
		document.getElementById('gold_per_second').innerHTML = player.gold_per_second;
        document.getElementById('yew_chopper_cost').innerHTML = game.yew_chopper_cost;
        update_view();
	}
}

function buy_runite_ore_miner(){
	'use strict';
	if (player.gold >= game.runite_ore_miner_cost) {
		player.runite_ore_miner_count = player.runite_ore_miner_count + 1;
		player.gold = Math.round((player.gold - game.runite_ore_miner_cost) * 100) / 100;
		player.gold_per_second = Math.round((player.gold_per_second + game.runite_ore_miner_gold) * 100) / 100;
        game.runite_ore_miner_cost = Math.round((game.runite_ore_miner_cost * cost_multiplier) * 100) / 100;
		document.getElementById('runite_ore_miner_count').innerHTML = player.runite_ore_miner_count;
		document.getElementById('player_gold').innerHTML = player.gold;
		document.getElementById('gold_per_second').innerHTML = player.gold_per_second;
        document.getElementById('runite_ore_miner_cost').innerHTML = game.runite_ore_miner_cost;
        update_view();
	}
}

function buy_frost_dragon_slayer(){
	'use strict';
	if (player.gold >= game.frost_dragon_slayer_cost) {
		player.frost_dragon_slayer_count = player.frost_dragon_slayer_count + 1;
		player.gold = Math.round((player.gold - game.frost_dragon_slayer_cost) * 100) / 100;
		player.gold_per_second = Math.round((player.gold_per_second + game.frost_dragon_slayer_gold) * 100) / 100;
        game.frost_dragon_slayer_cost = Math.round((game.frost_dragon_slayer_cost * cost_multiplier) * 100) / 100;
		document.getElementById('frost_dragon_slayer_count').innerHTML = player.frost_dragon_slayer_count;
		document.getElementById('player_gold').innerHTML = player.gold;
		document.getElementById('gold_per_second').innerHTML = player.gold_per_second;
        document.getElementById('frost_dragon_slayer_cost').innerHTML = game.frost_dragon_slayer_cost;
        update_view();
	}
}

function buy_merchanter(){
	'use strict';
	if (player.gold >= game.merchanter_cost) {
		player.merchanter_count = player.merchanter_count + 1;
		player.gold = Math.round((player.gold - game.merchanter_cost) * 100) / 100;
		player.gold_per_second = Math.round((player.gold_per_second + game.merchanter_gold) * 100) / 100;
        game.merchanter_cost = Math.round((game.merchanter_cost * cost_multiplier) * 100) / 100;
		document.getElementById('merchanter_count').innerHTML = player.merchanter_count;
		document.getElementById('player_gold').innerHTML = player.gold;
		document.getElementById('gold_per_second').innerHTML = player.gold_per_second;
        document.getElementById('merchanter_cost').innerHTML = game.merchanter_cost;
        update_view();
	}
}

function buy_pvm_clan(){
	'use strict';
	if (player.gold >= game.pvm_clan_cost) {
		player.pvm_clan_count = player.pvm_clan_count + 1;
		player.gold = Math.round((player.gold - game.pvm_clan_cost) * 100) / 100;
		player.gold_per_second = Math.round((player.gold_per_second + game.pvm_clan_gold) * 100) / 100;
        game.pvm_clan_cost = Math.round((game.pvm_clan_cost * cost_multiplier) * 100) / 100;
		document.getElementById('pvm_clan_count').innerHTML = player.pvm_clan_count;
		document.getElementById('player_gold').innerHTML = player.gold;
		document.getElementById('gold_per_second').innerHTML = player.gold_per_second;
        document.getElementById('pvm_clan_cost').innerHTML = game.pvm_clan_cost;
        update_view();
	}
}

function buy_dicer(){
	'use strict';
	if (player.gold >= game.dicer_cost) {
		player.dicer_count = player.dicer_count + 1;
		player.gold = Math.round((player.gold - game.dicer_cost) * 100) / 100;
		player.gold_per_second = Math.round((player.gold_per_second + game.dicer_gold) * 100) / 100;
        game.dicer_cost = Math.round((game.dicer_cost * cost_multiplier) * 100) / 100;
		document.getElementById('dicer_count').innerHTML = player.dicer_count;
		document.getElementById('player_gold').innerHTML = player.gold;
		document.getElementById('gold_per_second').innerHTML = player.gold_per_second;
        document.getElementById('dicer_cost').innerHTML = game.dicer_cost;
        update_view();
	}
}
