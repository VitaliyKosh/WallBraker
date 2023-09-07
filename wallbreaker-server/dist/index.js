"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./config/ws/index");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const buildAppMiddlewares_1 = __importDefault(require("./config/buildAppMiddlewares"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const wss = new index_1.WSServer();
const WS_PORT = process.env.WS_PORT;
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
(0, buildAppMiddlewares_1.default)(app);
mongoose_1.default.set('strictQuery', false);
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
};
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        DB_URL && (yield mongoose_1.default.connect(DB_URL, dbOptions));
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
        wss.listen(WS_PORT, () => { console.log(`WS Server started on PORT = ${WS_PORT}`); });
    }
    catch (e) {
        console.log(e);
    }
});
start();
