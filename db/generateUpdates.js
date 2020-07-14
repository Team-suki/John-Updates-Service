const faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const cliProgress = require('cli-progress');

const numOfRecords = 100;

const encoding = 'utf8';
const updateWriter = fs.createWriteStream('db/data/updates.csv');


//write headers
updateWriter.write('campaignID,updateID,title,author,imageUrl,createdAt,body,likes,updatedAt\n', encoding);

// Initialize progress bar
const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const generateUpdates = function(callback) {
  const createImage = function() {
    var url = 'http://picsum.photos/seed/'
    var urlend='/200/300'
    var randomNumber = Math.floor(Math.random() * 1000);
    return url+randomNumber+urlend;
  }

  // Start CLI progress bar
  bar.start(numOfRecords, 0);

  var updateId = 0;
  var campaignId = 0;
  var campaigns = numOfRecords;

  const writeUpdates = function() {
    var ok = true;
    while (campaigns > 0 && ok) {
      campaigns--;
      campaignId++;
      var numOfUpdates = 1;
      //var numOfUpdates = Math.ceil(Math.random() * 6)

      for (var i = 0; i < numOfUpdates; i++) {
        updateId++;

        const campaignID = campaignId;
        const updateID = updateId;
        const title = faker.lorem.words();
        const author = faker.name.findName();
        const imageUrl = createImage();
        const createdAt = moment(faker.date.past()).format();
        const body = faker.lorem.sentences();
        const likes = faker.random.number();
        const updatedAt = moment(Date.now()).format();

        var update = `${campaignID},${updateID},${title},${author},${imageUrl},${createdAt},${body},${likes},${updatedAt}\n`

        //if this is the last record to be written, call write with callback
        if (campaigns === 0) {
          bar.increment();
          updateWriter.write(update, encoding, callback);
        } else {
          //otherwise, must check if buffer still has space.
          bar.increment();
          ok = updateWriter.write(update, encoding);
        }
      }
    }
    if (campaigns > 0) {
      updateWriter.once('drain', writeUpdates);
    }
  }
  writeUpdates();
};

const startTime = new Date().getTime();
generateUpdates(() => {
  const endTime = new Date().getTime();
  const elapsed = (((endTime - startTime) / 1000) / 60).toFixed(3);
  bar.stop();
  console.log(`Finished writing all updates to CSV in ${elapsed} minutes`);
  updateWriter.end()
});