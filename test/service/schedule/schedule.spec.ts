import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { UserRepository } from "src/domain/user/user.repository";
import { UserService } from "src/service/user/user.service";

describe('Service (e2e)', () => {
    let userService: UserService;
    let userRepository: UserRepository;
  
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [UserService, UserRepository],
        }).compile();
    
        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
    });
  
    it('스케줄 추가하기', () => {

    })
  });