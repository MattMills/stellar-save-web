<?php
	$this_page = 'saves';
	require_once('../stellar-web/header.php');
?>
	<div id="container" class="container-fluid" style="width:80%">
		<div class="container row">
		<h2>(EARLY DEVELOPMENT)</h2>
		Click open to select save file, or drag and drop save file (NOT IMPLEMENTED YET) to begin editing.<br />
		</div>
		<div class="row">&nbsp;</div>
		<div class="row">&nbsp;</div>
		<form>
		<div id="file-open-container" class="col-12 align-self-center drop_zone">
			<div class="mb-3">
				<label for="file-input" class="form-label">Select Stellaris save file</label>
				<div class="input-group">
					<input class="form-control" type="file" id="file-input">
					<button id="file-input-button" class="btn btn-primary">Open...</button>
				</div>
			</div>

		</div>
		</form>

		<ul class="nav nav-tabs" id="tablist" role="tablist">
			<li class="nav-item" role="presentation">
				<button class="nav-link active" id="save-meta-tab" data-bs-toggle="tab" data-bs-target="#save-meta" type="button" role="tab">Metadata</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="save-last-ids-tab" data-bs-toggle="tab" data-bs-target="#save-last-ids" type="button" role="tab">Last IDs</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="save-dlc-tab" data-bs-toggle="tab" data-bs-target="#save-dlc" type="button" role="tab">DLC</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="save-country-tab" data-bs-toggle="tab" data-bs-target="#save-country" type="button" role="tab">Countries</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="save-species-tab" data-bs-toggle="tab" data-bs-target="#save-species" type="button" role="tab">Species</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="save-diplomacy-tab" data-bs-toggle="tab" data-bs-target="#save-diplomacy" type="button" role="tab">Diplomacy</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="save-debug-tab" data-bs-toggle="tab" data-bs-target="#save-debug" type="button" role="tab">Debug</button>
			</li>
		</ul>
		<div class="tab-content" id="tab-content">
			<div class="tab-pane fade show active" id="save-meta" role="tabpanel">
				<div class="row">
					<div id="save-meta" class="col-3 p-5">
						<table class="table">
							<tbody>
							<tr><th scope="row">Save Size</th><td id='save-size'></td></tr>
							<tr><th scope="row">Parts</th><td id='save-parts'></td></tr>
							<tr><th scope="row">Max recursion</th><td id='save-max-recursion'></td></tr>
							<tr><th scope="row">Load time</th><td id='save-load-time'></td></tr>
							</tbody>
						</table>
					</div>
					<div id="save-meta-version" class="col-3 p-5">
		                                <table class="table">
		                                        <tbody>
		                                        <tr><th scope="row">Version</th><td id='save-version'></td></tr>
		                                        <tr><th scope="row">Version Rev</th><td id='save-version-control'></td></tr>
		                                        <tr><th scope="row">RNG Seed</th><td id='save-rng-seed'></td></tr>
		                                        <tr><th scope="row">RNG Count</th><td id='save-rng-count'></td></tr>
		                                        </tbody>
		                                </table>
		                        </div>
					<div id="save-meta-version" class="col-5 p-5">
		                                <table class="table">
		                                        <tbody>
		                                        <tr><th scope="row">Name</th><td id='save-name'></td></tr>
		                                        <tr><th scope="row">Date</th><td id='save-date'></td></tr>
		                                        <tr><th scope="row">Galaxy Radius</th><td id='save-galaxy-radius'></td></tr>
		                                        <tr><th scope="row">Camera Focus</th><td id='save-camera-focus'></td></tr>
		                                        </tbody>
		                                </table>
		                        </div>
				</div>
			</div>

			<div class="tab-pane" id="save-last-ids" role="tabpanel">
				<div class="row">
				<div id="save-last-ids-1" class="col-3 p-5">
					<table class="table">
						<tbody>
							<tr><th scope="row">Created Species</th><td id='save-last_created_species_ref'></td></tr>
							<tr><th scope="row">Created Country</th><td id='save-last_created_country'></td></tr>
							<tr><th scope="row">Refugee Country</th><td id='save-last_refugee_country'></td></tr>
							<tr><th scope="row">Created System</th><td id='save-last_created_system'></td></tr>
						</tbody>
					</table>
				</div>
				<div id="save-last-ids-2" class="col-3 p-5">
					<table class="table">
						<tbody>
							<tr><th scope="row">Created Fleet</th><td id='save-last_created_fleet'></td></tr>
							<tr><th scope="row">Created Ship</th><td id='save-last_created_ship'></td></tr>
							<tr><th scope="row">Created Leader</th><td id='save-last_created_leader'></td></tr>
							<tr><th scope="row">Created Army</th><td id='save-last_created_army'></td></tr>
						</tbody>
					</table>
				</div>
				<div id="save-last-ids-3" class="col-3 p-5">
					<table class="table">
						<tbody>
							<tr><th scope="row">Created Design</th><td id='save-last_created_design'></td></tr>
							<tr><th scope="row">Ambient Object</th><td id='save-last_created_ambient_object'></td></tr>
							<tr><th scope="row">Diplo Action</th><td id='save-last_diplo_action_id'></td></tr>
							<tr><th scope="row">Notification</th><td id='save-last_notification_id'></td></tr>
						</tbody>
					</table>
				</div>
				<div id="save-last-ids-4" class="col-3 p-5">
					<table class="table">
						<tbody>
							<tr><th scope="row">Event</th><td id='save-last_event_id'></td></tr>
							<tr><th scope="row">Created Pop Faction</th><td id='save-last_created_pop_faction'></td></tr>
							<tr><th scope="row">Killed Country Name</th><td id='save-last_killed_country_name'></td></tr>
							<tr><th scope="row">Created Pop</th><td id="save-last_created_pop"></td></tr>
						</tbody>
					</table>
				</div>
				</div>
			</div>
			<div class="tab-pane fade" id="save-dlc" role="tabpanel">
				<pre id="save-dlc-pre"></pre>
			</div>
			<div class="tab-pane fade" id="save-country" role="tabpanel">
				<table class="table" id="save-country-table">
					<tr>
						<th>ID</th>
						<th>Flag</th>
						<th>Name</th>
						<th>Econ</th>
						<th>Mil</th>
						<th>Tech</th>
						<th>Score</th>
						<th>Rank</th>
						<th>Size</th>
						<th>Pops</th>
						<th>Government</th>
						<th>Origin</th>
						<th>Starbases</th>
					</tr>
				</table>
			</div>
			<div class="tab-pane fade" id="save-species" role="tabpanel">
				<pre id="save-species-pre"></pre>
			</div>
			<div class="tab-pane fade" id="save-diplomacy" role="tabpanel">
				<pre id="save-diplomacy-pre"></pre>
			</div>
			<div class="tab-pane fade" id="save-debug" role="tabpanel">
				<ul id="save-parts-list" class="list-group">
				</ul>
			</div>
		</div>

	</div>
	<div id="progress-modal" class="modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h3 class="modal-title">Loading save file data</h3>
				</div>
				<div class="modal-body">
					<div class="progress">
				        	<div id="progress-decompress" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
					</div>

					<div class="progress">
					        <div id="progress-parse-1" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
					<div class="progress">
                                                <div id="progress-parse-2" class="progress-bar" role="progressbar" style="width: 90%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">Making this progress bar work takes more thinking</div>
                                        </div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="lib/zip.js/dist/zip.min.js"></script>
	<script type="text/javascript" src="lib/zip.js/dist/z-worker.js"></script>
	<script type="text/javascript" src="zip-local.js"></script>
	<script type="text/javascript" src="ui-updates.js"></script>
	<script type="text/javascript" src="stellaris-parse-worker.js"></script>
<?php

	require_once('../stellar-web/footer.php');
?>
