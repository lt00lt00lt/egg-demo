module.exports = app => {
    app.router.post('/api/find/:tableName', app.controller.advance.find);
    app.router.post('/api/seniorFind/:tableName', app.controller.advance.seniorFind);
    app.router.delete('/api/delete/:tableName/:id', app.controller.advance.delete);
    app.router.post('/api/save/:tableName', app.controller.advance.save);
    app.router.delete('/api/batchDelete/:tableName', app.controller.advance.batchDelete);
    app.router.post('/api/batchSave/:tableName', app.controller.advance.batchSave);
    app.router.post('/api/upload/', app.controller.advance.upload);
    app.router.get('/api/download/:fileName', app.controller.advance.download);
};