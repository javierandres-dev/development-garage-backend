import User from '../models/Users';

export const saveNewUser = async (req: any, res: any) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const userCreated = await newUser.save();
    if (userCreated)
      res.json({ code: 201, text: 'Created', results: [userCreated] });
  } catch (err) {
    console.error(err);
    res.json({ code: 400, text: 'Bad Request', results: [] });
  }
};

export const findAllUsers = async (req: any, res: any) => {
  try {
    const allUsers = await User.find();
    if (allUsers) {
      res.json({ code: 200, text: 'OK', results: allUsers });
    }
  } catch (err) {
    console.error(err);
    res.json({ code: 400, text: 'Bad Request', results: [] });
  }
};

export const findOneUser = async (req: any, res: any) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      res.json({ code: 200, text: 'OK', results: [user] });
    }
  } catch (err) {
    console.error(err);
    res.json({ code: 400, text: 'Bad Request', results: [] });
  }
};
