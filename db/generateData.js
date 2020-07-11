const faker = require('faker');
const fs = require('fs');
const cliProgress = require('cli-progress');

const numOfRecords = 100000;

const pathName = 'generatedData.csv';
const encoding = 'utf8';
const csvWriter = fs.createWriteStream(pathName);

//write headers
csvWriter.write('campaignID,updateID,title,author,imageUrl,createdAt,body,likes\n', encoding);

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const generateUpdates = function(callback) {
  const createImage = function() {
    var url = 'http://picsum.photos/seed/'
    var urlend='/200/300'
    var randomNumber = Math.floor(Math.random() * 1000);
    return url+randomNumber+urlend;
  }

  //Start CLI progress bar
  bar.start(numOfRecords, 0);

  var id = 0;
  var campaign = 0;
  var updates = numOfRecords;

  const writeUpdates = function() {
    var ok = true;
    while (updates > 0 && ok) {
      campaign++;
      var numOfUpdates = 1;

      for (var i = 0; i < numOfUpdates; i++) {
        updates--;
        id++;

        const campaignID = campaign;
        const updateID = id;
        const title = faker.lorem.words();
        const author = faker.name.findName();
        const imageUrl = createImage();
        const createdAt = faker.date.past();
        const body = faker.lorem.paragraphs();
        const likes = faker.random.number();

        var update = `${campaignID},${id},${title},${author},${imageUrl},${createdAt},${body},${likes}\n`

        //if this is the last record to be written, call write with callback
        if (updates === 0) {
          bar.increment();
          csvWriter.write(update, encoding, callback);
        } else {
          //otherwise, must check if buffer still has space.
          bar.increment();
          ok = csvWriter.write(update, encoding);
        }
      }
    }
    if (updates > 0) {
      csvWriter.once('drain', writeUpdates);
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
  csvWriter.end()
});