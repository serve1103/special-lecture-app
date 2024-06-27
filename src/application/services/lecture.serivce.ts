import { Inject, Injectable } from '@nestjs/common';
import { LectureSerivce } from '../../domain/interface/lecture.service.interface';
import { LectureRepositoryImpl } from '../../infrastructure/repositories/lecture.repository.impl';
import { LectureApplyRepositoryImpl } from '../../infrastructure/repositories/lectureApply.repository.impl';
import { LectureApply } from '../../domain/entities/lectureApply.entity';
import { Lecture } from '../../domain/entities/lecture.entity';

@Injectable()
export class LectureServiceImpl implements LectureSerivce {
  constructor(
    @Inject('LectureRepository')
    private readonly lectureRepository: LectureRepositoryImpl,
    @Inject('LectureApplyRepository')
    private readonly lectureApplyRepository: LectureApplyRepositoryImpl,
  ) {}

  // 특강 신청
  async setLectureApply(lectureApply: LectureApply): Promise<void> {
    const { lectureId, userId } = lectureApply;

    const lecture = await this.lectureRepository.getLecture(lectureId);

    if (!lecture) {
      throw new Error('특강을 찾을 수 없습니다.');
    }

    const lectureHistory =
      await this.lectureApplyRepository.getLectureApply(userId);

    if (lectureHistory) {
      throw new Error('이미 등록된 특강입니다.');
    }

    await this.lectureApplyRepository.setLectureApply(lectureApply);
  }

  // 특강 목록
  async getLectureList(): Promise<Lecture[]> {
    return await this.lectureRepository.getLectureAll();
  }

  // 특강 신청 완료 여부
  async getLectureComplete(id: string): Promise<boolean> {
    const lecture = await this.lectureApplyRepository.getLectureApply(id);
    if (!lecture) {
      return false;
    } else {
      return true;
    }
  }
}
