"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const user_1 = require("./resolvers/user");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const isAuth_1 = require("./middleware/isAuth");
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)({
        type: "postgres",
        database: "axial",
        username: "postgres",
        password: "postgres",
        logging: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        synchronize: true,
        entities: [User_1.User],
    });
    conn.runMigrations();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use((0, cors_1.default)({
        origin: "http://localhost:19006",
        credentials: true,
    }));
    app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../images/")));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: "4BCB54273A146FF762EF27C2F32A630CC558AB6043B453C8461A9BD5E2BEB35B",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    const upload = (0, multer_1.default)({
        storage: multer_1.default.diskStorage({
            destination: "images",
            filename: async (_, _file, callback) => {
                const name = await (0, uuid_1.v4)();
                callback(null, name + ".jpg");
            },
        }),
        fileFilter: (_, file, callback) => {
            if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
                callback(null, true);
            }
            else {
                callback(new Error("Not an image"));
            }
        },
    });
    app.post("/upload", isAuth_1.expressIsAuth, upload.single("image"), async (req, res) => {
        console.log(req.file);
        return res.json({ success: true });
    });
    app.listen(4000, () => {
        console.log("🚀 Server started on localhost:4000");
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map