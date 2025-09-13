# Gensokyo Radio Panel

A [JScript Panel 3](https://web.archive.org/web/20241208093147/httpscript-panel.github.io/) script for [foobar2000](https://foobar2000.org/) that fetches the currently playing song from [Gensokyo Radio](https://gensokyoradio.net/) and updates metadata/artwork in your player.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## ✨ Features
- Fetches track info (title, artist, album, year, circle) from the **Gensokyo Radio API**  
- Downloads album art automatically (supports PNG and JPG)  
- Updates metadata using [External Tags](https://www.foobar2000.org/components/view/foo_external_tags)  
- Attaches album art directly to the playing track  

---

## 📦 Requirements
- [foobar2000](https://www.foobar2000.org/)
- [JScript Panel 3](https://hydrogenaudio.org/index.php?action=dlattach;topic=110516.0;attach=38236) • [Documentation (archived)](https://web.archive.org/web/20241208093147/httpscript-panel.github.io/)
- [External Tags component](https://www.foobar2000.org/components/view/foo_external_tags) • [Documentation](https://wiki.hydrogenaudio.org/index.php?title=Foobar2000:Components/External_Tags_(foo_external_tags))

---

## ⚙️ Installation
1. Install **JScript Panel 3** and **External Tags** in foobar2000.  
2. Download [`gensokyo_radio.js`](gensokyo_radio.js) from this repository.  
3. Create a new **JScript Panel** in foobar2000.  
4. Load the script.  
5. Edit the variables at the top of the script to match your setup:
   ```js
   var grImgFolder = "";
   var grImgFilename = "";
   var tf_rs = fb.TitleFormat("%radio%");
   ```
6. **Add a custom tag for the radio station:**  
   - Shift + Right-click the **Gensokyo Radio** station entry → **Edit External Tags**  
   - Under the **Metadata** tab, click **+ Add New**  
   - Add a field named `Radio` (or the name used in `var tf_rs`) with the exact value:  
     ```
     Gensokyo Radio
     ```
7. **Enable wrapping for External Tags:**  
   - Shift + Right-click the **Gensokyo Radio** entry → **Wrap for External Tags**  
   - This ensures album art is pulled correctly for the radio station.  
8. Play the **Gensokyo Radio** station as normal and enjoy!

---

## 🖼️ Demo

![Gensokyo Radio Panel Demo](examples/demo.gif)