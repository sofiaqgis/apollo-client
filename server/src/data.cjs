const fs = require('fs'); 


class PetSource {

  getPhotos() {
    const data2 = fs.readFileSync(__dirname + '/db.json', { encoding: 'utf-8' });
    const json2 = JSON.parse(data2);
    return json2.photos;
  }

}

module.exports = PetSource;
