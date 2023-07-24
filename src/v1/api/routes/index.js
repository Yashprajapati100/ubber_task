const express = require('express');
const router = express.Router()
const GlobalAuthClass = require('../../../modules/middleware/auth');
const UserController = require('../../api/controllers/UserController');
const authMiddleware = require('../../../modules/middleware/Authication');
const userRoutes = require('../../api/routes/user');

router.use('/user', userRoutes);

router.post("/sign-up", UserController.signup);

router.post("/login", authMiddleware.authenticate, UserController.login);

router.post("/ride-now", authMiddleware.authenticate, UserController.ride_now);

router.post('/get-nearest-trip', UserController.get_nearest_trip);

router.post('/online-go', authMiddleware.authenticate, UserController.go_Online);

router.post('/accept-trip', authMiddleware.authenticate, UserController.accept_Trip);

router.post('/reject-trip', authMiddleware.authenticate, UserController.reject_Trip);

router.post('/start-trip', authMiddleware.authenticate, UserController.start_trip);

router.post('/complete-trip', authMiddleware.authenticate, UserController.complete_Trip);

router.post('/create-customer', authMiddleware.authenticate, UserController.create_customer);

router.post('/add-card', authMiddleware.authenticate, UserController.add_card);

router.post('/create-charge', authMiddleware.authenticate, UserController.create_charge);

router.post('/driver-available', authMiddleware.authenticate, UserController.driver_available);

router.post('/update_driver_available', authMiddleware.authenticate, UserController.update_driver_available);

router.post('/delete-driver-available', authMiddleware.authenticate, UserController.delete_driver_available);

router.post('/driver-available-list', authMiddleware.authenticate, UserController.driver_available_list);

module.exports = router     