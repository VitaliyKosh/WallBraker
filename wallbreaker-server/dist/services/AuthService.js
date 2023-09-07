"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid = __importStar(require("uuid"));
const TokenService_1 = __importDefault(require("./TokenService"));
const UserDto_1 = __importDefault(require("../dtos/UserDto"));
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
const dotenv_1 = __importDefault(require("dotenv"));
const MailService_1 = __importDefault(require("./MailService"));
const ActivationLinkModel_1 = __importDefault(require("../models/ActivationLinkModel"));
const AccountTypes_1 = __importDefault(require("../types/AccountTypes"));
const ResetPassService_1 = __importDefault(require("./ResetPassService"));
dotenv_1.default.config();
class AuthService {
    static registration(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield UserModel_1.default.findOne({ email });
            if (candidate) {
                throw ApiError_1.default.BadRequest(`Пользователь c почтой ${email} уже зарегистрирован`);
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 3);
            const activationLink = uuid.v4();
            const date = Date.now();
            const user = yield UserModel_1.default.create({
                email,
                password: hashPassword,
                accountType: AccountTypes_1.default.USER,
                registrationDate: date,
                isActivated: false,
                lastKeyDeleted: date,
                lastOnline: date
            });
            yield ActivationLinkModel_1.default.create({
                userId: user._id,
                activationLink
            });
            yield AuthService.generateTokensAndDto(user);
            yield MailService_1.default.sendRegistrationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`);
            return new UserDto_1.default(user);
        });
    }
    static activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const activationLinkDoc = yield ActivationLinkModel_1.default.findOne({ activationLink });
            if (!activationLinkDoc) {
                throw ApiError_1.default.BadRequest('Некорректная ссылка активации');
            }
            const user = yield UserModel_1.default.findById(activationLinkDoc.userId);
            if (!user) {
                throw ApiError_1.default.BadRequest('Пользователь не найден');
            }
            user.isActivated = true;
            yield user.save();
            activationLinkDoc.deleteOne();
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.default.findOne({ email });
            if (!user) {
                throw ApiError_1.default.BadRequest(`Пользователь c email ${email} не найден`);
            }
            user.lastOnline = new Date();
            user.save();
            const isPassEquals = yield bcrypt_1.default.compare(password, user.password);
            if (!isPassEquals) {
                throw ApiError_1.default.BadRequest(`Неверный пароль`);
            }
            return yield AuthService.generateTokensAndDto(user);
        });
    }
    static logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield TokenService_1.default.removeToken(refreshToken);
            return token;
        });
    }
    static refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw ApiError_1.default.UnauthorizedError();
            }
            const userData = yield TokenService_1.default.validateRefreshToken(refreshToken);
            const tokenFromDb = yield TokenService_1.default.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw ApiError_1.default.UnauthorizedError();
            }
            const user = yield UserModel_1.default.findById(userData.id);
            const newTokens = yield AuthService.generateTokensAndDto(user);
            const tokenData = yield TokenService_1.default.removeToken(refreshToken);
            return newTokens;
        });
    }
    static generateTokensAndDto(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDto = new UserDto_1.default(user);
            const tokens = yield TokenService_1.default.generateTokens(Object.assign({}, userDto));
            yield TokenService_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    static resetPasswordRequest(email, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resetLink = yield ResetPassService_1.default.generateLink(userId);
            yield MailService_1.default.sendResetPassMail(email, `${process.env.CLIENT_URL}/app/resetPassword/${resetLink}`);
            return userId;
        });
    }
    static resetPassword(userId, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.default.findById(userId);
            if (!user) {
                throw ApiError_1.default.BadRequest('Пользователь не найден');
            }
            const hashPassword = yield bcrypt_1.default.hash(pass, 3);
            user.password = hashPassword;
            yield user.save();
            return user._id;
        });
    }
}
exports.default = AuthService;
