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
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class MailService {
    static sendRegistrationMail(to, link) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transporter.sendMail({
                from: process.env.SMTP_FROM,
                to,
                subject: `Добро пожаловать в WallBreaker!`,
                text: '',
                html: `
                <a href="${link}">Подтвердить регистрацию</a>
                `
            });
        });
    }
    static sendResetPassMail(to, link) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.transporter.sendMail({
                from: process.env.SMTP_FROM,
                to,
                subject: `Сброс пароля в WallBreaker`,
                text: '',
                html: `
                Для восстановления пароля перейдите по <a href="${link}">ссылке</a>
                <hr/>
                Если вы не восстанавливали пароль, обратитесь к <a href="${process.env.SMTP_HOST}">администратору</a>
                `
            });
        });
    }
}
// static HOST = process.env.SMTP_HOST || 'smtp.yandex.ru'
// static PORT = Number(process.env.SMTP_PORT) || 465
MailService.transporter = nodemailer_1.default.createTransport({
    // host: MailService.HOST,
    // port: MailService.PORT,
    host: "smtp-pulse.com",
    port: 2525,
    secure: false,
    // secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    }
});
exports.default = MailService;
