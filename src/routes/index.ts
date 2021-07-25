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

const jwt = require("jsonwebtoken");

export const router = Router();
const verification = Router();

router.get("/", (req: Request, res: Response) =>
  res.json({ message: "Basic test ... Work!" })
);

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      saveNewUser(req, res);
    }
  }
);

router.post("/log-in", async (req: Request, res: Response) => {
  userLogin(req, res);
});

verification.use((req: Request, res: Response, next: NextFunction) => {
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
          //console.info(decoded);
          //req.decoded = decoded;
          next();
        }
      });
    }
  } catch (err) {
    res.status(err).json(err);
  }
});

router.get("/info", verification, (req: Request, res: Response) =>
  res.json({ message: "Advanced test ... Work!" })
);

router.get("/users", findAllUsers);

router.get("/users/:id", findOneUser);

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      updateOneUser(req, res);
    }
  }
);

router.delete("/users/:id", deleteOneUser);
