import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  res.json({ code: 200, text: 'OK', message: 'Entry point success' });
});

router.post('/sign-up', (req, res) => {
  res.json({ code: 201, text: 'Created', message: 'Sign Up success' });
});

router.post('/log-in/:id', (req, res) => {
  res.json({ code: 202, text: 'Accepted', message: 'Log In success' });
});
