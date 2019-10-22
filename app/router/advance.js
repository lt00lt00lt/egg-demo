module.exports = app => {
    app.router.get('/api/find/:tableName', app.controller.advance.find);
    app.router.delete('/api/delete/:tableName/:id', app.controller.advance.delete);
    app.router.post('/api/save/:tableName', app.controller.advance.save);
    app.router.delete('/api/batchDelete/:tableName', app.controller.advance.batchDelete);
    app.router.post('/api/batchSave/:tableName', app.controller.advance.batchSave);
};