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

purge = function(id, wpn) { browser.tabs.executeScript(id, {code:wpn}); }

protect = function(id, target, name, wpn) {
  browser.tabs.executeScript(id, {code:`
    ${name} = new MutationObserver(function(m, g) {
      wpn = \`${wpn}\`;
      eval(wpn);
      console.log("rEEEEEEEEEEEEEEEE\`"+wpn+"\`");
      //g.disconnect();
      //delete g;
    });
    //eval(\`${wpn}\`);
    console.log("OMG");
    //console.log(${name});
    ${name}.observe(${target}, {childList: true});`
  });
}

browser.tabs.onUpdated.addListener(function(id, change) {
  if (change.status == "complete") {
    //console.log("WTF");
    protect(id, `document.getElementById("contents")`, `guardianS`, purgeS);
    //purge(id, purgeS);
  }
}, {urls:["*://*.youtube.com/results?*"], properties:["status"]});

browser.tabs.onUpdated.addListener(function(id, change) {
  if (change.status == "complete") {
    protect(id, `document.getElementById("primary-inner")`, `guardianV`, purgeV);
    //purge(id, purgeV);
  }
}, {urls:["*://*.youtube.com/watch?*"], properties:["status"]});