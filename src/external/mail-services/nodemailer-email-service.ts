import { Either, left, right } from '../../shared/either';
import { MailServiceError } from '../../use-cases/errors/mail-service-error';
import * as nodemailer from 'nodemailer';
import {
  EmailOptions,
  EmailService,
} from '../../use-cases/ports/email-service.interface';

export class NodemailerEmailService implements EmailService {
  async send(
    options: EmailOptions,
  ): Promise<Either<MailServiceError, EmailOptions>> {
    try {
      const transporter = nodemailer.createTransport({
        host: options.host,
        port: options.port,
        auth: { user: options.username, pass: options.password },
      });

      await transporter.sendMail({
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
      });
    } catch (error) {
      return left(new MailServiceError());
    }
    return right(options);
  }
}
