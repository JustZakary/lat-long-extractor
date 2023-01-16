// Use this tool to https://products.aspose.app/cells/conversion/xlsx-to-json

const fs = require('fs');
const https = require('https');
var settings = require('./settings.json');
var list = require('./source.json');

var saved = false;

async function start() {
    var newData = []
    for (var i = 1; i < list.length; i++) {
        getData(i, function (data) {
            newData.push(data);
            fs.writeFile('output.json', JSON.stringify(newData), function (err) {
                if (err) throw err;
            });
        });
    }
}


async function getData(index, callback) {
    var address = list[index][settings.streetKey] + ' ' + list[index][settings.cityKey] + ' ' + list[index][settings.stateKey] + ' ' + list[index][settings.zipKey] + ' ' + list[index][settings.countryKey];
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${settings.googleMapsApiKey}`;
    await https.get(url, async (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            const result = JSON.parse(data);
            if (result.status === 'OK') {
                var dataToReturn = {
                    [settings.streetKey]: list[index][settings.streetKey],
                    [settings.cityKey]: list[index][settings.cityKey],
                    [settings.stateKey]: list[index][settings.stateKey],
                    [settings.countryKey]: list[index][settings.countryKey],
                    [settings.postalCodeKey]: list[index][settings.postalCodeKey],
                    lat: result.results[0].geometry.location.lat,
                    long: result.results[0].geometry.location.lng,
                    [settings.recordKey]: list[index][settings.recordKey]
                }
                callback(dataToReturn);
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

start();