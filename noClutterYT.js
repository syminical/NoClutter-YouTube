console.clear();
console.log(new Date());

browser.tabs.onUpdated.addListener(function(id, change) {
  if (change.status == "complete") browser.tabs.executeScript({ file: '/script/cleanSearch.js', runAt: 'document_end' });
}, {urls:["*://*.youtube.com/results?*"], properties:["status"]});

browser.tabs.onUpdated.addListener(function(id, change) {
  if (change.status == "complete") browser.tabs.executeScript({ file: '/script/cleanVideo.js', runAt: 'document_end' });
}, {urls:["*://*.youtube.com/watch?*"], properties:["status"]});