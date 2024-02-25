import { Either, Left, Right, left, right } from '../../shared/either';
import { MailServiceError } from '../errors/mail-service-error';
import {
  ContentType,
  EmailOptions,
  EmailService,
} from '../ports/email-service.interface';
import { SendEmailToUserWithBonus } from './send-email-to-user-with-bonus';

const attachmentsFilePath: string = '../resources/test.txt';

const fromName = 'test';
const fromEmail = 'test';
const toName = 'any_name';
const toEmail = 'any_any@gmail.com';
const subject = 'Test email';
const emailBody = 'Hello world';
const emailBodyHtml = '';

const mailOptions: EmailOptions = {
  host: 'test',
  port: 888,
  username: 'test',
  password: 'test',
  from: `${fromName} ${fromEmail}`,
  to: `${toName} < ${toEmail}`,
  subject: subject,
  text: emailBody,
  html: emailBodyHtml,
  attachments: [
    {
      filename: attachmentsFilePath,
      contentType: ContentType.txt,
    },
  ],
};

class MailServiceStub implements EmailService {
  async send(
    options: EmailOptions,
  ): Promise<Either<MailServiceError, EmailOptions>> {
    return right(options);
  }
}

const makeSut = (): {
  sut: SendEmailToUserWithBonus;
  mailServiceStub: MailServiceStub;
} => {
  const mailServiceStub = new MailServiceStub();
  const sut = new SendEmailToUserWithBonus(mailOptions, mailServiceStub);
  return { sut, mailServiceStub };
};
