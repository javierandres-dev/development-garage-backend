import { server } from "../server";
import { body, validationResult } from "express-validator";
import { Router, Request, Response, NextFunction } from "express";
import {
  saveNewUser,
  userLogin,
  findAllUsers,
  findOneUser,
  updateOneUser,
  deleteOneUser,
} from "../controllers/users";
import Log from "../models/Logs";

const jwt = require("jsonwebtoken");

export const router = Router();
const verification = Router();

router.post(
  "/log-in",
  [
    body("username", "username is mandatory").exists(),
    body("username", "username must not be empty").not().isEmpty(),
    body("username", "username must be an email").isEmail().normalizeEmail(),
    body("password", "password is mandatory").exists(),
    body("password", "password must not be empty").not().isEmpty(),
    body("password", "password must contain at least eight character")
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
      userLogin(req, res);
    }
  }
);

const isBlocked = async (id: number) => {
  const user = await Log.findOne({ id });
  if (user) return true;
  else return false;
};

verification.use((req: any, res: Response, next: NextFunction) => {
  try {
    let token: any =
      req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) res.status(400).json({ message: "Token is mandatory" });
    else if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      jwt.verify(token, server.get("key"), (error: any, decoded: object) => {
        if (error) {
          res.status(400).json({ message: "Invalid token" });
        } else {
          req.decoded = decoded;
          if (isBlocked(req.decoded.iat)) {
            res.status(400).json({ message: "Log in again" });
          } else {
            next();
          }
        }
      });
    }
  } catch (err) {
    res.status(err).json(err);
  }
});

router.get("/", verification, async (req: any, res: Response) => {
  try {
    const newLog = new Log({
      id: req.decoded.iat,
    });
    const logCreated = await newLog.save();
    if (logCreated) res.status(200).json({ result: logCreated });
    else res.status(400).json({ message: "Log not created" });
  } catch (err) {
    res.status(err).json(err);
  }
});

router.post(
  "/sign-up",
  [
    body("username", "username is mandatory").exists(),
    body("username", "username must not be empty").not().isEmpty(),
    body("username", "username must be an email").isEmail().normalizeEmail(),
    body("password", "password is mandatory").exists(),
    body("password", "password must not be empty").not().isEmpty(),
    body("password", "password must contain at least eight character")
      .isLength({
        min: 8,
      })
      .not()
      .isEmpty()
      .trim()
      .escape(),
  ],
  verification,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      saveNewUser(req, res);
    }
  }
);

router.get("/users", verification, findAllUsers);

router.get("/users/:id", verification, findOneUser);

router.put(
  "/users/:id",
  [
    body("username", "username is mandatory").exists(),
    body("username", "username must not be empty").not().isEmpty(),
    body("username", "username must be an email").isEmail().normalizeEmail(),
    body("password", "password is mandatory").exists(),
    body("password", "password must not be empty").not().isEmpty(),
    body("password", "password must contain at least eight character")
      .isLength({
        min: 8,
      })
      .not()
      .isEmpty()
      .trim()
      .escape(),
  ],
  verification,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      updateOneUser(req, res);
    }
  }
);

router.delete("/users/:id", verification, deleteOneUser);
