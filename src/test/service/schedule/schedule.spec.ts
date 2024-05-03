import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleCreateParam } from '../../../controller/schedule/dto/ScheduleCreateParam';
import { ScheduleController } from '../../../controller/schedule/schedule.controller';
import { ScheduleService } from '../../../service/schedule/schedule.service';
import { Schedule } from 'src/domain/schedule/schedule.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/domain/user/user.entity';
import { Repository } from 'typeorm';

const mockScheduleRepository = () => ({
  save: jest.fn(),
});

const mockUserRepository = () => ({
  findOneBy: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ScheduleService Test (Unit)', () => {
  let service: ScheduleService;
  let userRepository: MockRepository<User>;
  let scheduleRepository: MockRepository<Schedule>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        {
          provide: getRepositoryToken(Schedule),
          useValue: mockScheduleRepository()
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository()
        },
      ],
    }).compile();

    service = module.get<ScheduleService>(ScheduleService);
    userRepository = module.get<MockRepository<User>>(
      getRepositoryToken(User),
    );
    scheduleRepository = module.get<MockRepository<Schedule>>(
      getRepositoryToken(Schedule),
    );
  });

  describe('create', () => {
    const creatUser = {
      id: 1,
      email: 'test@test.com',
      password: 'test',
      salt: 'test',
      nickname: 'test',
    };
    const creatSchedule = {
      header: 'test',
      content: 'test',
      date: new Date(2024,5,4),
      startTime: '10:00',
      endTime: "11:00",
      user: creatUser,
    };
    it('스케줄 생성', async () => {
      const dto = ScheduleCreateParam.create(
        'test',
        'test',
        new Date(2024,5,4),
        '10:00',
        '11:00'
      )

      userRepository.findOneBy.mockResolvedValue(creatUser);
      scheduleRepository.save.mockResolvedValue(creatSchedule);

      const result = await service.create(1,dto); //
      
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1); // save가 1번 불러졌니?
      // expect(userRepository.findOneBy).toHaveBeenCalledWith(creatUser); 
      expect(scheduleRepository.save).toHaveBeenCalledTimes(1); // save가 1번 불러졌니?
      expect(scheduleRepository.save).toHaveBeenCalledWith(creatSchedule); 

    });
  });
});
