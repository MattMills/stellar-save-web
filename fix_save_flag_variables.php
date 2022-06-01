<?php
	$this_page = 'saves';
	require_once('../stellar-web/header.php');
?>
	<div id="container" class="container-fluid" style="width:80%">
		<div class="container row">
		<h2>(EARLY DEVELOPMENT)</h2>
		Click open to select save file, or drag and drop save file (NOT IMPLEMENTED YET) to begin editing.<br />
		</div>
		<div class="container row">
<div class="alert alert-danger">This version of the tool is a modified version just intended to un-break save files related to this bug:<br />
<a href="https://forum.paradoxplaza.com/forum/threads/stellaris-ironman-save-borked-hej-hej-policies-and-empty-galaxy-cepheus-3-4-2-7836.1525675/">https://forum.paradoxplaza.com/forum/threads/stellaris-ironman-save-borked-hej-hej-policies-and-empty-galaxy-cepheus-3-4-2-7836.1525675/</a>
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
					<div class="alert alert-danger">Working on your save, this may take a while, the save will download when complete, the window may seem frozen but it's just parsing your save!</div>

				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="lib/zip.js/dist/zip.min.js"></script>
	<script type="text/javascript" src="lib/zip.js/dist/z-worker.js"></script>
	<script type="text/javascript" src="zip-local.js"></script>
	<script type="text/javascript" src="ui-updates.js"></script>
	<script type="text/javascript" src="fix_save_flag_variables_stellaris_parse_worker.js"></script>
<?php

	require_once('../stellar-web/footer.php');
?>
