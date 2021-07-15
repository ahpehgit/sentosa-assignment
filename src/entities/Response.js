module.exports = class Response {
    constructor(data, success, message) {
        this.data = data;
        this.success = success;
        this.message = message;
    }
};