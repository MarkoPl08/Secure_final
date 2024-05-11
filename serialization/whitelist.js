const User = require('./User');
const Administrator = require("./Administrator");
const Article = require("./Article");

const validators = {
    User: (data) => data.id && data.username && typeof data.email === 'string',
    Administrator: (data) => data.id && data.username && typeof data.level === 'number',
    Article: (data) => data.id && data.title && typeof data.content === 'string' && data.authorId
};

// Define handlers that include the construction logic and any additional processing
const handlers = {
    User: (data) => new User(data),
    Administrator: (data) => new Administrator(data),
    Article: (data) => {
        if (!data.publishedDate) data.publishedDate = new Date();
        return new Article(data);
    }
};

const allowedClasses = {
    User: { validate: validators.User, handle: handlers.User },
    Administrator: { validate: validators.Administrator, handle: handlers.Administrator },
    Article: { validate: validators.Article, handle: handlers.Article }
};

module.exports = allowedClasses;
