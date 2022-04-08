	var meta_text = null;
	var gamestate_text = null;
	var gamestate_parts = [];
	var gamestate_parts_s2 = [];
	var open = 0;
	var max_depth = 0;
	var close = 0;
	var part_progress = "";
	var current_byte = 0;
	var part_count = 0;

	async function loadFiles(filenameEncoding) {
		start_parse_time = new Date().getTime();
		// create a BlobReader to read with a ZipReader the zip from a Blob object
		const reader = new zip.ZipReader(new zip.BlobReader(selectedFile));

		// get all entries from the zip
		const entries = await reader.getEntries();
		$.each(entries, async function(i, entry){

		  // get first entry content as text by using a TextWriter
		  const filename = entry.filename;
		  console.log(filename);

		  if(filename == "meta"){
			meta_text = await entry.getData(new zip.TextWriter(),{
								onprogress: function(index, max){}
							     });
		  }
		  if(filename == "gamestate"){
			gamestate_text = await entry.getData(new zip.TextWriter(),{
				onprogress: updateProgressDecompress
				}
			);
		  }
		});


		// close the ZipReader
		await reader.close();

		//Reset if this is a second load
		gamestate_parts = [];
		gamestate_parts_s2 = [];
		max_depth = 0;
		current_byte = 0;
		part_progress = "";
		part_count = 0;

		updateProgressParse1Interval();
	}

	function updateProgressParse1Interval(){
		if(gamestate_text == null){
			setTimeout(updateProgressParse1Interval, 100);
			return
		}

		for(var start_byte = current_byte ; current_byte < gamestate_text.length && current_byte < start_byte+1000000  ; current_byte++){
			part_progress = part_progress + gamestate_text[current_byte];

			if(gamestate_text[current_byte] == "{"){
				open = open + 1;
			}else if(gamestate_text[current_byte] == "}"){
				close = close + 1;
			}
			
			if((open-close) > max_depth){
				max_depth = open-close;
			}

			if(open == 0 && gamestate_text[current_byte] == "\n" && part_progress.length > 1){
				newSavePart(part_progress);
				updateProgressParse1(current_byte, gamestate_text.length);

				part_progress = "";
			}
			if( open > 0 && open == close){
				newSavePart(part_progress);
				updateProgressParse1(current_byte, gamestate_text.length);

				part_progress = "";
				open = 0;
				close = 0;
			}
		}
		updateProgressParse1(current_byte, gamestate_text.length);


		if(current_byte == gamestate_text.length && current_byte != null){
			updateSaveSize(gamestate_text.length);
			updateSaveParts(part_count);
			updateSaveMaxRecursion(max_depth);



			end_parse_time = new Date().getTime();
			updateSaveLoadTime(start_parse_time, end_parse_time);

			updateUIPostLoad();
			$('#progress-modal').modal('hide');

		}else{
			setTimeout(updateProgressParse1Interval, 1);
		}
	}
	
	function newSavePart(part){
		part_count = part_count + 1;

		const part_re = /(?<part_name>^[^=]+)=(?<part_value>.+)/msi;
		result = part_re.exec(part_progress);
		try {
			part_name = result.groups.part_name.trim();
		} catch(error) {
			console.error(error);
			console.log(part_progress);
		}
		try {
			part_value = result.groups.part_value.trim();
		} catch(error) {
			console.error(error);
			console.log(part_progress);
		}
		
		if( gamestate_parts.hasOwnProperty(part_name) == false){
			gamestate_parts[part_name] = [];
		}

		gamestate_parts[part_name].push(part_value);
		addSavePart(part_name, part_value); // UI
	}
