const fs = require('fs/promises');

const getImage = (id) => {
  return fs.readdir('./images').then((fileNames) => {
    const profileImg = fileNames.find((ele) => {
      return ele.includes(id);
    });
    return Promise.resolve(profileImg);
  });
};

module.exports = getImage;
