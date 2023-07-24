const {User,UserDeviceToken} = require('../../data/models/index');
const UserController = require('../../v1/api/controllers/UserController');
const ResponseController = require('../../v1/api/resources/response');
const jwt = require('jsonwebtoken');
class Auth {
    async authenticate(req, res, next) {
        try {
            if ('authorization' in req.headers && req.headers.authorization != null) {
                var token = req.headers.authorization;
                console.log("token===>", token)
                var decodedData = jwt.verify(token, 'secretkey');
                if (decodedData.iat < decodedData.exp) {
                    next();
                }
            } else {
                throw new Error('Authorization token is missing');
            }
        } catch (error) {
            console.log('AUTH ERROR')
            return ResponseController.error(error, res);
        }
    }

}
module.exports = new Auth;