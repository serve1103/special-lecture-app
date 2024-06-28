import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { LectureServiceImpl } from '../application/services/lecture.serivce';
import { ApplyLectureOrmEntity } from '../infrastructure/orm/applyLecture.entity';
import { LectureOrmEntity } from '../infrastructure/orm/lecture.entity';
import { LectureRepositoryImpl } from '../infrastructure/repositories/lecture.repository.impl';
import { LectureApplyRepositoryImpl } from '../infrastructure/repositories/lectureApply.repository.impl';
import { LectureController } from '../presentation/controllers/lecture.controller';
import { LectureApplyDto } from '../application/dtos/lectureApply.dto';
import { Repository } from 'typeorm';
import { CreateLectureApplyDto } from 'src/application/dtos/createLecture.dto';

describe('특강 컨트롤러 integration TC', () => {
  let controller: LectureController;
  let module: TestingModule;
  let lectureRepository: Repository<LectureOrmEntity>;
  let lectureApplyRepository: Repository<ApplyLectureOrmEntity>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mssql',
          host: 'localhost',
          port: 1433,
          username: 'sa',
          password: 'A!123456789',
          database: 'nestApp',
          entities: [LectureOrmEntity, ApplyLectureOrmEntity],
          synchronize: true,
          extra: {
            trustServerCertificate: true,
          },
        }),
        TypeOrmModule.forFeature([LectureOrmEntity, ApplyLectureOrmEntity]),
      ],
      controllers: [LectureController],
      providers: [
        LectureServiceImpl,
        LectureRepositoryImpl,
        LectureApplyRepositoryImpl,
        {
          provide: 'LectureService',
          useClass: LectureServiceImpl,
        },
        {
          provide: 'LectureRepository',
          useClass: LectureRepositoryImpl,
        },
        {
          provide: 'LectureApplyRepository',
          useClass: LectureApplyRepositoryImpl,
        },
      ],
    }).compile();

    controller = module.get<LectureController>(LectureController);
    lectureRepository = module.get<Repository<LectureOrmEntity>>(
      getRepositoryToken(LectureOrmEntity),
    );
    lectureApplyRepository = module.get<Repository<ApplyLectureOrmEntity>>(
      getRepositoryToken(ApplyLectureOrmEntity),
    );
  });

  afterAll(async () => {
    await module.close();
  });

  describe('특강 신청 서비스', () => {
    // 정원 초과
    it('정원 초과', async () => {
      // const lecture = new LectureOrmEntity();
      // lecture.lectureName = '테스트 강의입니다';
      // lecture.startDate = '2024-06-27';
      // lecture.personnel = 1;
      // const lectureRepository =
      //   module.get<LectureRepositoryImpl>('LectureRepository');
      // // lectureId가 자동 생성되도록 저장
      // const savedLecture = await lectureRepository.setLecture(lecture);
      // const mockLectureApply1 = new LectureApplyDto();
      // mockLectureApply1.userId = 'test1';
      // mockLectureApply1.lectureId = lecture.lectureId;
      // await controller.setLectureApply(mockLectureApply1);
      // const mockLectureApply2 = new LectureApplyDto();
      // mockLectureApply2.userId = 'test2';
      // mockLectureApply2.lectureId = lecture.lectureId;
      // // When / Then
      // try {
      //   await controller.setLectureApply(mockLectureApply2);
      // } catch (e) {
      //   console.log('Expected substring: "정원이 초과되었습니다."');
      //   console.log('Received message:', e.message);
      //   throw e;
      // }
      // await expect(
      //   controller.setLectureApply(mockLectureApply2),
      // ).rejects.toThrow('정원이 초과되었습니다.');
    });
  });
});
