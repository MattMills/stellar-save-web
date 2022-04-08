meta_contents = null;
gamestate_contents = null;

let selectedFile;
(() => {

	(() => {

		const appContainer = document.getElementById("container");
		const fileInput = document.getElementById("file-input");
		const fileInputButton = document.getElementById("file-input-button");
		fileInput.onchange = selectFile;
		fileInputButton.onclick = () => fileInput.dispatchEvent(new MouseEvent("click"));
		zip.configure({ workerScripts: { inflate: ["z-worker.js"] } });

		async function selectFile() {
			try {
				fileInputButton.disabled = true;
				selectedFile = fileInput.files[0];
				await $('#progress-modal').modal('show');
				await loadFiles();
			} catch (error) {
				alert(error);
			} finally {
				fileInputButton.disabled = false;
			}
		}

		async function updateProgressDecompress(index, max) {
			const progress_bar = $('#progress-decompress');
			progress_bar.width(index/max*100 +'%');
			progress_bar.text("Decompress: " + index + " / " + max);
		}
		async function updateProgressParse1(index, max){
			const progress_bar = $('#progress-parse-1');
			progress_bar.width(index/max*100 +'%');
			progress_bar.text("Parse stage 1: " + index + " / " + max);
		}

	})();

})();
