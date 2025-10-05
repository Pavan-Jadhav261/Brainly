"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const util_1 = require("./util");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashPassword = await bcrypt_1.default.hash(password, 5);
    const userExist = await db_1.userModel.findOne({
        username: username,
    });
    console.log(userExist);
    if (!userExist) {
        const response = await db_1.userModel.create({
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
    }
    else if (userExist) {
        res.status(409).json({
            msg: "user already exists",
        });
    }
});
app.post("/api/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const response = await db_1.userModel.findOne({
        username: username,
    });
    if (!response) {
        res.status(400).json({
            msg: "user not found signup first",
        });
    }
    else {
        const hashPassword = response.password;
        const isUser = await bcrypt_1.default.compare(password, hashPassword);
        if (isUser) {
            const userId = response._id;
            console.log(userId);
            const token = jsonwebtoken_1.default.sign({
                userId: userId,
            }, config_1.JWT_SECRET);
            res.status(200).json({
                token: token,
            });
        }
        else {
            res.status(400).json({
                msg: "wrong password",
            });
        }
    }
});
app.post("/api/content", middleware_1.auth, async (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const type = req.body.type;
    const link = req.body.link;
    const iscontent = await db_1.contentModel.findOne({
        title: title,
        type: type,
        link: link,
        userId: userId,
    });
    if (iscontent) {
        res.status(400).json({
            msg: "content already exist",
        });
    }
    else {
        const response = await db_1.contentModel.create({
            title: title,
            type: type,
            link: link,
            userId: userId,
        });
        if (!response) {
            res.json({
                msg: "cannot add contents",
            });
        }
        else {
            res.json({
                msg: "contents added!!",
            });
        }
    }
});
app.get("/api/content", middleware_1.auth, async (req, res) => {
    const userId = req.userId;
    const content = await db_1.contentModel.find({
        userId: userId,
    });
    if (!content) {
        res.json({
            msg: "contents not found",
        });
    }
    else {
        res.json({
            content: content,
        });
    }
});
app.delete("/api/content/deleteAll", middleware_1.auth, async (req, res) => {
    const userId = req.userId;
    const response = await db_1.contentModel.deleteMany({
        userId: userId,
    });
    if (!response) {
        res.json({
            msg: "failed to delete content",
        });
    }
    else {
        res.json({
            msg: "deleted all your contents",
        });
    }
});
app.delete("/api/content/deleteOne", middleware_1.auth, async (req, res) => {
    const userId = req.userId;
    const contentId = req.body.contentId;
    const response = await db_1.contentModel.deleteOne({
        userId: userId,
        _id: contentId,
    });
    if (!response) {
        res.json({
            msg: "failed to delete content",
        });
    }
    else {
        res.json({
            msg: "deleted your contents",
        });
    }
});
app.post("/api/brain/share", middleware_1.auth, async (req, res) => {
    const userId = req.userId;
    const share = req.body.share;
    const ishash = await db_1.linkModel.findOne({
        userId: userId,
    });
    if (ishash) {
        res.json({
            hash: ishash.hash,
        });
        return;
    }
    else if (!ishash && share) {
        const response = await db_1.linkModel.create({
            userId: userId,
            hash: (0, util_1.random)(10),
        });
        if (!response) {
            res.status(400).json({
                msg: "cannot create shareable link",
            });
        }
        else {
            res.status(200).json({
                hash: response.hash,
            });
        }
    }
});
app.delete("/api/brain/share", middleware_1.auth, async (req, res) => {
    const share = req.body.share;
    const userId = req.userId;
    if (share === false) {
        const linkResponse = await db_1.linkModel.deleteMany({
            userId: userId,
        });
        res.json({
            msg: "not sharing anymore",
        });
    }
});
app.get("/api/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const response = await db_1.linkModel.findOne({
        hash: hash,
    });
    if (!response) {
        res.json({
            msg: "no content found",
        });
    }
    else {
        const userId = response.userId;
        const content = await db_1.contentModel.find({
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
//# sourceMappingURL=index.js.map