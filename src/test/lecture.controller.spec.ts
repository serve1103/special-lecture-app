import { Test, TestingModule } from '@nestjs/testing';
import { LectureController } from '../presentation/controllers/lecture.controller';

describe('특강 컨트롤러 TC', () => {
  let controller: LectureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectureController],
    }).compile();

    controller = module.get<LectureController>(LectureController);
  });

  it('컨트롤러가 제대로 정의 되었는지?', () => {
    expect(controller).toBeDefined();
  });

  describe('특강 선택 조회', () => {
    it('1. 성공', async () => {});
  });
});
