async function loadVal(s, v = true) {
   var _ = await browser.storage.local.get(s);
   return (!Object.keys(_).length ? v : Object.values(_)[0]);
}

async function purgeVideo() {
   var enabled = await loadVal('contextHide');
   if (!enabled) return;
   
   var evil = document.getElementById("clarify-box");
   if (evil !== null) evil.parentNode.removeChild(evil);
}

if (typeof videoGuardian === 'undefined' || videoGuardian === null) {
   videoGuardian = new MutationObserver(function(m, g) { purgeVideo(); });
   videoGuardian.observe(document.getElementById("primary-inner"), {childList: true});
   purgeVideo();
}