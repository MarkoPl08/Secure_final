const User = require('./User');
const Administrator = require("./Administrator");
const Article = require("./Article");

const allowedClasses = {
    User: User,
    Administrator: Administrator,
    Article: Article
};

module.exports = allowedClasses;
