import {
  Controller,
  Get,
  HttpException,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-auth.guard';
import { GoogleAuthService } from './google-auth.service';

@ApiTags('Google auth')
@Controller('auth/google')
export class GoogleController {
  constructor(private googleAuthService: GoogleAuthService) {}

  @UseGuards(GoogleOauthGuard)
  @Get()
  async googleAuth(@Res() res: Response) {}

  @UseGuards(GoogleOauthGuard)
  @Get('callback')
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const responce = await this.googleAuthService.googleLogin(req);
    if (responce instanceof HttpException) return responce;

    return res.redirect(
      `${process.env.FRONTEND_APP}/?token=${responce.accessToken}`,
    );
  }
}
