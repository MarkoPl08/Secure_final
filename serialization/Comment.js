class Comment {
    constructor(data) {
        this.id = data.id;
        this.articleId = data.articleId;
        this.content = data.content;
        this.commenterId = data.commenterId;
    }
}

module.exports = Comment;