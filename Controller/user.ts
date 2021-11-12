import User from '../Model/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const getUSers = async (req: any, res: any) => {
  try {
    console.log("Entering Users");
    
    const users: any = await User.find({});
    if (!users) {
      return res.status(400).json({
        status: 'No Users',
      });
    }
    res.send(users);
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const getUSersById = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
      res.status(500).json({ message: 'The user with the given ID was not found.' });
    }
    res.status(200).send(user);
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const Register = async (req: any, res: any) => {
  try {
    console.log(req.body);

    const userSignin: any = await User.create({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
      Image:req.body.Image
    });
    if (!userSignin) {
      return res.status(400).json({
        status: 'Cannot Create',
      });
    }
    res.send(userSignin);
    res.status(200).json({
      status: 'Successful',
    });
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const Login = async (req: any, res: any) => {
  try {
    console.log(req.body);

    const user: any = await User.findOne({ email: req.body.email });
    const secret: any = process.env.SECRET_KEY;
    if (!user) {
      return res.status(400).json({ status: 'No User Found' });
    }
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, secret, { expiresIn: '1d' });
      res.status(200).send({ user: user, token });
    } else {
      return res.status(400).json({ status: 'password is wrong' });
    }
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const GetUserCount = async (req: any, res: any) => {
  try {
    const user: any = await User.countDocuments((count: any) => count);
    res.send({
      ProductCount: user,
    });
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const DeleteUsers = async (req: any, res: any) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        status: 'Invalid Id',
      });
    }
    const user: any = await User.findByIdAndRemove(req.params.id);
    res.status(200).json({
      status: 'Successfully deleted',
    });
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const UpdateUsers = async (req: any, res: any) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        status: 'Invalid Id',
      });
    }
    console.log(req.params);
    console.log(req.body);
    const user: any = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.send(user);
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};
