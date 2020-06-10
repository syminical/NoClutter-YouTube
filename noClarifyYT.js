console.log(new Date());

const purgeS = `
    evils = document.getElementsByTagName("ytd-clarification-renderer");
    if (evils.length > 0) {
      for (i = 0; i < evils.length; ++i) {
        evils[i].remove();
        /*if (typeof guardian !== "undefined") {
          guardian.disconnect();
          delete guardian;
        }*/
      }
    }
    evils = document.getElementsByTagName("ytd-info-panel-container-renderer");
    if (evils.length > 0) {
      for (i = 0; i < evils.length; ++i) {
        evils[i].remove();
        /*if (typeof guardian !== "undefined") {
          guardian.disconnect();
          delete guardian;
        }*/
      }
    }
    delete evils;`

const purgeV = `
    evil = document.getElementById("clarify-box");
    if (evil !== null) {
      evil.parentNode.removeChild(evil);
      /*if (typeof guardian !== "undefined") {
        guardian.disconnect();
        delete guardian;
      }*/
    }
    delete evil;`

protect = function(wpn, id) {
  browser.tabs.executeScript(id, {code:`
    wpn = \`${wpn}\`;
    guardian = new MutationObserver(function(g=guardian, w=wpn) {
      eval(w);
      //g.disconnect();
      //delete g;
    });
    guardian.observe(document.getElementsByTagName("body")[0], {childList: true, subtree: true});
    eval(wpn);`});
}

browser.tabs.onUpdated.addListener(function(id, change) {
  if (change.status == "complete") {
    protect(purgeS, id);
  }
}, {urls:["*://*.youtube.com/results?*"], properties:["status"]});

browser.tabs.onUpdated.addListener(function(id, change) {
  if (change.status == "complete") {
    protect(purgeV, id);
  }
}, {urls:["*://*.youtube.com/watch?*"], properties:["status"]});