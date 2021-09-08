
var port = chrome.runtime.connect("har_" + chrome.devtools.inspectedWindow.tabId)

chrome.devtools.inspectedWindow.eval("console.log('hi')");

port.onMessage.addListener((msg) => {
    if(msg.command === 'har') {
        chrome.devtools.network.getHar((har) => {
            port.postMessage({command: "har"});
            chrome.devtools.inspectedWindow.eval("console.log('dumping har to document.har')");
            chrome.devtools.inspectedWindow.eval(`document.har = ${JSON.stringify(har)}`);
        })
    } else {
        chrome.devtools.inspectedWindow.eval("console.log('hi')");
        chrome.devtools.inspectedWindow.eval("")
    }
});