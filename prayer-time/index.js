const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://timesprayer.org/en-bd/81/dhaka';
const data = `` // all html element
axios.get(url)
  .then(response => {
    const $ = cheerio.load(data);
    const prayerData = [];
    const e = $('.text-center[data-bind="prayer-time"]');
    e.each((index, element) => {
        const dataDate = $(element).attr('data-date');
        const dataPrayer = $(element).attr('data-prayer');
        const prayerTime = $(element).text().trim();
        let entry = prayerData.find(item => item.dataDate === dataDate);
        if (!entry) {
            entry = { dataDate };
            prayerData.push(entry);
        }
        entry[dataPrayer] = prayerTime;
    });
    const prayerDataJSON = JSON.stringify(prayerData, null, 2);

   fs.writeFile('prayerTimes.json', prayerDataJSON, (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('JSON file has been created successfully.');
    }
  });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


