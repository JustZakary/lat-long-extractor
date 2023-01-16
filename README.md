
# lat-long-extractor
lat-long-extractor is a script that goes through a JSON file ("source.json" array) and extracts the street address, postal code, city, etc from the array and resaves the list as a JSON file "output.json" with LAT and LONG included.

## Getting Started
To use lat-long-extractor, you'll need to have Node.js and npm (which comes with Node) installed on your computer.

## Usage
- Step One: fill ``settings.json`` with your [Google Maps API](https://developers.google.com/maps/documentation/geocoding/overview) Key
- Step Two: fill ``settings.json`` with the value keys that are in your ``source.json`` file
- Step Three: run ``node index.js`` in the same directory 

This is a very simple script made to automate the process of gathering cordanites of locations

## Author
Created By: [Zakary Loney](https://github.com/JustZakary) on Behalf of [OneRedMAaple](https://oneredmaple.com)