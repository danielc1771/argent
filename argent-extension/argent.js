function runAddon(tab) {
  //Check if we're on amazon
  if (checkUrl(tab.url)) {
    browser.tabs.sendMessage(tab.id, { text: "send_html" }, validateItem);
  }
}

function checkUrl(url) {
  const domainRegex = /(https?:\/\/(.+?\.)?amazon\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/;
  return domainRegex.test(url);
}

function validateItem(message) {
  console.log(message);
}

browser.browserAction.onClicked.addListener(runAddon);
