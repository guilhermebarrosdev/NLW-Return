import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '2e6b3de4988ff8',
    pass: 'e3e384b1092f8e',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@fedget.com>',
      to: 'Guilherme Barros <wingui3@gmail.com>',
      subject,
      html: body,
    });
  }
}
