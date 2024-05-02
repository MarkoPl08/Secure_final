class User {
    constructor(id, username, email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email
        };
    }
}

module.exports = User;
