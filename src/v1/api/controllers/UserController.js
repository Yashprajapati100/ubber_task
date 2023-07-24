const validator = require('../../../modules/validators/api/index')
const UserService = require('../services/UserService')
const responseHelper = require('../../api/resources/response');
const messages = require('../../../../config/constant.json');
const { sequelize, UserDeviceToken } = require('../../../data/models');
const { user, UserResetPassword } = require('../../../data/models/index')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const path = require('path');
const validate = require('../../../modules/validators/api/validation')
require('../../../../config/passport')(passport);

class UserController {

  async signup(req, res) {      
    try {
      await validate.sign_up_validation(req.body)
      var data = await UserService.signup(req.body)
      if (data == null) {
        return responseHelper.error(error, res);
      }
      if (data) {
        var token = jwt.sign({ data }, 'secretkey', { expiresIn: '100d' })
        console.log("ayth tokennnnn ===>", token)
        var update = await user.update({ auth_token: `${token}` }, {
          where: {
            email: `${data.email}`
          }
        })
        data.auth_token = token;
      }
      return responseHelper.success(data, 'sign-up successfully', res);
    } catch (error) {
      console.log("=====>", error)
      return responseHelper.error(error, res);
    }
  }
  async login(req, res) {
    try {
      await validate.login_validation(req.body);
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var user_id = decodedData.data.user_id
      var data = await UserService.login(req.body);
      return responseHelper.success(data, 'login successfully', res);
    } catch (error) {
      console.log("----->", error);
      return responseHelper.error(error, res);
    }
  }
  async ride_now(req, res) {
    try {
      await validate.ride_now_validation(req.body);
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var user_id = decodedData.data.user_id
      var data = await UserService.ride_now(req, user_id);
      return responseHelper.success(data, 'ride now', res);
    } catch (error) {
      console.log("----->", error);
      return responseHelper.error(error, res);
    }
  }
  async get_nearest_trip(req, res) {
    try {
      await validate.get_nearest_trip_validation(req.body)
      var data = await UserService.get_Nearest_Trips(req);
      return responseHelper.success(data, 'near trip', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async go_Online(req, res) {
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var user_id = decodedData.data.user_id
      var data = await UserService.go_Online(req, user_id);
      return responseHelper.success(data, 'go-online', res);
    } catch (error) {
      console.log("----->", error);
      return responseHelper.error(error, res);
    }
  }
  async accept_Trip(req, res) {
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var driver_id = decodedData.data.user_id
      var data = await UserService.accept_Trip(driver_id);
      return responseHelper.success(data, "Trip Accepted", res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async reject_Trip(req, res) {
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var driver_id = decodedData.data.user_id
      var data = await UserService.reject_Trip(driver_id);
      return responseHelper.success(data, 'Trip Rejected', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async start_trip(req, res) {
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var driver_id = decodedData.data.user_id
      var data = await UserService.start_trip(driver_id);
      return responseHelper.success(data, 'Trip Started', res)
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async complete_Trip(req, res) {
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var driver_id = decodedData.data.user_id
      var data = await UserService.complete_Trip(driver_id);
      return responseHelper.success(data, 'Trip Completed', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async driver_available(req, res) {
    try {
      await validate.driver_available_validation(req.body);
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey')
      var driver_id = decodedData.data.user_id
      var data = await UserService.driver_available(req, driver_id);
      return responseHelper.success(data, 'driver-available', res);
    } catch (error) {
      console.log('======>>', error)
      return responseHelper.error(error, res);
    }
  }
  async update_driver_available(req, res) {
    try {
      await validate.update_driver_available_validation(req.body);
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var driver_id = decodedData.data.user_id;
      var data = await UserService.update_driver_available(req, driver_id);
      return responseHelper.success(data, 'update-driver-available', res);
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async delete_driver_available(req, res) {
    try {
      await validate.delete_driver_available_validation(req.body);
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var driver_id = decodedData.data.user_id;
      var data = await UserService.delete_driver_available(req, driver_id);
      return responseHelper.success(data, 'delete-driver-available', res)
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async driver_available_list(req, res) {
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var driver_id = decodedData.data.user_id
      var data = await UserService.driver_available_list(driver_id)
      return responseHelper.success(data, 'driver-available-list ', res);
    } catch (error) {
      return responseHelper.error(error, res)
    }
  }
  async create_customer(req, res) {                           
    try {
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var firstName = decodedData.data.firstName
      var lastName = decodedData.data.lastName
      var email = decodedData.data.email
      var data = await UserService.create_customer(firstName, lastName, email);
      return responseHelper.success(data,'add-customer', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async add_card(req, res) {
    try {
      await validate.add_card_validation(req.body);
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var user_id = decodedData.data.user_id
      var data = await UserService.add_card(req, user_id)
      return responseHelper.success(data, 'add-card', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
  async create_charge(req, res) {
    try {
      await validate.create_charge_validation(req.body);
      var token = req.headers.authorization;
      var decodedData = jwt.verify(token, 'secretkey');
      var user_id = decodedData.data.user_id
      var data = await UserService.create_charge(req, user_id);
      return responseHelper.success(data, 'create-charge', res);
    } catch (error) {
      return responseHelper.error(error, res);
    }
  }
}
module.exports = new UserController();