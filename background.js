
ports = {};

try {
    chrome.runtime.onInstalled.addListener(() => {
        console.log("Plugin Loaded");
    });

    chrome.runtime.onConnect.addListener((port) => {
        console.assert(port.name.includes("har_"));
        ports[port.name.substr(4)] = port;
        console.log("Connected to devtools on tab" + port.name.substr(4));
        


        port.onMessage.addListener((msg) => {
            let prefix = "[" + port.name.substr(4) + "]:";
            if(msg.command === 'status') {
                console.log(prefix, msg.data);
            }
            else if(msg.command === 'har') {
                console.log(prefix, "dumping har to javascript console");
            }
        });
    });



} catch (e) {
    console.log(e);
}

