'use strict';

let User = require('../model/user_model');

module.exports = {
    createNewUser,

}

function createNewUser(req,res) {
    async function createNewUser_method() {
 
        const {
          email,
          password
        } = req.body

        const NewUser = new User({email: email, password : password})
     
        NewUser.save().then(function(data,err) {
            if(err) {

                console.log('err',err)
            }else {
                console.log('data ',data)
            }
        })
  
    } 



    createNewUser_method().then( function(data) {

    })
}


