console.log(new Date());

browser.webNavigation.onDOMContentLoaded.addListener(function(_) {
  console.log(_);
  console.log("SEARCH");
  browser.tabs.executeScript(_["tabId"], {runAt:"document_end", code:`
    let evils = document.getElementsByTagName("ytd-clarification-renderer");
    if (evils.length > 0) {
      document.getElementsByTagName("ytd-clarification-renderer")[0].remove()
      console.log("see no evil");
    }`
  });
  window.addEventListener('unload', function(){});
}, {url:[{urlContains:"youtube.com/results?"}]});

browser.webNavigation.onDOMContentLoaded.addListener(function(_) {
  console.log(_);
  console.log("VIDEO");
  browser.tabs.executeScript(_["tabId"], {runAt:"document_end", code:`
    let evil = document.getElementById("clarify-box");
    if (evil !== null) {
      evil.parentNode.removeChild(evil);
      console.log("see no evil");
    }`
  });
  window.addEventListener('unload', function(){});
}, {url:[{urlContains:"youtube.com/watch?"}]});