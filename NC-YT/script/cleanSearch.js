async function loadVal(s, v = true) {
   var _ = await browser.storage.local.get(s);
   return (!Object.keys(_).length ? v : Object.values(_)[0]);
}

async function purgeSearch() {
   var enabled = await loadVal('contextHide');
   if (!enabled) return;
   
   var evils = document.getElementsByTagName("ytd-clarification-renderer");
    if (evils.length > 0)
      for (i = 0; i < evils.length; ++i)
        evils[i].remove();
        
    evils = document.getElementsByTagName("ytd-info-panel-container-renderer");
    if (evils.length > 0)
      for (i = 0; i < evils.length; ++i)
        evils[i].remove();
}

if (typeof searchGuardian === 'undefined' || searchGuardian === null) {
   searchGuardian = new MutationObserver(function(m, g) { purgeSearch(); });
   searchGuardian.observe(document.getElementById("contents"), {childList: true});
   purgeSearch();
}