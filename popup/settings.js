async function loadSettings() {
   async function loadVal(s, v = true) {
      var _ = await browser.storage.local.get(s);
      return (!Object.keys(_).length ? v : Object.values(_)[0]);
   }
   
   var settings = {
      'contextHide' : await loadVal('contextHide', true)
   };
   
   var _ = null;
   var settingGroups = document.getElementById('settings').children;
   for (var i = 0; i < settingGroups.length; ++i) {
      _ = settingGroups[i].children[0].children[0];
      _.checked = settings[_.id];
      _.addEventListener('click', saveSetting);
   }
}

async function saveSetting(e) {
   browser.storage.local.set({
      [e.target.id] : e.target.checked
   });
}

document.addEventListener('DOMContentLoaded', loadSettings);