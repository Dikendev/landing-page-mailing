import { UserData } from '../../entities/user/user-data.interface';
import { SendEmailResponse } from './send-email-response';

export interface SendEmail {
  sendEmailToUserWithBonus: (user: UserData) => Promise<SendEmailResponse>;
}
