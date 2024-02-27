import { MailServiceError } from '../../use-cases/errors/mail-service-error';
import {
  ContentType,
  EmailOptions,
} from '../../use-cases/ports/email-service.interface';
import { NodemailerEmailService } from './nodemailer-email-service';

const makeSut = (): NodemailerEmailService => {
  return new NodemailerEmailService();
};

const attachmentFilePath: string = 'any_file_path';

const fromName = 'Test';
const fromEmail = 'from_email@gmail.com';
const toName = 'any_name';
const toEmail = 'any_email@gmail.com';
const subject = 'test email';
const emailBody = 'Hello world';
const emailBodyHtml = '<b> Body Html </b>';
const attachments = [
  {
    filename: attachmentFilePath,
    contentType: ContentType.txt,
  },
];

const mailOptions: EmailOptions = {
  host: 'host',
  port: 666,
  username: 'any_username',
  password: 'any_password',
  from: `${fromName} ${fromEmail}`,
  to: `${toName} ${toEmail}`,
  subject: subject,
  text: emailBody,
  html: emailBodyHtml,
  attachments: attachments,
};

jest.mock('nodemailer');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
const sendMailMock = jest.fn().mockReturnValueOnce('ok');
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

beforeEach(() => {
  sendMailMock.mockClear();
  nodemailer.createTransport.mockClear();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('Nodemailer mail service adapter', () => {
  test('should nodemailerService to be defined', () => {
    expect(makeSut).toBeDefined();
  });

  test('should return ok if email is send', async () => {
    const sut = makeSut();
    sendMailMock.mockReturnValueOnce('ok');
    const result = await sut.send(mailOptions);
    expect(result.value).toEqual(mailOptions);
  });

  test('should call nodemailer createTransport with correct options', async () => {
    const sut = makeSut();
    const spyCreateTransport = jest.spyOn(nodemailer, 'createTransport');
    await sut.send(mailOptions);

    expect(spyCreateTransport).toHaveBeenCalledWith({
      host: 'host',
      port: 666,
      auth: {
        user: 'any_username',
        pass: 'any_password',
      },
    });
  });

  test('should return error if email is not set', async () => {
    const sut = makeSut();
    nodemailer.createTransport.mockImplementationOnce({
      sendMail: jest.fn().mockRejectedValueOnce(new Error()),
    });
    const result = await sut.send(mailOptions);
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(MailServiceError);
  });
});
