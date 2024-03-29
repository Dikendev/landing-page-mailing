import { Either } from '../../shared/either';
import { MailServiceError } from '../errors/mail-service-error';

export interface EmailOptions {
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly from: string;
  readonly to: string;
  readonly subject: string;
  readonly text: string;
  readonly html: string;
  readonly attachments: Attachment[];
}

interface Attachment {
  filename: string;
  contentType: ContentType;
}

export enum ContentType {
  txt = 'text/plain',
  zip = 'application/zip',
}

export interface EmailService {
  send: (
    options: EmailOptions,
  ) => Promise<Either<MailServiceError, EmailOptions>>;
}
