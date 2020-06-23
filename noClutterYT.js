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

const skipping = `
    var skipAds = async function() {
      c = 1;
      adGroupChoices = document.getElementsByClassName("ytp-ad-choice-interstitial-button-container");
      if (adGroupChoices.length > 0) {adGroupChoices[0].children[c].click();console.log("ad grouping skipped");}

      await new Promise(r => setTimeout(r, 1000));

      adBtn = document.getElementsByClassName("ytp-ad-skip-button-slot");
      for (i = 0; i < adBtn.length; ++i) {
        adBtn[i].click();
        console.log("ads skipped");
      }
    }
    skipAds();
  `

purge = function(id, wpn) { browser.tabs.executeScript(id, {code:wpn}); }

skipAds = function(id) {
  browser.tabs.executeScript(id, {code:`
    var skipAds = async function() {
      c = 1;
      adGroupChoices = document.getElementsByClassName("ytp-ad-choice-interstitial-button-container");
      if (adGroupChoices.length > 0) {adGroupChoices[0].children[c].click();console.log("ad grouping skipped");}

      await new Promise(r => setTimeout(r, 1000));

      adBtn = document.getElementsByClassName("ytp-ad-skip-button-slot");
      for (i = 0; i < adBtn.length; ++i) {
        adBtn[i].click();
        console.log("ads skipped");
      }
    }
    skipAds();
  `});
}

/*//'button:g'
adGroupSkip = function(id, c) {
  clikSauce = `
    adBtn = document.getElementById(${c});
    if (adButton !== null) { adBtn.click(); console.log("lel no group up!"); }
  `
  browser.tabs.executeScript(id, {code:clikSauce});
}*/

protect = function(id, target, name, wpn) {
  browser.tabs.executeScript(id, {code:`
    ${name} = new MutationObserver(function(m, g) {
      wpn = \`${wpn}\`;
      eval(wpn);
      console.log("rEEEEEEEEEEEEEEEE\`"+wpn+"\`");
      //g.disconnect();
      //delete g;
    });
    console.log("OMG");
    //console.log(${name});
    eval(\`${wpn}\`);
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
    protect(id, `document.getElementById("primary-inner")`, `guardianV`, `${skipping} ${purgeV}`);
    //skipAds(id);
    //purge(id, purgeV);
  }
}, {urls:["*://*.youtube.com/watch?*"], properties:["status"]});