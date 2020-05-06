const userWidgets = require('./user-widgets');
const users = require('./users');

module.exports = async () => {
    await userWidgets();
    await users();
}