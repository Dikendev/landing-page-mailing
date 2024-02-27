import { NodemailerEmailService } from './nodemailer-email-service';

const makeSut = (): NodemailerEmailService => {
  return new NodemailerEmailService();
};

const attachmentFilePath: string = 'any_file_path';

const fromName = 'Test';
const fromEmail = 'from_email@gmail.com';
const toName = 'any_name';
const toEmail = 'any_email@gmail.com';

jest.mock('nodemailer');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
const sendMailMock = jest.fn().mockReturnValueOnce('ok');
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

beforeEach(() => {
  sendMailMock.mockClear();
  nodemailer.createTransport.mockClear();
});
