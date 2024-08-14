import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { EmailTemplates } from './templates';

@Injectable()
export class MessagingService {
  constructor(private readonly mailerService: NestMailerService) {}
  async sendMail(to: string, subject: string, template: string, context: any) {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }

  /**
   * Sends an email when an account is created.
   * @param to - Recipient's email address.
   * @param firstName - Recipient's first name.
   * @param lastName - Recipient's last name.
   */
  async sendAccountCreatedEmail(
    to: string,
    firstName: string,
    lastName: string,
  ) {
    const fullName = `${firstName} ${lastName}`;

    // Sending email
    await this.mailerService.sendMail({
      to, // Recipient's email address
      subject: EmailTemplates.accountCreated.subject, // Email subject
      template: EmailTemplates.accountCreated.template, // Path to email template
      context: {
        name: fullName, // Dynamic content for the template
      },
    });
  }
}
