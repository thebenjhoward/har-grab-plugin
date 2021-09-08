
ports = {};

try {
    chrome.runtime.onInstalled.addListener(() => {
        console.log("Plugin Loaded");
    });

    chrome.runtime.onMessage.addListener((msg) => {
        console.log(msg)
    });


    chrome.runtime.onConnect.addListener((port) => {
        console.assert(port.name.includes("har"));
        ports[port.name.substr(3)] = port;
        console.log("Connected to devtools on tab" + port.name.substr(4));

        port.onMessage.addListener((msg) => {
            let prefix = "[" + port.name.substr(3) + "]:";
            if(msg.command === 'status') {
                console.log(prefix, msg.data);
            }
            else if(msg.command === 'har') {
                console.log(prefix, "dumping har to javascript console");
            }
        });
    });

    chrome.commands.onCommand.addListener((command) => {
        console.log(command);
        if(command == "dump-har") {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                tabIndex = String(tabs[0].id);
                if(String(tabIndex) in ports) {
                    ports[tabIndex].postMessage({command: "har"})
                }
            });
        }
    });



} catch (e) {
    console.log(e);
}

