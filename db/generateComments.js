const faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const cliProgress = require('cli-progress');

const numOfRecords = 1000000;

const encoding = 'utf8';
const commentWriter = fs.createWriteStream('db/data/comments.csv');

commentWriter.write('campaignID,updateID,commentID,userName.comment,createdAt,updatedAt\n', encoding);

const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const generateComments = function(callback) {
  // Start CLI progress bar
  bar2.start(numOfRecords, 0);

  var campaignId = 0;
  var updateId = 0;
  var commentId = 0;
  var campaigns = numOfRecords;

  const writeComments = function() {
    var ok = true;
    while (campaigns > 0 && ok) {
      campaigns--;
      campaignId++;
      var numOfComments = 1;
      //var numOfComments = Math.ceil(Math.random() * 6)

      for (var i = 0; i < numOfComments; i++) {
        commentId++;
        updateId++;

        const campaignID = campaignId;
        const updateID = updateId;
        const commentID = commentId;
        const userName = faker.name.findName();
        const comment = faker.lorem.sentences();
        const createdAt = moment(faker.date.past()).format();
        const updatedAt = moment(Date.now()).format();

        var entry = `${campaignID},${updateID},${commentID},${userName},${comment},${createdAt},${updatedAt}\n`;

        //if this is the last record to be written, call write with callback
        if (campaigns === 0) {
          bar2.increment();
          commentWriter.write(entry, encoding, callback);
        } else {
          bar2.increment();
          //otherwise, must check if buffer still has space.
          ok = commentWriter.write(entry, encoding);
        }
      }
    }
    if (campaigns > 0) {
      commentWriter.once('drain', writeComments);
    }
  }
  writeComments();
}

const startTime = new Date().getTime();
generateComments(() => {
  const endTime = new Date().getTime();
  const elapsed = (((endTime - startTime) / 1000) / 60).toFixed(3);
  bar2.stop();
  console.log(`Finished writing all comments to CSV in ${elapsed} minutes`);
  commentWriter.end();
});