import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      auth: {
        user: 'hoangphuocloc.phurieng@gmail.com',
        pass: 'hxgpkmzavifymlrt',
      },
    });
  }

  async sendMail(to: string, text: string) {
    return this.transporter.sendMail({
      from: `My App hoangphuocloc.phurieng@gmail.com`,
      to,
      subject: 'pass word account',
      text,
    });
  }
}
