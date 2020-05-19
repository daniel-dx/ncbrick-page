const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

const dir = 'dist/demo-data';

module.exports = async () => {
  await fs.ensureDir(dir);
  await fs.copy('data/assets', dir);
  await new Promise(resolve => {
    glob('data/assets/*.json', async (err, matches) => {
      await fs.writeJSON(dir + '/list.json', matches.map(file => {
        const basename = path.basename(file, ".json");
        return {
          imgSrc: `https://daniel-dx.github.io/ncbrick-page/demo-data/${basename}.png`,
          jsonUrl: `https://daniel-dx.github.io/ncbrick-page/demo-data/${basename}.json`
        }
      }))
      resolve()
    })
  })
  await fs.copy('data/video/ncbrick.mp4', dir + '/ncbrick.mp4');
};
