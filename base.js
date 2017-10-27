/* VARIABLES SECTION */

/* PLAYER STATS AND INFORMATION */

var realm = {
	current_dust: 1,
	lifetime_dust: 1,
	current_energy: 1,
	lifetime_energy: 1,
	current_clicks: 1,
	lifetime_clicks: 1,
	lifetime_solar_mass: 1,
	time_played_this_realm: 1,
	date_started_playing: 1,
	time_since_started_playing: 1, //in seconds
	upgrades_purchased: 1,
	formation_count: 1,
	click_object_click_income: 1, //income is solar mass divided by dust per solar mass
	click_object_solar_mass: 1,
	click_object_solar_mass_increase_dust_cost: 1,
	click_object_solar_mass_increase_dust_cost_multiplier: 1.15,
	click_object_click_income_per_solar_mass: 1, //upgrade required to unlock more income per solar mass bonus
	click_object_click_income_upgrade_level: 1, //upgrade essentially means more dust per click per solar mass
	click_object_click_income_upgrade_cost: 25,
	click_object_click_income_upgrade_cost_multiplier: 1.15,
	click_object_dust_income_per_second: 1,
	click_object_dust_income_per_solar_mass: 1,
	click_object_energy_multiplier: 1.15,
	click_object_energy_upgrade_level: 1,
	click_object_energy_upgrade_cost: 1,
	click_object_energy_upgrade_cost_multiplier: 1.15,
	click_object_star_formed: 0, //0 = no, 1 = yes
	click_object_star_formation_dust_required: 1,
	click_object_black_hole_formed: 0, //0 = no, 1 = yes
	click_object_black_hole_formation_dust_required: 1	
};


/* dust can be converted into other currencies for upgrades e.g. energy/ dark matter/ dark energy or used to increase mass of object!!!

galaxies compromised of different percentage of star clasfifications
galaxies extremely hard to buy
explode stars 

upgrade to form galaxy once enough mass (gains status over time?)

stars form over time
gather dust to galaxy
upgrades increase dust collection?

supernova explosions (maybe accurate % per second?) that give energy

e.g. 1% explode every second once at black hole stage



clicks increase amount of dust or size/strength of black hole?
start off with galaxy/black hole
dust makes stars after collecting so much
upgrades to increase dust collection or size/strength of black hole


as blackhole mass/gravity increases attracts more dust/stars and eventually a black hole

start off with a star, explode to make a black hole, on reset star starts off with more mass or more elements etc
*/


/* FUNCTIONS */

function clickObjectClick(){
	realm.current_dust = realm.current_dust + (realm.click_object_click_income + (realm.click_object_click_income_per_solar_mass * realm.click_object_solar_mass)); //adds dust income to current dus
    realm.lifetime_dust = realm.current_dust; //adds dust income to lifetime dust
	realm.current_clicks = realm.current_clicks + 1; //adds 1 to current clicks
	realm.lifetime_clicks = realm.lifetime_clicks + 1; //adds 1 to lifetime clicks
					updateDisplay();
}

function dustIncome(){
	realm.click_object_dust_income_per_second = (realm.click_object_solar_mass * realm.click_object_dust_income_per_solar_mass);
	realm.current_dust = realm.current_dust + realm.click_object_dust_income_per_second;
	
	realm.time_since_started_playing = realm.time_since_started_playing + 1;
	

	updateDisplay();
}

// UPDATE DISPLAY

function updateDisplay(){
	
	document.getElementById('clickObjectClickIncome').innerHTML = realm.click_object_click_income;
	document.getElementById('clickObjectClickIncomePerSolarMass').innerHTML = realm.click_object_click_income_per_solar_mass;
	document.getElementById('clickObjectClickIncomeUpgradeLevel').innerHTML = realm.click_object_click_income_upgrade_level;
	document.getElementById('clickObjectClickIncomeUpgradeCost').innerHTML = realm.click_object_click_income_upgrade_cost;
	
	document.getElementById('currentDust').innerHTML = realm.current_dust;
	document.getElementById('lifetimeDust').innerHTML = realm.lifetime_dust;
	document.getElementById('currentEnergy').innerHTML = realm.current_energy;
	document.getElementById('lifetimeEnergy').innerHTML = realm.lifetime_energy;
	document.getElementById('lifetimeSolarMass').innerHTML = realm.lifetime_solar_mass;
	document.getElementById('currentClicks').innerHTML = realm.current_clicks;
	document.getElementById('lifetimeClicks').innerHTML = realm.lifetime_clicks;
	document.getElementById('timePlayedThisRealm').innerHTML = realm.time_played_this_realm;
	document.getElementById('timeSinceStartedPlaying').innerHTML = realm.time_since_started_playing;
	document.getElementById('upgradesPurchased').innerHTML = realm.upgrades_purchased;
	document.getElementById('formationCount').innerHTML = realm.formation_count;
}
	
// SAVE GAME

function save_game(){
   localStorage['1'] = btoa(JSON.stringify(realm));
}

function load_game(){
	if (!localStorage['1']) return;
	var save_data = JSON.parse(atob(localStorage['1']));
	realm = save_data;
	updateDisplay();
}

window.setInterval(function(){
dustIncome();
updateDisplay();
}, 1000);
