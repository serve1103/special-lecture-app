import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureController } from '../presentation/controllers/lecture.controller';
import { LectureServiceImpl } from '../application/services/lecture.serivce';
import { LectureRepositoryImpl } from '../infrastructure/repositories/lecture.repository.impl';
import { LectureApplyRepositoryImpl } from '../infrastructure/repositories/lectureApply.repository.impl';
import { LectureOrmEntity } from '../infrastructure/orm/lecture.entity';
import { ApplyLectureOrmEntity } from '../infrastructure/orm/applyLecture.entity';
import { LectureApplyDto } from '../application/dtos/lectureApply.dto';

describe('특강 컨트롤러 TC', () => {
  let controller: LectureController;
  let lectureService: LectureServiceImpl;
  let lectureRepository: LectureRepositoryImpl;
  let lectureApplyRepository: LectureApplyRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    lectureService = module.get<LectureServiceImpl>('LectureService');
    lectureRepository = module.get<LectureRepositoryImpl>('LectureRepository');
    lectureApplyRepository = module.get<LectureApplyRepositoryImpl>(
      'LectureApplyRepository',
    );
  });

  it('컨트롤러가 제대로 정의 되었는지?', () => {
    expect(controller).toBeDefined();
  });

  describe('특강 신청 API', () => {
    const userId = 'test1';
    const lectureId = 1;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('1. 성공', async () => {
      // mock 생성자
      const mockLectureApply = new LectureApplyDto();
      mockLectureApply.userId = userId;
      mockLectureApply.lectureId = lectureId;

      // 상태 설정: 정상적인 특강 신청
      jest
        .spyOn(lectureRepository, 'getLecture')
        .mockResolvedValue({ lectureId } as any);
      jest
        .spyOn(lectureApplyRepository, 'getLectureApply')
        .mockResolvedValue(null);
      jest
        .spyOn(lectureApplyRepository, 'setLectureApply')
        .mockResolvedValue(mockLectureApply as any);

      await expect(
        controller.setLectureApply(mockLectureApply),
      ).resolves.toBeUndefined();
    });

    it('2. 실패 - 이미 신청한 특강', async () => {
      const mockLectureApply = new LectureApplyDto();
      mockLectureApply.userId = userId;
      mockLectureApply.lectureId = lectureId;

      // 상태 설정: 사용자가 이미 신청한 상태
      jest
        .spyOn(lectureRepository, 'getLecture')
        .mockResolvedValue({ lectureId } as any);
      jest
        .spyOn(lectureApplyRepository, 'getLectureApply')
        .mockResolvedValue(mockLectureApply as any);

      await expect(
        controller.setLectureApply(mockLectureApply),
      ).rejects.toThrow('이미 등록된 특강입니다.');
    });

    it('3. 실패 - 정원 초과', async () => {
      const maxCapacity = 30;
      const mockLectureApply = new LectureApplyDto();
      mockLectureApply.userId = 'test31';
      mockLectureApply.lectureId = lectureId;

      // 상태 설정: 30명의 신청이 이미 있는 상태
      jest
        .spyOn(lectureRepository, 'getLecture')
        .mockResolvedValue({ lectureId, capacity: maxCapacity } as any);
      jest
        .spyOn(lectureApplyRepository, 'getLectureApply')
        .mockResolvedValue(null);
      jest
        .spyOn(lectureApplyRepository, 'getLectureApplyCount')
        .mockResolvedValue(maxCapacity);

      await expect(
        controller.setLectureApply(mockLectureApply),
      ).rejects.toThrow('정원이 초과되었습니다.');
    });

    it('4. 실패 - 없는 특강', async () => {
      const mockLectureApply = new LectureApplyDto();
      mockLectureApply.userId = userId;
      mockLectureApply.lectureId = 999;

      // 상태 설정: 없는 ID
      jest.spyOn(lectureRepository, 'getLecture').mockResolvedValue(null);

      await expect(
        controller.setLectureApply(mockLectureApply),
      ).rejects.toThrow('특강을 찾을 수 없습니다.');
    });
  });
});
