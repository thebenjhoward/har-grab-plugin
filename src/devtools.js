
var port = chrome.runtime.connect({name: "har" + chrome.devtools.inspectedWindow.tabId})

chrome.devtools.inspectedWindow.eval("console.log('hi')");

port.onMessage.addListener((msg) => {
    if(msg.command === 'har') {
        chrome.devtools.network.getHAR((har) => {
            port.postMessage({command: "har"});
            chrome.devtools.inspectedWindow.eval("console.log('dumping har to document.har')");
            chrome.devtools.inspectedWindow.eval(`document.har = ${JSON.stringify(har)}`);
        })
    } else {
        chrome.devtools.inspectedWindow.eval("console.log('hi')");
    }
});