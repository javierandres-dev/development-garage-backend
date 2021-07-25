import { server } from '../server';
import { body, validationResult } from 'express-validator';
import { Router, Request, Response, NextFunction } from 'express';
import {
  saveNewUser,
  findAllUsers,
  findOneUser,
  updateOneUser,
  deleteOneUser,
} from '../controllers/users';

const jwt = require('jsonwebtoken');

const verification = Router();
export const router = Router();

verification.use((req: any, res: Response, next: NextFunction) => {
  try {
    let token: any =
      req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) throw new Error('Token is mandatory');
    else if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
      jwt.verify(token, server.get('key'), (error: any, decoded: any) => {
        if (error) {
          throw new Error('Invalid token');
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  } catch (err) {
    res.status(err).json(err);
  }
});

router.get('/', (req: Request, res: Response) => res.json({ msg: 'work!' }));

router.post(
  '/sign-up',
  [
    body('username', 'username is mandatory').exists(),
    body('username', 'username must not be empty').not().isEmpty(),
    body('username', 'username must be an email').isEmail().normalizeEmail(),
    body('password', 'password is mandatory').exists(),
    body('password', 'password must not be empty').not().isEmpty(),
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
      saveNewUser(req, res);
    }
  }
);

router.get('/users', findAllUsers);

router.get('/users/:id', findOneUser);

router.put(
  '/users/:id',
  [
    body('username', 'username is mandatory').exists(),
    body('username', 'username must not be empty').not().isEmpty(),
    body('username', 'username must be an email').isEmail().normalizeEmail(),
    body('password', 'password is mandatory').exists(),
    body('password', 'password must not be empty').not().isEmpty(),
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
      updateOneUser(req, res);
    }
  }
);

router.delete('/users/:id', deleteOneUser);

router.post('/log-in', (req: Request, res: Response) => {
  if (req.body.username === 'javi' && req.body.password === '1234') {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, server.get('key'), {
      expiresIn: '7d',
    });
    res.status(200).json({ result: token });
  } else {
    res.status(400).json({ message: 'Incorrect username and/or password' });
  }
});

router.get('/info', verification, (req: Request, res: Response) =>
  res.json({ message: 'Welcome!' })
);
