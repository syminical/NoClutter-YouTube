console.log(new Date());

purgeS = function(id) {
  browser.tabs.executeScript(id, {code:`
    evils = document.getElementsByTagName("ytd-clarification-renderer");
    if (evils.length > 0) {
      for (i = 0; i < evils.length; ++i)
        evils[i].remove();
    }
    evils = document.getElementsByTagName("ytd-info-panel-container-renderer");
    if (evils.length > 0) {
      for (i = 0; i < evils.length; ++i)
        evils[i].remove();
    }
    delete evils;`
  });
}

purgeV = function(id) {
  browser.tabs.executeScript(id, {code:`
    evil = document.getElementById("clarify-box");
    if (evil !== null) {
      evil.parentNode.removeChild(evil);
    } else { console.log("no clarif box"); }
    delete evil;`
  });
}

browser.tabs.onUpdated.addListener(function(id, change) {
  console.log("SEARCH");
  if (change.url)
    purgeS(id);
}, {urls:["*://*.youtube.com/results?*"]});

browser.tabs.onUpdated.addListener(function(id, change) {
  console.log("SEARCH");
  if (change.status == "complete")
    purgeS(id);
}, {urls:["*://*.youtube.com/results?*"], properties:["status"]});

browser.tabs.onUpdated.addListener(function(id, change) {
  console.log("VIDEO");
  if (change.url)
    purgeV(id);
}, {urls:["*://*.youtube.com/watch?*"]});

browser.tabs.onUpdated.addListener(function(id, change) {
  console.log("VIDEO");
  if (change.status == "complete")
    purgeV(id);
}, {urls:["*://*.youtube.com/watch?*"], properties:["status"]});