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

describe('Send email to user with bonus use case', () => {
  test('should not email user with invalid email address', async () => {
    const { sut } = makeSut();
    const result = await sut.sendEmailToUserWithBonus({
      name: toName,
      email: 'invalid_email',
    });
    expect(result).toBeInstanceOf(Left);
  });

  test('should email user with attachment', async () => {
    const { sut } = makeSut();
    const result = await sut.sendEmailToUserWithBonus({
      name: toName,
      email: toEmail,
    });
    expect(result).toBeInstanceOf(Right);
  });

  test('should raise error when email service fails', async () => {
    const { sut, mailServiceStub } = makeSut();
    jest
      .spyOn(mailServiceStub, 'send')
      .mockResolvedValueOnce(Promise.resolve(left(new MailServiceError())));
    const result = await sut.sendEmailToUserWithBonus({
      name: toName,
      email: toEmail,
    });
    expect(result.value).toBeInstanceOf(MailServiceError);
  });
});
