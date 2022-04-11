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

			parseStage2();

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
		//addSavePart(part_name, part_value); // UI
	}

	function parseStage2(){
		var max = Object.keys(gamestate_parts).length
		updateProgressParse2(0, max);

		var i = 0;
		
		Object.keys(gamestate_parts).forEach((element, index) => {
			gamestate_parts_s2[element] = []
			gamestate_parts[element].forEach((element2,index2) => {
				console.log("Parse2: " + element + " " + index2)
				gamestate_parts_s2[element][index2] = parseStage2SinglePart(element2)
			});
			
			i++;
			updateProgressParse2(i, max);
		});
	}


	function parseStage2SinglePart(part_text){

		var return_array = []
		var current_array = return_array

		var left = ""			//Left side of an =
		var string_value = ""		//inside of ""
		var numeric_value = ""		//Numeric value, [0-9\.-]
		var in_assignment = false	//we're on the right side of an assignment, left should contain name
		var in_string  = false		//we're parsing a string ("")
		var in_numeric = false		//we're parsing a numeric
		var is_whitespace = false


		for( var i = 0; i < part_text.length ; i++){
			current_char = part_text[i];
			if(current_char == '\n' || current_char == '\t' || current_char == ' '){
				is_whitespace = true
			}else{
				is_whitespace = false
			}

			if(current_char == '=' ){
				in_assignment = true
				left = left.trim()
				if(!isNaN(left)){
					left = 'STR_' + left
				}else if(left == 'length'){
					//length is special key
					left == 'STR_length'
				}

			}else if( current_char == '"'){
				in_string = true
				var start_i = i

				string_value = ""
				i++ //first character is ", move past.

				for( ; part_text[i] != '"' && i-start_i<1024; i++){
					try{
						string_value += part_text[i]
					}catch{
						console.log('Parse2 failure in string parsing: length limit 1024')
						break
					}
				}

				if(in_assignment){
					if(left == ""){ 
						left = "__EMPTY__STRING__"
						console.log("Parse2 Error empty string assignment, " + i )
					}
					current_array[left] = string_value
					in_assignment = false
					left = ""
				}else{
					current_array.push(string_value)
				}

				in_string = false
			}else if(in_assignment && !is_whitespace && (current_char == '-' || !isNaN(current_char))){
				in_numeric = true
				numeric_value = part_text[i]
				i++
				
				for( ; (!isNaN(part_text[i]) || part_text[i] == '.') && part_text[i] != '\n' && part_text[i] != '\t' && part_text[i] != ' ' ; i++){
					//Apparently in javascript whitespace  == 0
					numeric_value += part_text[i]
				}
				if(in_assignment && left != ""){
					try{
						current_array[left] = numeric_value
					}catch{
						console.log("Parse2 Error in Numeric assignment: Unable to assign /" + left + "/ value=" + numeric_value)
						console.log(current_array)
					}
					in_assignment = false
					left = ""
				}else{
					current_array.push(numeric_value)
				}

				in_numeric = false
			}else if( current_char == '{' ){
				if(in_assignment){
					current_array[left] = []
					current_array[left]['__PARENT__'] = current_array
					current_array = current_array[left]
					current_array['__START__'] = i
					left = ""
					in_assignment = false
				}else{
					new_array = []
					new_array['__PARENT__'] = current_array
					new_array['__START__'] = i
					current_array.push(new_array)
					current_array = new_array
				}

			}else if( current_char == '}' ){
				var temp_array = current_array['__PARENT__']
				current_array['__END__'] = i
				delete current_array['__PARENT__']
				current_array = temp_array
			}else if( is_whitespace){ //Ignore all whitespace
				if(in_assignment && in_string){
	                                current_array[left] = string_value
	                                in_assignment = false         
	                                left = ""
		                        string_value = ""
				}else if(!in_assignment && left != ""){
					current_array.push(left)
					left = ""
				}
			}else if(!in_assignment){
				left += current_char
			}else if(in_assignment){
				if(in_string ==  false){
					in_string = true
					string_value = ''
				}
				string_value += current_char
			}
		}

		return return_array;
	}

var test = `
	0={
		flag={
			icon={
				category="zoological"
				file="flag_zoological_19.dds"
			}
			background={
				category="backgrounds"
				file="diagonal.dds"
			}
			colors={
				"burgundy"
				"black"
				"black"
				"null"
			}
		}
    }`;
