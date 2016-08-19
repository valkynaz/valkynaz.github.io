// variables

var user = {
	assigned_slayer_master: "",
	assigned_task: "",
	assigned_task_count: 0,
	
	first_previous_task: "",
	first_previous_task_count: 0,
	second_previous_task: "",
	second_previous_task_count: 0,
	third_previous_task: "",
	third_previous_task_count: 0,
	fourth_previous_task: "",
	fourth_previous_task_count: 0,
	fifth_previous_task: "",
	fifth_previous_task_count: 0,
	
	total_task_count: 0,
	total_kill_count: 0,
	
	turael_task_count: 0,
	mazchna_task_count: 0,
	vannaka_task_count: 0,
	chaeldar_task_count: 0,
	nieve_steve_task_count: 0,
	duradel_task_count: 0,
	
	aberrant_spectre_task_count: 0,
	aberrant_spectre_kill_count: 0,
	abyssal_demon_task_count: 0,
	abyssal_demon_kill_count: 0,
	ankou_task_count: 0,
	ankou_kill_count: 0,
	aviansie_task_count: 0,
	aviansie_kill_count: 0,
	black_demon_task_count: 0,
	black_demon_kill_count: 0,
	black_dragon_task_count: 0,
	black_dragon_kill_count: 0,
	bloodveld_task_count: 0,
	bloodveld_kill_count: 0,
	blue_dragon_task_count: 0,
	blue_dragon_kill_count: 0,
	brine_rat_task_count: 0,
	brine_rat_kill_count: 0,
	cave_horror_task_count: 0,
	cave_horror_kill_count: 0,
	cave_kraken_task_count: 0,
	cave_kraken_kill_count: 0,
	dagannoth_task_count: 0,
	dagannoth_kill_count: 0,
	dark_beast_task_count: 0,
	dark_beast_kill_count: 0,
	dust_devil_task_count: 0,
	dust_devil_kill_count: 0,
	elves_task_count: 0,
	elves_kill_count: 0,
	fire_giant_task_count: 0,
	fire_giant_kill_count: 0,
	gargoyle_task_count: 0,
	gargoyle_kill_count: 0,
	greater_demon_task_count: 0,
	greater_demon_kill_count: 0,
	hellhound_task_count: 0,
	hellhound_kill_count: 0,
	iron_dragon_task_count: 0,
	iron_dragon_kill_count: 0,
	kalphite_task_count: 0,
	kalphite_kill_count: 0,
	kurask_task_count: 0,
	kurask_kill_count: 0,
	lizardmen_task_count: 0,
	lizardmen_kill_count: 0,
	mithril_dragon_task_count: 0,
	mithril_dragon_kill_count: 0,
	mutated_zygomite_task_count: 0,
	mutated_zygomite_kill_count: 0,
	nechryael_task_count: 0,
	nechryael_kill_count: 0,
	red_dragon_task_count: 0,
	red_dragon_kill_count: 0,
	scabarites_task_count: 0,
	scabarites_kill_count: 0,
	skeletal_wyvern_task_count: 0,
	skeletal_wyvern_kill_count: 0,
	smoke_devil_task_count: 0,
	smoke_devil_kill_count: 0,
	spiritual_creatures_task_count: 0,
	spiritual_creatures_kill_count: 0,
	steel_dragon_task_count: 0,
	steel_dragon_kill_count: 0,
	suqah_task_count: 0,
	suqah_kill_count: 0,
	troll_task_count: 0,
	troll_kill_count: 0,
	turoth_task_count: 0,
	turoth_kill_count: 0,
	tzhaar_task_count: 0,
	tzhaar_kill_count: 0,
};





// functions

function validate() {
  var e1;
  var e2;
  var e3;
  e1 = document.getElementById("selectedMaster").value;
  e2 = document.getElementById("selectedTask").value;
  e3 = document.getElementById("selectedTaskCount").value;
  if (e1 == 0) {
    alert("Enter the slayer master you are using.");
    return false;
  } else if (e2 == 0) {
    alert("Enter your assigned slayer monster.");
    return false;
  } else if (e3 == 0) {
    alert("Enter your assigned slayer monster count.");
    return false;
  } else {
    submit_task();
  }
}

