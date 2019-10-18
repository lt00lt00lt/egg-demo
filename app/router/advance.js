module.exports = app => {
    app.router.get('/api/find/:tableName', app.controller.advance.find);
};