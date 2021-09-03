import { Router, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { Post } from "../entities/Post";
import { expressIsAuth } from "../middleware/isAuth";
import { v4 } from "uuid";
import { Storage } from "@google-cloud/storage";
import path from "path";
import { User } from "../entities/User";

const router = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
            callback(null, true);
        } else {
            callback(new Error("Not an image"));
        }
    },
});

const gc = new Storage({
    keyFilename: path.join(__dirname, "../../axial-324717-30cc1be009b1.json"),
    projectId: "axial-324717",
});

const profilePicsBucket = gc.bucket("axial_profile_pics");
const postPicsBuckets = gc.bucket("axial_posts");

router.post(
    "/upload",
    expressIsAuth,
    upload.single("image"),
    // @ts-ignore
    async (req: Request, res: Response) => {
        if (!req.file) {
            return res.status(500).json({ file: "No file received" });
        }
        const name = await v4();
        const blob = profilePicsBucket.file(name);
        const blobStream = blob.createWriteStream({
            resumable: false,
            gzip: true,
        });
        console.log(req.file);

        blobStream.on("error", (err) => {
            return res.status(500).json({ error: err.message });
        });
        blobStream.on("finish", async () => {
            const publicUrl = `https://storage.googleapis.com/${profilePicsBucket.name}/${blob.name}`;
            await User.update(
                { id: req.session.userId },
                {
                    imgUrl: publicUrl,
                }
            );
            res.status(200).send({ url: publicUrl });
        });

        blobStream.end(req.file.buffer);
    }
);

const imgUpload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
            callback(null, true);
        } else {
            callback(new Error("Not an image"));
        }
    },
});

router.post(
    "/upload-img",
    expressIsAuth,
    imgUpload.single("image"),
    // @ts-ignore
    async (req: Request, res: Response) => {
        if (!req.file) {
            return res.status(500).json({ file: "No file received" });
        }
        const name = await v4();
        const blob = postPicsBuckets.file(name);
        const blobStream = blob.createWriteStream({
            resumable: false,
            gzip: true,
        });
        console.log(req.file);
        console.log(req.body);

        blobStream.on("error", (err) => {
            return res.status(500).json({ error: err.message });
        });
        blobStream.on("finish", async () => {
            const publicUrl = `https://storage.googleapis.com/${postPicsBuckets.name}/${blob.name}`;
            await Post.create({
                imgUrl: publicUrl,
                creatorId: req.session.userId,
                description: req.body.description,
            }).save();
            res.status(200).send({ url: publicUrl });
        });

        blobStream.end(req.file.buffer);
    }
);

export default router;