function save_stats() {
   localStorage['slayerlogsave'] = btoa(JSON.stringify(user));
}

function load_stats() {
    if (!localStorage['slayerlogsave']) return;
    var save_data = JSON.parse(atob(localStorage['slayerlogsave']));
    user = save_data;
    update_view();
}

function submit_task(){

	user.assigned_slayer_master = document.getElementById("selectedMaster").value;
	user.assigned_task = document.getElementById("selectedTask").value;
	user.assigned_task_count = document.getElementById("selectedTaskCount").value;
	user.total_task_count = user.total_task_count + 1;
	user.total_kill_count = user.total_kill_count + parseInt(user.assigned_task_count);
	
	if (document.getElementById("selectedTask").value == "Aberrant Spectre"){ // if selected task is aberrant spectre
		user.aberrant_spectre_task_count = user.aberrant_spectre_task_count + 1; // add one to aberrant spectre task count
		user.aberrant_spectre_kill_count = user.aberrant_spectre_kill_count + parseInt(user.assigned_task_count); // add assigned task count to aberrant spectre kill count
	}
	else if (document.getElementById("selectedTask").value == "Abyssal Demon"){
		user.abyssal_demon_task_count = user.abyssal_demon_task_count + 1;
		user.abyssal_demon_kill_count = user.abyssal_demon_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Ankou"){
		user.ankou_task_count = user.ankou_task_count + 1;
		user.ankou_kill_count = user.ankou_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Aviansie"){
		user.aviansie_task_count = user.aviansie_task_count + 1;
		user.aviansie_kill_count = user.aviansie_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Black Demon"){
		user.black_demon_task_count = user.black_demon_task_count + 1;
		user.black_demon_kill_count = user.black_demon_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Black Dragon"){
		user.black_dragon_task_count = user.black_dragon_task_count + 1;
		user.black_dragon_kill_count = user.black_dragon_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Bloodveld"){
		user.bloodveld_task_count = user.bloodveld_task_count + 1;
		user.bloodveld_kill_count = user.bloodveld_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Blue Dragon"){
		user.blue_dragon_task_count = user.blue_dragon_task_count + 1;
		user.blue_dragon_kill_count = user.blue_dragon_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Brine Rat"){
		user.brine_rat_task_count = user.brine_rat_task_count + 1;
		user.brine_rat_kill_count = user.brine_rat_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Cave Horror"){
		user.cave_horror_task_count = user.cave_horror_task_count + 1;
		user.cave_horror_kill_count = user.cave_horror_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Cave Kraken"){
		user.cave_kraken_task_count = user.cave_kraken_task_count + 1;
		user.cave_kraken_kill_count = user.cave_kraken_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Dagannoth"){
		user.dagannoth_task_count = user.dagannoth_task_count + 1;
		user.dagannoth_kill_count = user.dagannoth_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Dark Beast"){
		user.dark_beast_task_count = user.dark_beast_task_count + 1;
		user.dark_beast_kill_count = user.dark_beast_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Dust Devil"){
		user.dust_devil_task_count = user.dust_devil_task_count + 1;
		user.dust_devil_kill_count = user.dust_devil_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Elves"){
		user.elves_task_count = user.elves_task_count + 1;
		user.elves_kill_count = user.elves_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Fire Giant"){
		user.fire_giant_task_count = user.fire_giant_task_count + 1;
		user.fire_giant_kill_count = user.fire_giant_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Gargoyle"){
		user.gargoyle_task_count = user.gargoyle_task_count + 1;
		user.gargoyle_kill_count = user.gargoyle_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Greater Demon"){
		user.greater_demon_task_count = user.greater_demon_task_count + 1;
		user.greater_demon_kill_count = user.greater_demon_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Hellhound"){
		user.hellhound_task_count = user.hellhound_task_count + 1;
		user.hellhound_kill_count = user.hellhound_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Iron Dragon"){
		user.iron_dragon_task_count = user.iron_dragon_task_count + 1;
		user.iron_dragon_kill_count = user.iron_dragon_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Kalphite"){
		user.kalphite_task_count = user.kalphite_task_count + 1;
		user.kalphite_kill_count = user.kalphite_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Kurask"){
		user.kurask_task_count = user.kurask_task_count + 1;
		user.kurask_kill_count = user.kurask_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Lizardmen"){
		user.lizardmen_task_count = user.lizardmen_task_count + 1;
		user.lizardmen_kill_count = user.lizardmen_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Mithril Dragon"){
		user.mithril_dragon_task_count = user.mithril_dragon_task_count + 1;
		user.mithril_dragon_kill_count = user.mithril_dragon_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Mutated Zygomite"){
		user.mutated_zygomite_task_count = user.mutated_zygomite_task_count + 1;
		user.mutated_zygomite_kill_count = user.mutated_zygomite_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Nechryael"){
		user.nechryael_task_count = user.nechryael_task_count + 1;
		user.nechryael_kill_count = user.nechryael_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Mithril Dragon"){
		user.mithril_dragon_task_count = user.mithril_dragon_task_count + 1;
		user.mithril_dragon_kill_count = user.mithril_dragon_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Red Dragon"){
		user.red_dragon_task_count = user.red_dragon_task_count + 1;
		user.red_dragon_kill_count = user.red_dragon_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Scabarites"){
		user.scabarites_task_count = user.scabarites_task_count + 1;
		user.scabarites_kill_count = user.scabarites_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Skeletal Wyvern"){
		user.skeletal_wyvern_task_count = user.skeletal_wyvern_task_count + 1;
		user.skeletal_wyvern_kill_count = user.skeletal_wyvern_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Smoke Devil"){
		user.smoke_devil_task_count = user.smoke_devil_task_count + 1;
		user.smoke_devil_kill_count = user.smoke_devil_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Spiritual Creatures"){
		user.spiritual_creatures_task_count = user.spiritual_creatures_task_count + 1;
		user.spiritual_creatures_kill_count = user.spiritual_creatures_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Steel Dragon"){
		user.steel_dragon_task_count = user.steel_dragon_task_count + 1;
		user.steel_dragon_kill_count = user.steel_dragon_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Suqah"){
		user.suqah_task_count = user.suqah_task_count + 1;
		user.suqah_kill_count = user.suqah_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Troll"){
		user.troll_task_count = user.troll_task_count + 1;
		user.troll_kill_count = user.troll_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "Turoth"){
		user.turoth_task_count = user.turoth_task_count + 1;
		user.turoth_kill_count = user.turoth_kill_count + parseInt(user.assigned_task_count);
	}
	else if (document.getElementById("selectedTask").value == "TzHaar"){
		user.tzhaar_task_count = user.tzhaar_task_count + 1;
		user.tzhaar_kill_count = user.tzhaar_kill_count + parseInt(user.assigned_task_count);
	}
	
	
	
	if (document.getElementById("selectedMaster").value == "Turael"){
		user.turael_task_count = user.turael_task_count + 1;
			document.getElementById('turaelTaskCount').innerHTML = user.turael_task_count;
	}
	else if (document.getElementById("selectedMaster").value == "Mazchna"){
		user.mazchna_task_count = user.mazchna_task_count + 1;
			document.getElementById('mazchnaTaskCount').innerHTML = user.mazchna_task_count;
	}
	else if (document.getElementById("selectedMaster").value == "Vannaka"){
		user.vannaka_task_count = user.vannaka_task_count + 1;
			document.getElementById('vannakaTaskCount').innerHTML = user.vannaka_task_count;
	}
	else if (document.getElementById("selectedMaster").value == "Chaeldar"){
		user.chaeldar_task_count = user.chaeldar_task_count + 1;
			document.getElementById('chaeldarTaskCount').innerHTML = user.chaeldar_task_count;
	}
	else if (document.getElementById("selectedMaster").value == "Nieve/Steve"){
		user.nieve_steve_task_count = user.nieve_steve_task_count + 1;
			document.getElementById('nievesteveTaskCount').innerHTML = user.nieve_steve_task_count;
	}
	else if (document.getElementById("selectedMaster").value == "Duradel"){
		user.duradel_task_count = user.duradel_task_count + 1;
			document.getElementById('duradelTaskCount').innerHTML = user.duradel_task_count;
	}
	
	update_view();
	save_stats();
}

