const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	google: {
		id: String,
		token: String,
		email: String, 
		name: String
	}
})

const User = mongoose.model('User', UserSchema)

module.exports = User