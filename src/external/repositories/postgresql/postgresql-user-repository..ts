import { Injectable } from '@nestjs/common';
import { UserData } from '../../../entities/user/user-data.interface';
import { UserRepository } from '../../../use-cases/ports/user.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostgresqlRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers(): Promise<UserData[]> {
    return this.prisma.user.findMany();
  }

  async findUserByEmail(email: string): Promise<UserData> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async add(user: UserData): Promise<void> {
    const exist = this.exists(user.email);
    if (!exist) {
      await this.prisma.user.create({ data: user });
    }
  }

  async exists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user?.email === email) {
      return false;
    }

    return true;
  }
}
