const express = require('express');
import {getUSers, SignIn, Login, Register, GetUserCount, UpdateUsers, DeleteUsers} from '../Controller/user';
const router = express.Router();

router.get(`/getUSers`, getUSers);
router.get(`/getUserCount`, GetUserCount);

router.post('/', SignIn);
router.post('/register', Register);
router.post('/login', Login);

router.delete(`/deleteUser/:id`, DeleteUsers);

router.put(`/updateUser/:id`, UpdateUsers);


module.exports = router;
