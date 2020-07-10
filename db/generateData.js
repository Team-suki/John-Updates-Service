const faker = require('faker');
const fs = require('fs');

//const numOfRecords = 1000000;
const numOfRecords = 1000000;
const pathName = 'generatedData.json';
const csvWriter = fs.createWriteStream(pathName);


const generateUpdates = function() {

  const createImage = function() {
    var url = 'http://picsum.photos/seed/'
    var urlend='/200/300'
    var randomNumber = Math.floor(Math.random() * 1000);
    return url+randomNumber+urlend;
  }

  var updateID = 1;

  for(var campaign = 0; campaign < numOfRecords; campaign++) {
    var numOfUpdates = Math.ceil(Math.random()*5);
    for (var i = 0; i < numOfUpdates; i++) {
      var imageUrl = createImage();

      var update = {
        campaignID: campaign,
        updateID: updateID,
        title: faker.lorem.words(),
        author: faker.name.findName(),
        imageUrl: imageUrl,
        createdAt: faker.date.past(),
        body: faker.lorem.paragraphs(),
        likes: faker.random.number()
      }

      //updates.push(update)
      csvWriter.write(JSON.stringify(update));

      // const numOfComments = Math.ceil(Math.random()*10);
      // for (var j = 0; j < numOfComments; j++) {
      //   var comment = {
      //     updateID: updateID,
      //     userName: faker.name.findName(),
      //     comment:faker.lorem.sentences(),
      //     createdAt: faker.date.past(),
      //   }
      // }

      updateID++;
    }

  }

  csvWriter.on('finish', () => {
    console.log(`wrote all the data to file ${pathName}`);
 });

  csvWriter.on('error', function (err) {
    console.error(err);
  });
};


generateUpdates();