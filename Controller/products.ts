import Product from '../Model/products';
import mongoose from 'mongoose';
import multer from 'multer';
import mime from 'mime';

const FILE_TYPE_MAP: any = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError: any = new Error('invalid image type');

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, './public/Image');
  },
  filename: function (req: any, file: any, cb: any) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  },
});

let upload = multer({ storage: storage });
export let uploadImage = upload.single('image');
export let uploadImageArray = upload.array('images', 10);

export const GetProducts = async (req: any, res: any) => {
  try {
    console.log('Entering Get Products');
    let filter: any = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(',') };
    }
    const products: any = await Product.find(filter).populate('catogery');
    res.send(products);
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const GetProductsById = async (req: any, res: any) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        status: 'Invalid Id',
      });
    }
    const products = await Product.find({ _id: req.params.id }).populate('category');
    res.send(products);
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const GetProductCount = async (req: any, res: any) => {
  try {
    const products: any = await Product.countDocuments((count: any) => count);
    res.send({
      ProductCount: products,
    });
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const GetFeaturedProduct = async (req: any, res: any) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const products: any = await Product.find({ isFeatured: true }).limit(+count);
    res.send(products);
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const CreateProducts = async (req: any, res: any) => {
  try {
    console.log('Req => ', req.file.filename);
    if (!req.file.filename) {
      return res.status(500).json({
        status: 'No Image is Uploaded',
      });
    }
    const name: any = req.file.filename;
    const path = `${req.protocol}://${req.get('host')}/public/Image/`;
    const products: any = await Product.create({ ...req.body, image: `${path}${name}` });
    if (!products) {
      return res.status(500).json({
        status: 'Products cannot be created',
      });
    }
    res.status(200).json({
      status: 'Successful',
    });
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err,
    });
  }
};

export const DeleteProducts = async (req: any, res: any) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        status: 'Invalid Id',
      });
    }
    console.log(req);
    
    await Product.findByIdAndRemove(req.params.id);
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

export const UpdateProduct = async (req: any, res: any) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        status: 'Invalid Id',
      });
    }
    if (req.file.filename) {
      const name: any = req.file.filename;
      const path = `${req.protocol}://${req.get('host')}/public/Image/${name}`;
      console.log('Entering => ', path);
      const products: any = await Product.findByIdAndUpdate(req.params.id, { image: path }, { new: true });
      res.send(products);
    } else {
      console.log('No File');

      const products: any = await Product.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      );
      res.send(products);
    }
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const UpdateProductImages = async (req: any, res: any) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        status: 'Invalid Id',
      });
    }
    const files: any = req.files;
    const path = `${req.protocol}://${req.get('host')}/public/Image/`;
    const ImagePaths: any = [];
    if (files) {
      files.map((file: any) => {
        ImagePaths.push(`${path}${file.filename}`);
      });
    }
    const products: any = await Product.findByIdAndUpdate(req.params.id, { images: ImagePaths }, { new: true });
    res.send(products);
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};
