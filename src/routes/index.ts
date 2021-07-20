import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import {
  saveNewUser,
  findAllUsers,
  findOneUser,
  updateOneUser,
  deleteOneUser,
} from '../controllers/users';

export const router = Router();

router.get('/', (req: Request, res: Response) =>
  res.status(200).json({ message: 'Entry point success' })
);

router.post('/sign-up', saveNewUser);

router.post(
  '/log-in',
  [
    body('username', 'username is mandatory').exists(),
    body('username', 'username must be an email').isEmail().normalizeEmail(),
    body('password', 'password is mandatory').exists(),
    body('password', 'password must contain at least eight character')
      .isLength({
        min: 8,
      })
      .not()
      .isEmpty()
      .trim()
      .escape(),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      res.status(200).json({ message: '... soon ...' });
    }
  }
);

router.get('/users/:id', findOneUser);

router.put('/users/:id', updateOneUser);

router.delete('/users/:id', deleteOneUser);

router.get('/users/', findAllUsers);
