class Article {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
        this.authorId = data.authorId;
    }
}

module.exports = Article;