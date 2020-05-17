console.log(new Date());

browser.tabs.onUpdated.addListener(function(id, change) {
  if (change.status == "complete") {
    console.log("SEARCH");
    browser.tabs.executeScript(id, {code:`
      evils = document.getElementsByTagName("ytd-clarification-renderer");
      if (evils.length > 0) {
        for (i = 0; i < evils.length; ++i)
          evils[i].remove();
        console.log("see no evil");
      }
      evils = document.getElementsByTagName("ytd-info-panel-container-renderer");
      if (evils.length > 0) {
        for (i = 0; i < evils.length; ++i)
          evils[i].remove();
        console.log("see no evil");
      }
      delete evils;`
    });
  }
}, {urls:["*://*.youtube.com/results?*"], properties:["status"]});

browser.tabs.onUpdated.addListener(function(id, change) {
  if (change.status == "complete") {
    console.log("VIDEO");
    browser.tabs.executeScript(id, {code:`
      evil = document.getElementById("clarify-box");
      if (evil !== null) {
        evil.parentNode.removeChild(evil);
        console.log("see no evil");
      } else { console.log("no clarif box"); }
      delete evil;`
    });
  }
}, {urls:["*://*.youtube.com/watch?*"], properties:["status"]});