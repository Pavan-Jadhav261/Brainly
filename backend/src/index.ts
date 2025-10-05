import express from "express";
import { Request } from "express";
import { contentModel, linkModel, userModel } from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { auth } from "./middleware";
import { random } from "./util";
import cors from "cors";
const app = express();
interface userId extends Request {
  userId?: string;
}

app.use(express.json());
app.use(cors());

app.post("/api/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, 5);
  const userExist = await userModel.findOne({
    username: username,
  });
  console.log(userExist);
  if (!userExist) {
    const response = await userModel.create({
      username: username,
      password: hashPassword,
    });
    if (!response) {
      res.status(404).json({
        msg: "cannot signup",
      });
      return;
    }

    res.json({
      msg: "signedup",
    });
  } else if (userExist) {
    res.status(409).json({
      msg: "user already exists",
    });
  }
});

app.post("/api/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const response = await userModel.findOne({
    username: username,
  });

  if (!response) {
    res.status(400).json({
      msg: "user not found signup first",
    });
  } else {
    const hashPassword: string | null | undefined = response.password;
    const isUser = await bcrypt.compare(password, hashPassword as string);
    if (isUser) {
      const userId = response._id;
      console.log(userId);
      const token = jwt.sign(
        {
          userId: userId,
        },
        JWT_SECRET
      );
      res.status(200).json({
        token: token,
      });
    } else {
      res.status(400).json({
        msg: "wrong password",
      });
    }
  }
});

app.post("/api/content", auth, async (req: userId, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const type = req.body.type;
  const link = req.body.link;

  const iscontent = await contentModel.findOne({
    title: title,
    type: type,
    link: link,
    userId: userId,
  });
  if (iscontent) {
    res.status(400).json({
      msg: "content already exist",
    });
  } else {
    const response = await contentModel.create({
      title: title,
      type: type,
      link: link,
      userId: userId,
    });

    if (!response) {
      res.json({
        msg: "cannot add contents",
      });
    } else {
      res.json({
        msg: "contents added!!",
      });
    }
  }
});

app.get("/api/content", auth, async (req: userId, res) => {
  const userId = req.userId;
  const content = await contentModel.find({
    userId: userId,
  });

  if (!content) {
    res.json({
      msg: "contents not found",
    });
  } else {
    res.json({
      content: content,
    });
  }
});

app.delete("/api/content/deleteAll", auth, async (req: userId, res) => {
  const userId = req.userId;
  const response = await contentModel.deleteMany({
    userId: userId,
  });
  if (!response) {
    res.json({
      msg: "failed to delete content",
    });
  } else {
    res.json({
      msg: "deleted all your contents",
    });
  }
});
app.delete("/api/content/deleteOne", auth, async (req: userId, res) => {
  const userId = req.userId;
  const contentId = req.body.contentId;
  const response = await contentModel.deleteOne({
    userId: userId,
    _id: contentId,
  });
  if (!response) {
    res.json({
      msg: "failed to delete content",
    });
  } else {
    res.json({
      msg: "deleted your contents",
    });
  }
});

app.post("/api/brain/share", auth, async (req: userId, res) => {
  const userId = req.userId;
  const share = req.body.share;
  const ishash = await linkModel.findOne({
    userId: userId,
  });
  if (ishash) {
    res.json({
      hash: ishash.hash,
    });
    return;
  } else if (!ishash && share) {
    const response = await linkModel.create({
      userId: userId,
      hash: random(10),
    });
    if (!response) {
      res.status(400).json({
        msg: "cannot create shareable link",
      });
    } else {
      res.status(200).json({
        hash: response.hash,
      });
    }
  }
});
app.delete("/api/brain/share", auth, async (req: userId, res) => {
  const share = req.body.share;
  const userId = req.userId;
  if (share === false) {
    const linkResponse = await linkModel.deleteMany({
      userId: userId,
    });
    res.json({
      msg: "not sharing anymore",
    });
  }
});

app.get("/api/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const response = await linkModel.findOne({
    hash: hash,
  });
  if (!response) {
    res.json({
      msg: "no content found",
    });
  } else {
    const userId = response.userId;
    const content = await contentModel.find({
      userId: userId,
    });
    content
      ? res.json({
          data: content,
        })
      : res.json({
          msg: "error fetching content",
        });
  }
});

app.listen(3000);
