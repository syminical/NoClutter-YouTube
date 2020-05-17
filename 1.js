console.log(new Date());

browser.tabs.onUpdated.addListener(function(id, change) {
  if (change.url) {
    console.log("SEARCH");
    browser.tabs.executeScript(id, {runAt:"document_idle", code:`
      evils = document.getElementsByTagName("ytd-clarification-renderer");
      if (evils.length > 0) {
        evils[0].remove()
        console.log("see no evil");
      } else { console.log("no clarif rendr"); }
      evils = document.getElementsByTagName("ytd-info-panel-container-renderer");
      if (evils.length > 0) {
        evils[0].remove();
        console.log("see no evil");
      } else { console.log("no info panel cont"); }
      delete evils;`
    });
  }
}, {urls:["*://*.youtube.com/results?*"]});

browser.tabs.onUpdated.addListener(function(id, change) {
  if (change.url) {
    console.log("VIDEO");
    browser.tabs.executeScript(id, {runAt:"document_idle", code:`
      evil = document.getElementById("clarify-box");
      if (evil !== null) {
        evil.parentNode.removeChild(evil);
        console.log("see no evil");
      } else { console.log("no clarif box"); }
      delete evil;`
    });
  }
}, {urls:["*://*.youtube.com/watch?*"]});

/*
browser.webRequest.onBeforeSendHeaders.addListener(
  function(_) {
    console.log("HEADERS");
    if (_.hasOwnProperty("requestHeaders")) {
      _.requestHeaders.concat({name:"Cache-Control", value:"max-age=0, no-cache, no-store, must-revalidate, private"});
    } else {
      _.requestHeaders = [{name:"Cache-Control", value:"max-age=0, no-cache, no-store, must-revalidate, private"}];
    }
    console.log(_);
  },
  {urls:["*://*.youtube.com/watch?*", "*://*.youtube.com/results?*"]},
  ["blocking"]
);
*/
/*
browser.webNavigation.onCompleted.addListener(function(_) {
  console.log(_);
  console.log("SEARCH");
  browser.tabs.executeScript(_["tabId"], {runAt:"document_end", code:`
    let evils = document.getElementsByTagName("ytd-clarification-renderer");
    if (evils.length > 0) {
      evils[0].remove()
      console.log("see no evil");
    }
    evils = document.getElementsByTagName("ytd-info-panel-container-renderer");
    if (evils.length > 0) {
      evils[0].remove();
    }
    delete evils;`
  });
  window.addEventListener('unload', function(){});
}, {url:[{urlContains:"youtube.com/results?"}]});

browser.webNavigation.onCompleted.addListener(function(_) {
  console.log(_);
  console.log("VIDEO");
  browser.tabs.executeScript(_["tabId"], {runAt:"document_end", code:`
    let evil = document.getElementById("clarify-box");
    if (evil !== null) {
      evil.parentNode.removeChild(evil);
      console.log("see no evil");
    }
    delete evil;`
  });
  window.addEventListener('unload', function(){});
}, {url:[{urlContains:"youtube.com/watch?"}]});
*/