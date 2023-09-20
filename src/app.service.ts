import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from '@sendgrid/mail';

@Injectable()
export class AppService {
  constructor(
    private readonly _mailerSvc: MailerService,
    private readonly _mailSvc: MailService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  sendMail(): void {
    this._mailSvc.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'juliethm04052003@gmail.com', // Change to your recipient
      from: 'johanhernandezvelez@gmail.com', // Change to your verified sender
      subject: 'Segunda prueba de Email',
      text: 'Una prueba sencilla de envio de correo',
      html: '<strong>Una prueba sencilla de envio de correo</strong>',
    };
    this._mailSvc
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
    //
    // this._mailerSvc.sendMail({
    //   to: 'juliethm04052003@gmail.com',
    //   from: 'johanhernandezvelez@gmail.com',
    //   subject: 'Prueba del NodeMailer',
    //   text: 'PRUEBA',
    //   html: '<b>Esta es una prueba para envio de correos</b>',
    // });
  }
}
