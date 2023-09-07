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
const UserModel_1 = __importDefault(require("../models/UserModel"));
const dotenv_1 = __importDefault(require("dotenv"));
const AccountTypes_1 = __importDefault(require("../types/AccountTypes"));
dotenv_1.default.config();
class UserService {
    static setUsername(userId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.default.findById(userId);
            if (user) {
                user.username = username;
                user.save();
            }
            return username;
        });
    }
    static getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.findById(userId);
        });
    }
    static setOnline(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.default.findById(userId);
            if (user) {
                user.lastOnline = new Date();
                user === null || user === void 0 ? void 0 : user.save();
            }
        });
    }
    static isAdmin(userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const accountType = (_a = (yield UserModel_1.default.findById(userId))) === null || _a === void 0 ? void 0 : _a.accountType;
            return accountType === AccountTypes_1.default.ADMIN || accountType === AccountTypes_1.default.MAIN_ADMIN;
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.find({ accountType: AccountTypes_1.default.USER });
        });
    }
    static getMainAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.findOne({ accountType: AccountTypes_1.default.MAIN_ADMIN });
        });
    }
}
exports.default = UserService;
