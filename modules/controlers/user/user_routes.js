module.exports = function (router) {


    var user_list = require('./controler/user_ctrl');
    router.post('/user/createNewUser',  user_list.createNewUser);

    
    return router;
}
