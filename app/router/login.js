module.exports = app => {
    app.router.get('/system/login/:username/:password', app.controller.login.login);
};