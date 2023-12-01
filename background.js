// background.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'promptUser') {
        var result = confirm("Do you allow me to store your User Name and Password?");
        if (result) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'saveCredentials' });
            });
        }
    } else if (request.action === 'exportToCSV') {
        chrome.storage.local.get('userData', function (result) {
            var userData = result.userData || [];
            exportToCSV(userData);
        });
    }
});

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ userData: [] });
});

function exportToCSV(data) {
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Username,Password\n";

    data.forEach(function (entry) {
        csvContent += entry.username + "," + entry.password + "\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_data.csv");
    document.body.appendChild(link);
    link.click();
}
