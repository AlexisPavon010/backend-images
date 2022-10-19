import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';

import { User } from '../entities/user.entity'
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    console.log(payload, 'payload')

    const user = await this.UserModel.findById(id)

    if (!user) throw new UnauthorizedException("Token no valid");

    if (!user.isActive) throw new UnauthorizedException("User is inactive, please talk whit admin");

    return user;
  }

}