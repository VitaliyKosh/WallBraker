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
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const TokenService_1 = __importDefault(require("../services/TokenService"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const accessToken = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next();
        }
        const userData = yield TokenService_1.default.validateAccessToken(accessToken);
        const userId = yield (userData === null || userData === void 0 ? void 0 : userData.id);
        const user = yield UserModel_1.default.findById(userId);
        if (user) {
            user.lastOnline = new Date();
            user.save();
        }
        next();
    }
    catch (e) {
        return next(ApiError_1.default.BadRequest('Online Error'));
    }
});
