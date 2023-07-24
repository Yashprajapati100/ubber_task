const { user, Pickup_location, drop_location, trip, card_charge, Ride, UserDeviceToken, sequelize, UserResetPassword, card_deatils, driver_availability } = require('../../../data/models/index')
const Publishable_Key = "pk_test_51NCyx5SJb1N6yFiBEyUzWfYEP7Zc7QZPCyNrxpyxmtnjAWUTOamTzBzz9Ycv24BL9ZK5YZ8HWecyerfaLOX9zJwf00xCZoXZJE"
const SECRET_KEY = "sk_test_51ND512C9L1H5XcY2uEBdSAC3svG3nZAjs1JCosze8alwoYkYCYDHcJIFDJBVu11MBe9YPPOa1J39KA5laUMd7pEB00Wjf01UdN"
const stripe = require("stripe")(SECRET_KEY);
const promise = require('bluebird')
const ejs = require('ejs')
const path = require('path')
const helper = require('../../../utills/helper')
const jwt = require('jsonwebtoken')
const uuid = require('uuid');
const validator = require('../../../modules/validators/api/index')
const passwordHelper = require('../../../utills/passwordHelper')
const bcrypt = require('bcrypt');

class UserService {

  async signup(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { firstName, lastName, email, password, mobilenumber, type } = body
        var data = await user.findAll({ where: { email: email } })
        if (!data.length > 0) {
          const hash = await bcrypt.hashSync(password, 10)
          var data = await user.create({ firstName: firstName, lastName: lastName, email: email, password: hash, mobilenumber: mobilenumber, type: type })
          return resolve(data);
        } else {
          var data = { message: "please enter new email" }
          return reject(data);
        }
      } catch (error) {
        return reject(error);
      }
    })
  }
  async login(body) {
    return new Promise(async (resolve, reject) => {
      try {
        let { email, password } = body
        var data = await user.findAll({ where: { email: email } })
        if (data.length > 0) {
          var x = bcrypt.compareSync(`${password}`, data[0].password)
          if (x) {
            return resolve(data)
          } else {
            var dara = {
              message: "password in not valid"
            }
            return reject(dara)
          }
        } else {
          var dara = {
            message: "email is not match"
          }
          return reject(dara)
        }
      } catch (error) {
        return reject(error);
      }
    })
  }
  async ride_now(req, user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const { start_latitude, start_longitude, end_latitude, end_longitude, start_point, end_point, start_time, end_time } = req.body

        var data = await user.findAll({
          where: {
            user_id: user_id
          }
        })
        const generateTripFare = () => {
          return Math.random() * (1000 - 100) + 100;
        };
        var trips = await trip.create({
          tripDate: new Date(),
          user_id: user_id,
          start_time: start_time,
          end_time: end_time,
          start_latitude: start_latitude,
          end_latitude: end_latitude,
          start_longitude: start_longitude,
          end_longitude: end_longitude,
          start_point: start_point,
          end_point: end_point,
          tripfare: generateTripFare(),
          farecollected: false
        })
        var ride = await Ride.findAll({})
        for (let i = 0; i < ride.length; i++) {
          if (ride[i].start_time === trips.start_time || ride[i].end_time === trips.end_time) {
            var data = await Ride.update({ trip_status: 1 }, { where: { start_time: ride[i].start_time } })
          } else if (trips.start_time > ride[i].start_time && trips.end_time < ride[i].end_time) {
            var data = await Ride.update({ trip_status: 1 }, { where: { start_time: ride[i].start_time } })
          }
        }
        const [results, metadata] = await sequelize.query("select * from rides where trip_status NOT IN ('1','2')");
        return resolve(results);
      } catch (error) {
        return reject(error);
      }
    })
  }
  async go_Online(req, user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await this.get_Nearest_Trips(req);
        const driverSchema = await user.findOne(
          { attributes: ['firstName', 'lastName', 'email', 'mobilenumber'] }, { where: { user_id: user_id } });
        const upadate = trip.update({ driver_id: user_id }, { where: { user_id: users.user_id } })
        resolve([users, driverSchema])
      } catch (error) {
        return reject(error);
      }
    })
  }
  async get_Nearest_Trips(req) {
    return new Promise(async (resolve, reject) => {
      try {
        let { trip_id } = req.body.user
        let nearTrip = await trip.findOne({ where: { trip_id: trip_id } })
        return resolve(nearTrip);
      } catch (error) {
        return reject(error);
      }
    })
  }
  async accept_Trip(driver_id) {                      
    return new Promise(async (resolve, reject) => {
      try {
        var data = await user.findOne({ user_id: driver_id })
        if (data) {
          const tripDetails = await trip.findOne({ where: { driver_id: driver_id } });
        }
        else {
          var data = {
            message: "driver is not avialable"
          }
          return reject(data);
        }
        var data = await Ride.update({ trip_status: '2' }, { where: { driver_id: driver_id } })
        return resolve();
      } catch (error) {
        return reject(error);
      }
    })
  }
  async reject_Trip(driver_id) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await user.findOne({ user_id: driver_id })
        if (data) {
          const tripDetails = await trip.findOne({ where: { driver_id: driver_id } });
        } else {
          var data = {
            message: "driver is not avialable"
          }
          reject(data);
        }
        var data = await Ride.update({ trip_status: '3' }, { where: { driver_id: driver_id } })
        return resolve();
      } catch (error) {
        return reject(error);
      }
    })
  }
  async start_trip(driver_id) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await user.findOne({ user_id: driver_id })
        if (data) {
          const tripDetails = await trip.findOne({ where: { driver_id: driver_id } });
        } else {
          var data = {
            message: "driver is not avialable"
          }
          reject(data);
        }
        var data = await Ride.update({ trip_status: '4' }, { where: { driver_id: driver_id } })
        return resolve();
      } catch (error) {
        return reject(error);
      }
    })
  }
  async complete_Trip(driver_id) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await user.findOne({ user_id: driver_id })
        if (data) {
          const tripDetails = await trip.findOne({ where: { driver_id: driver_id } });
        } else {
          var data = {
            message: "driver is not avialable"
          }
          reject(data);
        }
        var data = await Ride.update({ trip_status: '5' }, { where: { driver_id: driver_id } })
        return resolve()
      } catch (error) {
        return reject(error);
      }
    })
  }

  async driver_available(req, driver_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let { start_time, end_time, day, available } = req.body
        var check = await user.findOne({ user_id: driver_id });
        if (check) {
          var data = await driver_availability.create({
            driver_id: driver_id,
            start_time: start_time,
            end_time: end_time,
            day: day,
          })
          if (data) {
            var data = await driver_availability.update({ available: '1' }, { where: { driver_id: driver_id } })
          }
        } else {
          var data = {
            message: "driver is not available"
          }
          return reject(data);
        }
        return resolve();
      } catch (error) {
        return reject(error);
      }
    })
  }
  async update_driver_available(req, driver_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let { start_time, end_time, id } = req.body
        var data = await user.findOne({ user_id: driver_id });
        if (data) {
          var data = await driver_availability.update({ start_time: start_time, end_time: end_time }, { where: { id: id } });
        } else {
          var data = {
            message: 'driver is not avialable'
          }
          return reject(data);
        }
        return resolve();
      } catch (error) {
        return reject(error);
      }
    })
  }
  async delete_driver_available(req, driver_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let { id } = req.body
        var data = await user.findOne({ user_id: driver_id })
        if (data) {
          var data = await driver_availability.destroy({ where: { id: id } })
        } else {
          var data = { message: 'driver is not available' }
          return reject(data);
        }
        return resolve()
      } catch (error) {
        return reject(error);
      }
    })
  }
  async driver_available_list(driver_id) {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await driver_availability.findAll({ where: { driver_id: driver_id } })
        if (data.length > 0) {
          return resolve(data);
        } else {
          var data = { message: 'driver_id is not available' }
          return reject(data);
        }
      } catch (error) {
        return reject(error);
      }
    })
  }
  async create_customer(firstName, lastName, email) {
    return new promise(async (resolve, reject) => {
      try {
        const customer = await stripe.customers.create({
          name: firstName.concat(lastName),
          email: email
        })
        resolve(customer);
      } catch (error) {
        return reject(error)
      }
    })
  }
  async add_card(req, user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let { customer_stripe_id, card_Name, card_ExpYear, card_ExpMonth, card_Number, card_CVC } = req.body
        var data = await stripe.tokens.create({
          card: {
            name: card_Name,
            number: card_Number,
            exp_year: card_ExpYear,
            exp_month: card_ExpMonth,
            cvc: card_CVC
          }
        });
        var card = await stripe.customers.createSource(customer_stripe_id, {
          source: `${data.id}`
        })
        var insert = await card_deatils.create({
          customer_stripe_id: customer_stripe_id,
          card_Name: card_Name,
          card_Number: card_Number,
          card_ExpYear: card_ExpYear,
          card_ExpMonth: card_ExpMonth,
          card_CVC: card_CVC,
          card_id: card.id,
          source: data.id,
          user_id: user_id
        });
        return resolve(data)
      } catch (error) {
        return reject(error);
      }
    })
  }
  async create_charge(req, user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        var insert = await stripe.charges.create({
          receipt_email: "tester@gmail.com",
          amount: req.body.amount,
          currency: 'inr',
          card: req.body.card_id,
          customer: req.body.customer_stripe_id
        })
        var insery = await card_charge.create({
          amount: req.body.amount,
          date: new Date(),
          charge_id: insert.id,
          user_id: user_id,
          currency: 'inr'
        })
        return resolve(insert);
      } catch (error) {
        return reject(error);
      }
    })
  }
}
module.exports = new UserService()