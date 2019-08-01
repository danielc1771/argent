// Listen for messages
browser.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  // If the received message has the expected format...
  if (msg.text === "send_html") {
    // Call the specified callback, passing
    // the web-page's DOM content as argument
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(
      document.all[0].outerHTML,
      "text/html"
    );
    console.log(document.all[0]);
    console.log(htmlDoc.getElementById("priceblock_dealprice"));
    // if (htmlDoc.getElementById("priceblock_dealprice") !== null) {
    //   sendResponse("valid");
    // } else {
    //   sendResponse("invalid");
    // }
  }
});
