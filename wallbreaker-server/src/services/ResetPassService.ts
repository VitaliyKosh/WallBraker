import dotenv from 'dotenv';
import * as uuid from "uuid";
import ResetPassModel from '../models/ResetPassModel';
import { NextFunction } from 'express';
import ApiError from '../exceptions/ApiError';
dotenv.config();

export default class ResetPassService {
    static async generateLink(userId: string) {
        try {
            const link = uuid.v4()  

            await ResetPassModel.create({
                userId,
                link
            }) 

            return link
        } catch (e) {

        }

    }

    static async validateLink(link: string) {
        try {         
            const resetPassLink = await ResetPassModel.findOne({ link })

            return resetPassLink?.userId
        } catch (e) {
            return null
        }
    }

    static async removeLink(link: string) {
        return await ResetPassModel.findOneAndRemove({ link })
    }
}