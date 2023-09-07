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
const UserDto_1 = __importDefault(require("../dtos/UserDto"));
const dotenv_1 = __importDefault(require("dotenv"));
const ActivationLinkModel_1 = __importDefault(require("../models/ActivationLinkModel"));
const TokenModel_1 = __importDefault(require("../models/TokenModel"));
dotenv_1.default.config();
class AdminUserService {
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserModel_1.default.find();
            const usersDto = users.map((user) => {
                const userDto = new UserDto_1.default(user);
                return Object.assign({}, userDto);
            });
            return usersDto;
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UserModel_1.default.deleteOne({ _id: id });
            yield TokenModel_1.default.deleteMany({ userId: id });
            yield ActivationLinkModel_1.default.deleteOne({ userId: id });
            return;
        });
    }
}
exports.default = AdminUserService;
