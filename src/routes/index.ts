import { Router } from 'express';
import { saveNewUser, findAllUsers, findOneUser } from '../controllers/users';

export const router = Router();

router.get('/', (req, res) => {
  res.json({ code: 200, text: 'OK', message: 'Entry point success' });
});

router.post('/sign-up', saveNewUser);

router.get('/log-in/:id', (req, res) => {
  res.json({ code: 202, text: 'Accepted', results: [] });
});

router.get('/users/', findAllUsers);

router.get('/users/:id', findOneUser);
