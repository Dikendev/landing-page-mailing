import { UseCaseError } from './use-case-error';

export class MailServiceError extends Error implements UseCaseError {
  constructor() {
    super('Mail service error.');
    this.name = 'MailServiceError';
  }
}
