"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_form_data_1 = __importDefault(require("express-form-data"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = __importDefault(require("../router"));
const os_1 = __importDefault(require("os"));
const errorMiddleware_1 = __importDefault(require("../middlewares/errorMiddleware"));
exports.default = (app) => {
    const formDataOptions = {
        uploadDir: os_1.default.tmpdir(),
        autoClean: true
    };
    app.use(express_form_data_1.default.parse(formDataOptions));
    app.use(express_form_data_1.default.format());
    app.use(express_form_data_1.default.stream());
    app.use(express_form_data_1.default.union());
    const corsOptions = {
        credentials: true,
        origin: process.env.CLIENT_URL
    };
    app.use((0, cors_1.default)(corsOptions));
    app.use(express_1.default.json({ limit: '50mb' }));
    app.use((0, cookie_parser_1.default)());
    app.use('/api', router_1.default);
    app.use(errorMiddleware_1.default);
};
