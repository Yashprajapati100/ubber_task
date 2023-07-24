const { reject } = require("bluebird");
const Joi = require("joi");
class validate {
    async sign_up_validation(body) {
        let { firstName, lastName, email, password, mobilenumber, type } = body
        try {
            const Schema = Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                mobilenumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
                type: Joi.required()
            });
            const validationResult = Schema.validate({ firstName, lastName, email, password, mobilenumber, type }, { abortEarly: false });
            if (validationResult.error) {
                console.log(validationResult.error);
                return reject(validationResult.error);
                // return reject(validationResult.error)    
            }
        } catch (err) {
            return reject(err);
        }
    }
    async login_validation(body) {
        try {
            let { email, password } = body
            const Schema = Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            });
            const validationResult = Schema.validate({ email, password }, { abortEarly: false });
            if (validationResult.error) {
                console.log(validationResult.error);
                return reject(validationResult.error);
                // return reject(validationResult.error)    
            }
        } catch (err) {
            return reject(err);
        }
    }

    async ride_now_validation(body) {
        try {
            let { start_time,end_time,start_latitude,start_longitude,end_latitude,start_point,end_point,end_longitude } = body
            const Schema = Joi.object({
                start_time: Joi.string().required(),
                end_time: Joi.string().required(),
                start_latitude: Joi.string().required(),
                start_longitude: Joi.string().required(),
                end_latitude: Joi.string().required(),
                start_point: Joi.string().required(),
                end_point: Joi.string().required(),
                end_longitude: Joi.string().required(),
            });
            const validationResult = Schema.validate({ start_time,end_time,start_latitude,start_longitude,end_latitude,start_point,end_point,end_longitude  }, { abortEarly: false });
            if (validationResult.error) {
                console.log(validationResult.error);
                return reject(validationResult.error);
                // return reject(validationResult.error)    
            }
        } catch (error) {
            return reject(err);
        }
    }
    async driver_available_validation(body) {
        try {
            let { day,start_time,end_time } = body
            const Schema = Joi.object({
                start_time: Joi.string().required(),
                end_time: Joi.string().required(),
                day: Joi.string().required()
            });
            const validationResult = Schema.validate({ day,start_time,end_time  }, { abortEarly: false });
            if (validationResult.error) {
                console.log(validationResult.error);
                return reject(validationResult.error);
                // return reject(validationResult.error)    
            }
        } catch (error) {
            return reject(err);
        }
    }
    async update_driver_available_validation(body) {
        try {
            let { id,start_time,end_time } = body
            const Schema = Joi.object({
                start_time: Joi.string().required(),
                end_time: Joi.string().required(),
                id: Joi.required()
            });
            const validationResult = Schema.validate({ id,start_time,end_time  }, { abortEarly: false });
            if (validationResult.error) {
                console.log(validationResult.error);
                return reject(validationResult.error);
                // return reject(validationResult.error)    
            }
        } catch (error) {
            return reject(err);
        }
    }
    async delete_driver_available_validation(body) {
        try {
            let { id,start_time,end_time } = body
            const Schema = Joi.object({
                id: Joi.required()
            });
            const validationResult = Schema.validate({ id }, { abortEarly: false });
            if (validationResult.error) {
                console.log(validationResult.error);
                return reject(validationResult.error);
                // return reject(validationResult.error)    
            }
        } catch (error) {
            return reject(err);
        }
    }
    async add_card_validation(body) {
        try {
            let { customer_stripe_id, card_Name, card_ExpYear, card_ExpMonth, card_Number, card_CVC } = body
            const Schema = Joi.object({
                customer_stripe_id: Joi.string().required(),
                card_Name: Joi.string().required(),
                card_ExpYear: Joi.string().required(),
                card_ExpMonth: Joi.string().required(),
                card_Number: Joi.string().required(),
                card_CVC: Joi.string().required(),
            });
            const validationResult = Schema.validate({ customer_stripe_id, card_Name, card_ExpYear, card_ExpMonth, card_Number, card_CVC }, { abortEarly: false });
            if (validationResult.error) {
                console.log(validationResult.error);
                return reject(validationResult.error);
                // return reject(validationResult.error)    
            }
        } catch (error) {
            return reject(err);
        }
    }

    async create_charge_validation(body) {
        try {
            let { customer_stripe_id, card_id, amount } = body
            const Schema = Joi.object({
                customer_stripe_id: Joi.string().required(),
                card_id: Joi.string().required(),
                amount: Joi.string().required(),
            });
            const validationResult = Schema.validate({ customer_stripe_id, card_id, amount }, { abortEarly: false });
            if (validationResult.error) {
                console.log(validationResult.error);
                return reject(validationResult.error);
                // return reject(validationResult.error)    
            }
        } catch (error) {
            return reject(err);
        }
    }
}
module.exports = new validate()   