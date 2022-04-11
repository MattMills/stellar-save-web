async function updateProgressDecompress(index, max) {
	const progress_bar = $('#progress-decompress');
	progress_bar.width(index/max*100 +'%');
	console.log("Decompress progress: " + index + " / " + max);
	progress_bar.text("Decompress: " + index + " / " + max);
}
async function updateProgressParse1(index, max){
	const progress_bar = $('#progress-parse-1');
	progress_bar.width(index/max*100 +'%');
	console.log("Parse1 progress: " + index + " / " + max);
	progress_bar.text("Parse stage 1: " + index + " / " + max);
}
async function updateProgressParse2(index, max){
	        const progress_bar = $('#progress-parse-2');
	        progress_bar.width(index/max*100 +'%');
	        console.log("Parse2 progress: " + index + " / " + max);
	        progress_bar.text("Parse stage 2: " + index + " / " + max);
}

async function updateSaveSize(size){
	const element = $('#save-size');
	element.text((size/1024/1024).toFixed(2)+ " MB")
}
async function updateSaveParts(parts){
	const element = $('#save-parts');
	element.text(parts);
}
async function updateSaveMaxRecursion(max){
	const element = $('#save-max-recursion');
	element.text(max);

}
async function addSavePart(part_name, part_value){
	const element = $('#save-parts-list');
	var new_element = $("<li class='list-group-item'></li>").text(part_name + " " + part_value.substr(0, 64));
	element.append(new_element);
}

async function updateSaveLoadTime(start, end){
	const element = $('#save-load-time');
	element.text(((end-start)/1000).toFixed(1) + " seconds");
}

function stripQuotes(input){
	return String(input).replace(/^["'](.+(?=["']$))["']$/, '$1');
}

async function updateUIPostLoad(){
	$('#save-version').text(stripQuotes(gamestate_parts['version']));
	$('#save-version-control').text(gamestate_parts['version_control_revision']);
	$('#save-rng-seed').text(gamestate_parts['random_seed']);
	$('#save-rng-count').text(gamestate_parts['random_count']);
	$('#save-name').text(stripQuotes(gamestate_parts['name']));
	$('#save-date').text(stripQuotes(gamestate_parts['date']));
	$('#save-galaxy-radius').text(gamestate_parts['galaxy_radius']);
	$('#save-camera-focus').text(gamestate_parts['camera_focus']);

	$('#save-last_created_species_ref')	.text(gamestate_parts['last_created_species_ref']);
	$('#save-last_created_pop')		.text(gamestate_parts['last_created_pop']);
	$('#save-last_created_country')		.text(gamestate_parts['last_created_country']);
	$('#save-last_refugee_country')		.text(gamestate_parts['last_refugee_country']);
	$('#save-last_created_system')		.text(gamestate_parts['last_created_system']);
	$('#save-last_created_fleet')		.text(gamestate_parts['last_created_fleet']);
	$('#save-last_created_ship')		.text(gamestate_parts['last_created_ship']);
	$('#save-last_created_leader')		.text(gamestate_parts['last_created_leader']);
	$('#save-last_created_army')		.text(gamestate_parts['last_created_army']);
	$('#save-last_created_design')		.text(gamestate_parts['last_created_design']);
	$('#save-last_created_ambient_object')	.text(gamestate_parts['last_created_ambient_object']);
	$('#save-last_diplo_action_id')		.text(gamestate_parts['last_diplo_action_id']);
	$('#save-last_notification_id')		.text(gamestate_parts['last_notification_id']);
	$('#save-last_event_id')		.text(gamestate_parts['last_event_id']);
	$('#save-last_created_pop_faction')	.text(gamestate_parts['last_created_pop_faction']);
	$('#save-last_killed_country_name')	.text(stripQuotes(gamestate_parts['last_killed_country_name']));

	$('#save-dlc-pre').text(gamestate_parts['required_dlcs']);
	updateUICountries()
	$('#save-species-pre').text(gamestate_parts['species_db']);
	$('#save-diplomacy-pre').text(gamestate_parts['war']);
}

function updateUICountries(){
	/*
	<th>ID</th>
	<th>Flag</th>
	<th>Name</th>
	<th>Power (Econ/Mil/Tech)</th>
	<th>Score</th>
	<th>Rank</th>
	<th>Size</th>
	<th>Pops</th>
	<th>Government</th>
	<th>Origin</th>
	<th>Starbases</th>
	*/
	//TODO: Clear any rows for double load

	countries = gamestate_parts_s2['country'][0][0];

	for(let key in countries){
		if(key.substring(0,2) == '__'){
			continue;
		}
		if(countries[key] == "none"){
			continue;
		}
		var sub_key = key.substring(4);
		countries[key]['economy_power'] = Math.round(countries[key]['economy_power'])
		countries[key]['military_power'] = Math.round(countries[key]['military_power'])
		countries[key]['tech_power'] = Math.round(countries[key]['tech_power'])
		countries[key]['victory_score'] = Math.round(countries[key]['victory_score'])
		
		$('#save-country-table > tbody:last-child').append(`
		<tr>
			<td>${sub_key}</td>
			<td>&nbsp;</td>
			<td>${countries[key]['name']}</td>
			<td>${countries[key]['economy_power']}</td>
			<td>${countries[key]['military_power']}</td>
			<td>${countries[key]['tech_power']}</td>
			<td>${countries[key]['victory_score']}</td>
			<td>${countries[key]['victory_rank']}</td>
			<td>${countries[key]['empire_size']}</td>
			<td>${countries[key]['sapient']}</td>
			<td>&nbsp;</td>
			<td></td>
			<td>${countries[key]['num_upgraded_starbase']} / ${countries[key]['starbase_capacity']}</td>
		</tr>`)
	}
		
		
	

}
