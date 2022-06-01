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
	let zipWriter;

	async function updateProgress(index, max){


		await updateProgressDecompress(index, max);
		if(index == max){
			await new Promise(r => setTimeout(r, 200));
			console.log('load complete?');

			const regex = /(^\s+flags={\s+)((^\s+[a-zA-Z0-9_-]+=\d+\s+)*)(^\s+)(=.*\s+)((^\s+[a-zA-Z0-9_-]+=\d+\s+)*)(\s+})/gm;
			const sub = `$1$2$4broken_flag$5$6$8`;
			gamestate_text = await gamestate_text.replace(regex, sub);

			await writeZip('meta', meta_text);
			await writeZip('gamestate', gamestate_text);
			await downloadZip();

		}
	}



	async function loadFiles(filenameEncoding) {
		start_parse_time = new Date().getTime();
		// create a BlobReader to read with a ZipReader the zip from a Blob object
		const reader = new zip.ZipReader(new zip.BlobReader(selectedFile));
		zipWriter = new zip.ZipWriter(new zip.BlobWriter("application/zip"));

		// get all entries from the zip
		const entries = await reader.getEntries();
		$.each(entries, async function(i, entry){

		  // get first entry content as text by using a TextWriter
		  const filename = entry.filename;
		  console.log(filename);

		  if(filename == "meta"){
			meta_text = await entry.getData(
				new zip.TextWriter(),{
					onprogress: function(index, max){},
				}
			)
		  }
		  if(filename == "gamestate"){
			gamestate_text = await entry.getData(
				new zip.TextWriter(),{
					onprogress: updateProgress,
				}
			)
		  }
		})
		await reader.close();

	}


	async function writeZip(filename, file_contents) {
		console.log("writeZip: " + filename);
		return zipWriter.add(filename, new zip.TextReader(file_contents), {});
	}

	async function downloadZip(){
		const blobURL = URL.createObjectURL(await zipWriter.close());
		console.log(blobURL);
		console.log("downloadZip");
		const anchor = document.createElement("a");
		const clickEvent = new MouseEvent("click");
		anchor.href = blobURL;
		anchor.download = 'fixed-' + selectedFile.name;
		anchor.dispatchEvent(clickEvent);
	}



