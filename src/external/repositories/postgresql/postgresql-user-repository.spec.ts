import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { PostgresqlRepository } from './postgresql-user-repository.';

const prismaMock = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('Postgresql User repository', () => {
  let userRepository: PostgresqlRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostgresqlRepository,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    userRepository = module.get<PostgresqlRepository>(PostgresqlRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should userRepository to be defined', async () => {
    expect(userRepository).toBeDefined();
  });

  it('should prisma to be defined', async () => {
    expect(prisma).toBeDefined();
  });

  test('should add user', async () => {
    await userRepository.add({
      name: 'any_name',
      email: 'any_email@email.com',
    });

    prismaMock.user.findUnique.mockReturnValue({
      name: 'any_name',
      email: 'any_email@email.com',
    });

    const user = await userRepository.findUserByEmail('any_email@email.com');

    expect(user.name).toEqual('any_name');
  });
});
