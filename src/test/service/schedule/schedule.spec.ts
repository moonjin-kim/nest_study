import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleCreateParam } from '../../../controller/schedule/dto/ScheduleCreateParam';
import { ScheduleController } from '../../../controller/schedule/schedule.controller';
import { ScheduleService } from '../../../service/schedule/schedule.service';
import { Schedule } from 'src/domain/schedule/schedule.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/domain/user/user.entity';
import { Repository } from 'typeorm';
import { ScheduleItemDto } from 'src/service/schedule/dto/ScheduleItem.dto';
import { ScheduleUpdateParam } from 'src/controller/schedule/dto/ScheduleUpdateParam';

const mockScheduleRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
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
      id: 1,
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

      const result = await service.create(1, new Date(), dto); //
      
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1); // save가 1번 불러졌니?
      expect(scheduleRepository.save).toHaveBeenCalledTimes(1); // save가 1번 불러졌니?
      expect(result).toBe(1);
    });

    it('현재시간이 스케줄 일정보다 뒤 일 경우 예외가 발생한다.', async () => {
      const dto = ScheduleCreateParam.create(
        'test',
        'test',
        new Date(2024,5,4),
        '10:00',
        '11:00'
      )

      expect(async () => { 
        await service.create(1, new Date(2024,5,5), dto)
      }).rejects.toThrowError(new Error('일정을 생성할 수 없는 시간입니다.'));
      
    });
  });

  describe('update', () => {
    const creatUser = {
      id: 1,
      email: 'test@test.com',
      password: 'test',
      salt: 'test',
      nickname: 'test',
    };
    const creatSchedule = {
      id: 1,
      header: 'test',
      content: 'test',
      date: new Date(2024,5,4),
      startTime: '10:00',
      endTime: "11:00",
      user: creatUser,
    };
    const updateSchedule = {
      id: 1,
      header: 'testUpdate',
      content: 'testUpdate',
      date: new Date(2024,5,4),
      startTime: '10:00',
      endTime: "11:00",
      user: creatUser,
    };
    it('스케줄 변경', async () => {
      userRepository.findOneBy.mockResolvedValue(creatUser);
      scheduleRepository.findOneBy.mockResolvedValue(creatSchedule);
      scheduleRepository.save.mockResolvedValue(updateSchedule);

      const result = await service.update(1, 1, new Date(),ScheduleUpdateParam.update(
        'testUpdate',
        'testUpdate',
        new Date(2024,5,4),
        "10:00",
        "11:00"
      )); //
      
      expect(result).toBe(1);
    });

    it('스케줄 시간이 지나면 수정할 수 없다.', async () => {
      const updateParam = ScheduleUpdateParam.update(
        'testUpdate',
        'testUpdate',
        new Date(2024,5,4),
        "10:00",
        "11:00"
      )

      expect(async () => { 
        await service.update(1, 1, new Date(2024,5,5), updateParam); //
      }).rejects.toThrowError(new Error('일정을 수정 할 수 없는 시간입니다.'));
      
    });
  });

  describe('get', () => {
    const creatUser = {
      id: 1,
      email: 'test@test.com',
      password: 'test',
      salt: 'test',
      nickname: 'test',
    };
    const creatSchedule = {
      id: 1,
      header: 'test',
      content: 'test',
      date: new Date(2024,5,4),
      startTime: '10:00',
      endTime: "11:00",
      user: creatUser,
    };

    it('스케줄 조회', async () => {
      userRepository.findOneBy.mockResolvedValue(creatUser);
      scheduleRepository.find.mockResolvedValue([creatSchedule]);

      const result = await service.get(1,2024,5); //
      
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1); // save가 1번 불러졌니?
      expect(scheduleRepository.find).toHaveBeenCalledTimes(1); // save가 1번 불러졌니?
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('header', 'test');
      expect(result[0]).toHaveProperty('content', 'test');
      expect(result[0]).toHaveProperty('date', new Date(2024,5,4));
      expect(result[0]).toHaveProperty('startTime', '10:00');
      expect(result[0]).toHaveProperty('endTime', '11:00');
    });

    it('스케줄 조회 시 조건을 만족하는 결과가 없으면 빈 값이 조회된다', async () => {
      userRepository.findOneBy.mockResolvedValue(creatUser);
      scheduleRepository.find.mockResolvedValue([]);

      const result = await service.get(1,2024,5); //
      
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1); // save가 1번 불러졌니?
      expect(scheduleRepository.find).toHaveBeenCalledTimes(1); // save가 1번 불러졌니?

      expect(result).toHaveLength(0);
    });
  });
});
