var page = require('webpage').create();
var system = require('system');
var args = system.args;

page.open(args[1], function (status) {
    console.log("Url: ", args[1]);
    console.log("File: ", args[2]);

    page.clipRect = {
        top: 0,
        left: 0,
        width: 1024,
        height: 650
    };    

    if (status === "success") {
        window.setTimeout(function () {                    
            page.viewportSize = { width: 1024, height: 600 };
            page.render('./images/' + args[2], { format: 'png', quality: '0' });
            phantom.exit();
        }, 10);
    }
});

