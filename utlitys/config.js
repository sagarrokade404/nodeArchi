'use strict';
const config = {

	//For loacl configuration
	local: {
		port: 3000,
		db: {
			url: 'mongodb://localhost:27017/projectTestdaw',
	
		},
		// db: {
		// 	user: 'localUsername',
		// 	password: 'localPassword',

		// 	url: 'mongodb://dbname:password@ip:27017/localUsername'
		
		// },
		
		baseUrl: 'http://localhost:4200/',
		backendBaseUrl: 'http://localhost:3000/',
		imageBaseUrl: 'http://localhost:3000',
		newpasswordlink:'link',
		userActivationlink:'liml',
		env: 'local',
		PROFILEIMAGE: "../backend/app/uploads/profileImages/", 
		ARTICLEIMAGE: "../backend/app/uploads/articleImages/", //local
		
	
		smtp: {
			service: 'Gmail',
			username: 'sagarrokade004@gmail.com',
			password: 'Password',
			mailUsername: '',
			port: 587,
			host: 'smtp.gmail.com',
			mailUsername: '',
			verificationMail: '',
		},


		SECRET: 'util@$12&*01',
		expirationDuration : 60 * 60 * 7 * 2,
	
	
	},


};
module.exports.get = function get(env) {
	return config[env] || config.default;
}
