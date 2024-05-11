class Administrator {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.level = data.level;
    }
}

module.exports = Administrator;