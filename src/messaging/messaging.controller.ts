import { Body, Controller, Post } from '@nestjs/common';
import { MessagingService } from './messaging.service';

@Controller('messaging')
export class MessagingController {
  constructor(private messagingService: MessagingService) {}

  @Post('send-email')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('template') template: string,
    @Body('context') context: any,
  ) {
    await this.messagingService.sendMail(to, subject, template, context);
    return { message: 'Email sent successfully' };
  }
}
