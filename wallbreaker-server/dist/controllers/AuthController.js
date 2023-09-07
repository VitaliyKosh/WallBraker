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
const express_validator_1 = require("express-validator");
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
const dotenv_1 = __importDefault(require("dotenv"));
const ResetPassService_1 = __importDefault(require("../services/ResetPassService"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
dotenv_1.default.config();
class AuthController {
    static registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, pass } = req.body;
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    if (!email) {
                        return next(ApiError_1.default.BadRequest(`Пустой E-mail`, errors.array()));
                    }
                    else {
                        return next(ApiError_1.default.BadRequest(`Некорректный E-mail`, errors.array()));
                    }
                }
                const user = yield AuthService_1.default.registration(email, pass);
                const userData = yield AuthService_1.default.login(email, pass);
                res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), secure: false });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static activate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!process.env.CLIENT_URL)
                    throw next(ApiError_1.default.ServerError(`Ошибка сервера`));
                const activationLink = req.params.link;
                yield AuthService_1.default.activate(activationLink);
                return res.redirect(process.env.CLIENT_URL);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userData = yield AuthService_1.default.login(email, password);
                res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), secure: false });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = yield AuthService_1.default.logout(refreshToken);
                res.clearCookie('refreshToken');
                return res.json(token);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield AuthService_1.default.refresh(refreshToken);
                res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), secure: false });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static resetPasswordRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield UserModel_1.default.findOne({ email });
                if (!user) {
                    return next(ApiError_1.default.BadRequest(`Пользователя с таким e-mail не существует`));
                }
                const userId = yield AuthService_1.default.resetPasswordRequest(email, user._id.toString());
                return res.json(userId);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!process.env.CLIENT_URL)
                    throw next(ApiError_1.default.ServerError(`Ошибка сервера`));
                const resetLink = req.params.link;
                const { pass } = req.body;
                const userId = yield ResetPassService_1.default.validateLink(resetLink);
                if (!userId) {
                    return next(ApiError_1.default.BadRequest(`Ссылка недействительна`));
                }
                yield AuthService_1.default.resetPassword(userId.toString(), pass);
                yield ResetPassService_1.default.removeLink(resetLink);
                // return res.redirect(`${process.env.CLIENT_URL}/resetPass/${resetLink}`)
                return res.json(userId);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = AuthController;
