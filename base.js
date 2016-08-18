// variables

var turael_task_count = 0;
var mazchna_task_count = 0;
var vannaka_task_count = 0;
var chaeldar_task_count = 0;
var nieve_steve_task_count = 0;
var duradel_task_count = 0;

var assigned_slayer_master;
var assigned_task;
var assigned_task_count;

var total_task__count = 0;
var total_kill_count = 0;

var hellhound_task_count = 0;
var hellhound_kill_count = 0;

var greater_demon_task_count = 0;
var greater_demon_kill_count = 0;

var fire_giant_task_count = 0;
var fire_giant_kill_count = 0;

// functions

function validate() {
    var x;
    x = document.getElementById("selectedTaskCount").value;
    if (x == 0) {
        alert("Enter your assigned slayer monster amount.");
        return false;
    }
	else {
		submit_task();
		update_slayer_master_task_count();
	}
}

function submit_task(){
	assigned_slayer_master = document.getElementById("selectedMaster").value;
	assigned_task = document.getElementById("selectedTask").value;
	assigned_task_count = document.getElementById("selectedTaskCount").value;
		document.getElementById('slayerMaster').innerHTML = assigned_slayer_master;
		document.getElementById('assignedTask').innerHTML = assigned_task;
		document.getElementById('assignedTaskCount').innerHTML = assigned_task_count;

	if (document.getElementById("selectedTask").value == "Hellhounds"){ // if selected task = hellhounds
		hellhound_task_count = hellhound_task_count + 1; // add one to hellhound task count
		hellhound_kill_count = hellhound_kill_count + parseInt(assigned_task_count); // add task count to hellhound kill count
			document.getElementById('hellhoundTaskCount').innerHTML = hellhound_task_count;
			document.getElementById('hellhoundKillCount').innerHTML = hellhound_kill_count;
	}
	else if (document.getElementById("selectedTask").value == "Greater Demons"){
		greater_demon_task_count = greater_demon_task_count + 1;
		greater_demon_kill_count = greater_demon_kill_count + parseInt(assigned_task_count);
			document.getElementById('greaterdemonTaskCount').innerHTML = greater_demon_task_count;
			document.getElementById('greaterdemonKillCount').innerHTML = greater_demon_kill_count;
	}
	
	else if (document.getElementById("selectedTask").value == "Fire Giants"){
		fire_giant_task_count = fire_giant_task_count + 1;
		fire_giant_kill_count = fire_giant_kill_count + parseInt(assigned_task_count);
				document.getElementById('firegiantTaskCount').innerHTML = fire_giant_task_count;
				document.getElementById('firegiantKillCount').innerHTML = fire_giant_kill_count;
	}
	
}

function update_slayer_master_task_count(){
	
	if (document.getElementById("selectedMaster").value == "Turael"){
		turael_task_count = turael_task_count + 1;
			document.getElementById('turaelTaskCount').innerHTML = turael_task_count;
	}
	else if (document.getElementById("selectedMaster").value == "Mazchna"){
		mazchna_task_count = mazchna_task_count + 1;
			document.getElementById('mazchnaTaskCount').innerHTML = mazchna_task_count;
	}
	else if (document.getElementById("selectedMaster").value == "Vannaka"){
		vannaka_task_count = vannaka_task_count + 1;
			document.getElementById('vannakaTaskCount').innerHTML = vannaka_task_count;
	}
	else if (document.getElementById("selectedMaster").value == "Chaeldar"){
		chaeldar_task_count = chaeldar_task_count + 1;
			document.getElementById('chaeldarTaskCount').innerHTML = chaeldar_task_count;
	}
	else if (document.getElementById("selectedMaster").value == "NieveSteve"){
		nieve_steve_task_count = nieve_steve_task_count + 1;
			document.getElementById('nievesteveTaskCount').innerHTML = nieve_steve_task_count;
	}
	else if (document.getElementById("selectedMaster").value == "Duradel"){
		duradel_task_count = duradel_task_count + 1;
			document.getElementById('duradelTaskCount').innerHTML = duradel_task_count;
	}
	document.getElementById('slayerMaster').value='';
}





































