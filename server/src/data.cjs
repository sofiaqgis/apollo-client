const fs = require('fs'); 


class PetSource {

  getPhotos() {
    const data2 = fs.readFileSync(__dirname + '/db.json', { encoding: 'utf-8' });
    const json2 = JSON.parse(data2);
    return json2.photos;
  }

  getPhoto(photoId) {
    const dataFile3 = fs.readFileSync(__dirname + '/db.json', { encoding: 'utf-8' });
    const parsedFile3 = JSON.parse(dataFile3);
    const photo = (parsedFile3.photos.find(i => i.id == photoId))
    return photo;
  }


    likePhoto(input) {
      try {
        const dataFile5 = fs.readFileSync(__dirname + '/db.json', { encoding: 'utf-8' });
        const parseFile5 = JSON.parse(dataFile5);
        const photo = parseFile5.photos.find(i => i.id == input.id);
    
        if (photo) {
          photo.likes = (photo.likes || 0) + (input.action === 'like' ? 1 : -1);}
    
        fs.writeFileSync(__dirname + '/db.json', JSON.stringify(parseFile5, null, 2), { encoding: 'utf-8' });
        return photo;
      } catch (err) {
        console.error('Error occurred while updating likes:', err);
        throw new Error('Failed to update likes');
      }
    }

}

module.exports = PetSource;
