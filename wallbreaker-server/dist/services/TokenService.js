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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenModel_1 = __importDefault(require("../models/TokenModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class TokenService {
    static generateTokens(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = jsonwebtoken_1.default.sign(payload, TokenService.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES });
            const refreshToken = jsonwebtoken_1.default.sign(payload, TokenService.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES });
            return {
                accessToken,
                refreshToken
            };
        });
    }
    static validateAccessToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = jsonwebtoken_1.default.verify(token, TokenService.JWT_ACCESS_SECRET);
                return userData;
            }
            catch (e) {
                return null;
            }
        });
    }
    static validateRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = jsonwebtoken_1.default.verify(token, TokenService.JWT_REFRESH_SECRET);
                return userData;
            }
            catch (e) {
                return null;
            }
        });
    }
    static saveToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield TokenModel_1.default.create({ userId, refreshToken });
            return token;
        });
    }
    static removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield TokenModel_1.default.deleteOne({ refreshToken });
            return tokenData;
        });
    }
    static findToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield TokenModel_1.default.findOne({ refreshToken });
            return tokenData;
        });
    }
}
TokenService.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret';
TokenService.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'secret';
exports.default = TokenService;
