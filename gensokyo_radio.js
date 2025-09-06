var writeLoopProtection, imgExtension, grFullImgPath, jsonObj;
var grImgFolder = ""; // Where the stored image gets saved at (e.g. D:\\Music\\Radio Stations\\)
var grImgFilename = "";  // Set the filename for your image (e.g. Gensokyo Radio)
var tf_rs = fb.TitleFormat("%radio%"); // Using External Tags to read the %radio% field (change it to your preference)

function on_playback_dynamic_info_track(type) {
	if (type !== 0) return;
	
    var handle = fb.GetNowPlaying();
    if (!handle) return;
	
	if (writeLoopProtection) writeLoopProtection = false;
	else {
		var radioStation = tf_rs.EvalWithMetadb(handle);
		if (radioStation === "Gensokyo Radio") {
			fetchGensokyoRadioApi();
		}
	}
	
    handle.Dispose();
}

function refreshImages() {
	var handle = fb.GetNowPlaying();
	if (!handle) return;
	
	var obj = {
		"title": jsonObj.SONGINFO.TITLE,
		"artist": jsonObj.SONGINFO.ARTIST,
		"album" : jsonObj.SONGINFO.ALBUM,
		"date" : jsonObj.SONGINFO.YEAR,
		"album artist": jsonObj.SONGINFO.CIRCLE
	};
	
	var str = JSON.stringify(obj);
	var handle_list = fb.CreateHandleList(handle);
	handle_list.UpdateFileInfoFromJSON(str);
	handle_list.AttachImage(grFullImgPath, 0);
	writeLoopProtection = true;
	window.SetTimeout(function () {
		handle_list.RunContextCommand("Discord rich presence/Regenerate artwork url");
		handle_list.Dispose();
	}, 5000);
	
}

function fetchGensokyoRadioApi() {

	if (grImgFolder.length === 0 || grImgFilename.length === 0) {
		utils.ShowPopupMessage("Please check if grImgFolder and grImgFilename! are correctly set in the script");
		return
	}

	var GET = 0;
	var url = "https://gensokyoradio.net/api/station/playing/";
	var user_agent = "foobar2000/jscript-panel3";
	
	window.SetTimeout(function () {var id = utils.HTTPRequestAsync(window.ID, GET, url, user_agent)}, 1500);
}

function on_http_request_done(task_id, success, response_text) {
	if (!success) return console.log(window.Name, ": ", response_text);
	
	jsonObj = JSON.parse(response_text);
	var album_art = jsonObj.MISC.ALBUMART;
	if (!album_art || album_art.indexOf(".png") > -1) imgExtension = ".png";
	else imgExtension = ".jpg";
	grFullImgPath = grImgFolder + grImgFilename + imgExtension;
	if (album_art) utils.DownloadFileAsync(window.ID, "https://gensokyoradio.net/images/albums/500/" + album_art, grFullImgPath);
	else utils.DownloadFileAsync(window.ID, "https://gensokyoradio.net/images/assets/gr-logo-placeholder.png", grFullImgPath);
}

function on_download_file_done(path, success, error_text) {
	if (!success) return console.log(error_text);
	if (path != grFullImgPath) return;
	refreshImages();
}