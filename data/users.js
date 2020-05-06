const fs = require('fs-extra');
const jsonList = require('./users.json');

const dir = 'dist/users';

module.exports = async () => {
  await fs.ensureDir(dir);

  await fs.writeJson(`${dir}/index.json`, jsonList);

  await Promise.all(
    jsonList.data.map(async item => {
      await fs.ensureDir(`${dir}/${item.id}`);
      await fs.writeJson(`${dir}/${item.id}/index.json`, item);
    })
  );
};
