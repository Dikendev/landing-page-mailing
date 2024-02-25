import { InvalidEmailError } from '../../entities/user/errors/invalid-email';
import { InvalidNameError } from '../../entities/user/errors/invalid-name';
import { User } from '../../entities/user/user';
import { UserData } from '../../entities/user/user-data.interface';
import { Either, left, right } from '../../shared/either';
import { MailServiceError } from '../errors/mail-service-error';
import { EmailOptions, EmailService } from '../ports/email-service.interface';
import { SendEmailResponse } from './send-email-response';
import { SendEmail } from './send-email.repository';

export class SendEmailToUserWithBonus implements SendEmail {
  private readonly mailOptions: EmailOptions;
  private readonly mailService: EmailService;

  constructor(mailOptions: EmailOptions, mailService: EmailService) {
    this.mailOptions = mailOptions;
    this.mailService = mailService;
  }

  async sendEmailToUserWithBonus(
    userData: UserData,
  ): Promise<SendEmailResponse> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> =
      User.create(userData);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user: User = userOrError.value;
    const greetings = `Oi ${user.name.value}, tudo bem?`;
    const customHtml = `${greetings} ${this.mailOptions.html}`;
    const options: EmailOptions = {
      host: this.mailOptions.host,
      port: this.mailOptions.port,
      username: this.mailOptions.username,
      password: this.mailOptions.password,
      from: this.mailOptions.from,
      to: user.name.value + '<' + user.email.value + '>',
      subject: this.mailOptions.subject,
      text: this.mailOptions.text,
      html: customHtml,
      attachments: this.mailOptions.attachments,
    };

    const sent: Either<MailServiceError, EmailOptions> =
      await this.mailService.send(options);

    if (sent.isLeft()) {
      return left(new MailServiceError());
    }

    return right(options);
  }
}
