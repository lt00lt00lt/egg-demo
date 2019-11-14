module.exports = app => {
    app.router.get('/api/login/:username/:password', app.controller.login.login);
};