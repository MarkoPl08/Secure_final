class Comment {
    constructor(id, articleId, content, commenterId) {
        this.id = id;
        this.articleId = articleId;
        this.content = content;
        this.commenterId = commenterId;
    }
}

module.exports = Comment;
