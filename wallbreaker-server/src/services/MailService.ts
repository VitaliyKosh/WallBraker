import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export default class MailService {
    // static HOST = process.env.SMTP_HOST || 'smtp.yandex.ru'
    // static PORT = Number(process.env.SMTP_PORT) || 465

    static transporter = nodemailer.createTransport({
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
    })

    static async sendRegistrationMail(to: string, link: string) {
        return await this.transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject: `Добро пожаловать в WallBreaker!`,
            text: '',
            html:
                `
                <a href="${link}">Подтвердить регистрацию</a>
                `
        })
    }

    static async sendResetPassMail(to: string, link: string) {
        return await this.transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject: `Сброс пароля в WallBreaker`,
            text: '',
            html:
                `
                Для восстановления пароля перейдите по <a href="${link}">ссылке</a>
                <hr/>
                Если вы не восстанавливали пароль, обратитесь к <a href="${process.env.SMTP_HOST}">администратору</a>
                `
        })
    }
}