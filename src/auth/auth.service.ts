import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException, NotFoundException, Redirect } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

import { CreateAuthDto, LoginAuthDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserAuthDto } from './dto/user-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService
  ) { }

  async create(createAuthDto: CreateAuthDto) {
    const { password, ...userData } = createAuthDto;

    try {
      const user = await this.UserModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      const userWithPassword = user.toJSON()
      delete userWithPassword.password

      return {
        ...userWithPassword,
        token: this.getJwtToken({ id: user.id })
      };

    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { password, email } = loginAuthDto;

    const user = await this.UserModel.findOne()
      .where({ email })
      .select({ email: true, password: true, _id: true, isActive: true, roles: true, username: true })

    if (!user) throw new NotFoundException('El usuario no existe')
    if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Las credenciales no son validas')

    const userWithPassword = user.toJSON()
    delete userWithPassword.password

    return ({
      ...userWithPassword,
      token: this.getJwtToken({ id: user._id })
    });
  }


  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    const user = await this.UserModel.findOne({ email: req.user.email })

    if (!user) {
      const user = await this.UserModel.create(req.user)
      return {
        message: 'User information from google',
        ...req.user,
        token: this.getJwtToken({ id: user._id })
      }

    }

    return {
      message: 'User information from google',
      ...req.user,
      token: this.getJwtToken({ id: user._id }),
    }
  }


  async getUser(userAuthDto: UserAuthDto) {
    try {
      return await this.UserModel.findById(userAuthDto.id);
    } catch (error) {
      throw new NotFoundException('El usuario no existe')
    }
  }


  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }

  private handleDBErrors(errors: any): never {
    if (errors.code == 11000) throw new BadRequestException('El usuario ya existe')
    console.log(errors)
    throw new InternalServerErrorException('Please check server logs')
  }
}

