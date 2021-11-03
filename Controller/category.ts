import { Category } from '../Model/category';

export const GetCategory = async (req: any, res: any) => {
  try {
    console.log('Entering Get Categories')

    const category: any = await Category.find({});
    res.send(category);
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const CreateCategory = async (req: any, res: any) => {
  try {
    const category: any = await Category.create({
      ...req.boby,
    });
    if(!category){
      return res.status(400).json({
        status: 'Cannot Create',
      });
    }
    res.send(category);
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

export const DeleteCategory = async (req: any, res: any) => {
  try {
    const category: any = await Category.findByIdAndRemove(req.params.id);
    res.send(category);
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

export const UpdatCategory = async (req: any, res: any) => {
  try {
    const category: any = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.send(category);
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};
