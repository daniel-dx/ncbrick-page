const Promise = require('bluebird');
const ghPages = Promise.promisifyAll(require('gh-pages'));
const ora = require('ora');
const fs = require('fs-extra');
const handleData = require('./data');

function publish() {
  const spinner = ora('Publishing gitbooks...').start();
  return ghPages
    .publish('./dist')
    .then(() => {
      spinner.succeed('Publish successfully.');
    })
    .catch(() => {
      spinner.fail(err);
    });
}

function clean() {
  return fs.remove('./dist');
}

async function main() {
  await clean();
  await handleData();
  await publish();
}

main();
