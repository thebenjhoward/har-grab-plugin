
port = chrome.runtime.connect("har_" + String(1))

port.onMessage.addListener((msg) => {
    if(msg.command === 'har') {
        chrome.devtools.network.getHar((har) => {
            port.postMessage({command: "har"});
            chrome.devtools.inspectedWindow.eval("console.log('dumping har to document.har')");
            chrome.devtools.inspectedWindow.eval(`document.har = ${JSON.stringify(har)}`);
        })
    }
});