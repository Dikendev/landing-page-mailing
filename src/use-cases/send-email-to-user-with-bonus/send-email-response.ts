import { Either } from '../../shared/either';
import { MailServiceError } from '../errors/mail-service-error';
import { EmailOptions } from '../ports/email-service.interface';

export type SendEmailResponse = Either<MailServiceError, EmailOptions>;
