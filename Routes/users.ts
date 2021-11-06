const express = require('express');
import {getUSers, Login, Register, GetUserCount, UpdateUsers, DeleteUsers, getUSersById} from '../Controller/user';
const router = express.Router();

router.get(`/getUSers`, getUSers);
router.get(`/getUSers/:id`, getUSersById);
router.get(`/getUserCount`, GetUserCount);

router.post('/register', Register);
router.post('/login', Login);

router.delete(`/deleteUser/:id`, DeleteUsers);

router.put(`/updateUser/:id`, UpdateUsers);


module.exports = router;
