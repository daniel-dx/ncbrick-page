const fs = require('fs-extra');
const jsonList = require('./user-widgets.json');

const dir = 'dist/user-widgets';

module.exports = async () => {
  await fs.ensureDir(dir);

  await fs.writeJson(`${dir}/index.json`, jsonList);

  await Promise.all(
    jsonList.map(async item => {
      await fs.ensureDir(`${dir}/${item.code}`);
      await fs.writeJson(`${dir}/${item.code}/index.json`, item);
    })
  );
};