function update_view(){
	
		document.getElementById('slayerMaster').innerHTML = user.assigned_slayer_master;
		document.getElementById('assignedTask').innerHTML = user.assigned_task;
		document.getElementById('assignedTaskCount').innerHTML = user.assigned_task_count;
		document.getElementById('totalTaskCount').innerHTML = user.total_task_count;
		document.getElementById('totalKillCount').innerHTML = user.total_kill_count;
		
		document.getElementById('turaelTaskCount').innerHTML = user.turael_task_count;
		document.getElementById('mazchnaTaskCount').innerHTML = user.mazchna_task_count;
		document.getElementById('vannakaTaskCount').innerHTML = user.vannaka_task_count;
		document.getElementById('chaeldarTaskCount').innerHTML = user.chaeldar_task_count;
		document.getElementById('nievesteveTaskCount').innerHTML = user.nieve_steve_task_count;
		document.getElementById('duradelTaskCount').innerHTML = user.duradel_task_count;
		
		document.getElementById('aberrantspectreTaskCount').innerHTML = user.aberrant_spectre_task_count;
		document.getElementById('aberrantspectreKillCount').innerHTML = user.aberrant_spectre_kill_count;
		document.getElementById('abyssaldemonTaskCount').innerHTML = user.abyssal_demon_task_count;
		document.getElementById('abyssaldemonKillCount').innerHTML = user.abyssal_demon_kill_count;
		document.getElementById('ankouTaskCount').innerHTML = user.ankou_task_count;
		document.getElementById('ankouKillCount').innerHTML = user.ankou_kill_count;
		document.getElementById('aviansieTaskCount').innerHTML = user.aviansie_task_count;
		document.getElementById('aviansieKillCount').innerHTML = user.aviansie_kill_count;
		document.getElementById('blackdemonTaskCount').innerHTML = user.black_demon_task_count;
		document.getElementById('blackdemonKillCount').innerHTML = user.black_demon_kill_count;
		document.getElementById('blackdragonTaskCount').innerHTML = user.black_dragon_task_count;
		document.getElementById('blackdragonKillCount').innerHTML = user.black_dragon_kill_count;
		document.getElementById('bloodveldTaskCount').innerHTML = user.bloodveld_task_count;
		document.getElementById('bloodveldKillCount').innerHTML = user.bloodveld_kill_count;
		document.getElementById('bluedragonTaskCount').innerHTML = user.blue_dragon_task_count;
		document.getElementById('bluedragonKillCount').innerHTML = user.blue_dragon_kill_count;
		document.getElementById('brineratTaskCount').innerHTML = user.brine_rat_task_count;
		document.getElementById('brineratKillCount').innerHTML = user.brine_rat_kill_count;
		document.getElementById('cavehorrorTaskCount').innerHTML = user.cave_horror_task_count;
		document.getElementById('cavehorrorKillCount').innerHTML = user.cave_horror_kill_count;
		document.getElementById('cavekrakenTaskCount').innerHTML = user.cave_kraken_task_count;
		document.getElementById('cavekrakenKillCount').innerHTML = user.cave_kraken_kill_count;
		document.getElementById('dagannothTaskCount').innerHTML = user.dagannoth_task_count;
		document.getElementById('dagannothKillCount').innerHTML = user.dagannoth_kill_count;
		document.getElementById('darkbeastTaskCount').innerHTML = user.dark_beast_task_count;
		document.getElementById('darkbeastKillCount').innerHTML = user.dark_beast_kill_count;
		document.getElementById('dustdevilTaskCount').innerHTML = user.dust_devil_task_count;
		document.getElementById('dustdevilKillCount').innerHTML = user.dust_devil_kill_count;
		document.getElementById('elvesTaskCount').innerHTML = user.elves_task_count;
		document.getElementById('elvesKillCount').innerHTML = user.elves_kill_count;
		document.getElementById('firegiantTaskCount').innerHTML = user.fire_giant_task_count;
		document.getElementById('firegiantKillCount').innerHTML = user.fire_giant_kill_count;
		document.getElementById('hellhoundTaskCount').innerHTML = user.hellhound_task_count;
		document.getElementById('hellhoundKillCount').innerHTML = user.hellhound_kill_count;
		document.getElementById('gargoyleTaskCount').innerHTML = user.gargoyle_task_count;
		document.getElementById('gargoyleKillCount').innerHTML = user.gargoyle_kill_count;
		document.getElementById('greaterdemonTaskCount').innerHTML = user.greater_demon_task_count;
		document.getElementById('greaterdemonKillCount').innerHTML = user.greater_demon_kill_count;
		document.getElementById('hellhoundTaskCount').innerHTML = user.hellhound_task_count;
		document.getElementById('hellhoundKillCount').innerHTML = user.hellhound_kill_count;
		document.getElementById('irondragonTaskCount').innerHTML = user.iron_dragon_task_count;
		document.getElementById('irondragonKillCount').innerHTML = user.iron_dragon_kill_count;
		document.getElementById('kalphiteTaskCount').innerHTML = user.kalphite_task_count;
		document.getElementById('kalphiteKillCount').innerHTML = user.kalphite_kill_count;
		document.getElementById('kuraskTaskCount').innerHTML = user.kurask_task_count;
		document.getElementById('kuraskKillCount').innerHTML = user.kurask_kill_count;
		document.getElementById('lizardmenTaskCount').innerHTML = user.lizardmen_task_count;
		document.getElementById('lizardmenKillCount').innerHTML = user.lizardmen_kill_count;
		document.getElementById('mithrildragonTaskCount').innerHTML = user.mithril_dragon_task_count;
		document.getElementById('mithrildragonKillCount').innerHTML = user.mithril_dragon_kill_count;
		document.getElementById('mutatedzygomiteTaskCount').innerHTML = user.mutated_zygomite_task_count;
		document.getElementById('mutatedzygomiteKillCount').innerHTML = user.mutated_zygomite_kill_count;		
		document.getElementById('nechryaelTaskCount').innerHTML = user.nechryael_task_count;
		document.getElementById('nechryaelKillCount').innerHTML = user.nechryael_kill_count;	
		document.getElementById('reddragonTaskCount').innerHTML = user.red_dragon_task_count;
		document.getElementById('reddragonKillCount').innerHTML = user.red_dragon_kill_count;		
		document.getElementById('scabaritesTaskCount').innerHTML = user.scabarites_task_count;
		document.getElementById('scabaritesKillCount').innerHTML = user.scabarites_kill_count;		
		document.getElementById('skeletalwyvernTaskCount').innerHTML = user.skeletal_wyvern_task_count;
		document.getElementById('skeletalwyvernKillCount').innerHTML = user.skeletal_wyvern_kill_count;		
		document.getElementById('smokedevilTaskCount').innerHTML = user.smoke_devil_task_count;
		document.getElementById('smokedevilKillCount').innerHTML = user.smoke_devil_kill_count;		
		document.getElementById('spiritualcreaturesTaskCount').innerHTML = user.spiritual_creatures_task_count;
		document.getElementById('spiritualcreaturesKillCount').innerHTML = user.spiritual_creatures_kill_count;		
		document.getElementById('steeldragonTaskCount').innerHTML = user.steel_dragon_task_count;
		document.getElementById('steeldragonKillCount').innerHTML = user.steel_dragon_kill_count;	
		document.getElementById('suqahTaskCount').innerHTML = user.suqah_task_count;
		document.getElementById('suqahKillCount').innerHTML = user.suqah_kill_count;		
		document.getElementById('trollTaskCount').innerHTML = user.troll_task_count;
		document.getElementById('trollKillCount').innerHTML = user.troll_kill_count;		
		document.getElementById('turothTaskCount').innerHTML = user.turoth_task_count;
		document.getElementById('turothKillCount').innerHTML = user.turoth_kill_count;		
		document.getElementById('tzhaarTaskCount').innerHTML = user.tzhaar_task_count;
		document.getElementById('tzhaarKillCount').innerHTML = user.tzhaar_kill_count;		
		
}