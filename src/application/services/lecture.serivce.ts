import { Inject, Injectable } from '@nestjs/common';
import { LectureSerivce } from '../../domain/interface/lecture.service.interface';
import { LectureRepositoryImpl } from '../../infrastructure/repositories/lecture.repository.impl';
import { LectureApplyRepositoryImpl } from '../../infrastructure/repositories/lectureApply.repository.impl';
import { LectureApply } from '../../domain/entities/lectureApply.entity';
import { Lecture } from '../../domain/entities/lecture.entity';
import { OptimisticLockVersionMismatchError } from 'typeorm';

@Injectable()
export class LectureServiceImpl implements LectureSerivce {
  private readonly MAX_RETRIES = 5;

  constructor(
    @Inject('LectureRepository')
    private readonly lectureRepository: LectureRepositoryImpl,
    @Inject('LectureApplyRepository')
    private readonly lectureApplyRepository: LectureApplyRepositoryImpl,
  ) {}

  // 특강 신청
  async setLectureApply(lectureApply: LectureApply): Promise<void> {
    let retryCount = 0;
    while (retryCount < this.MAX_RETRIES) {
      try {
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

        // 해당 특강의 현재 신청자 수 확인
        const applyCount =
          await this.lectureApplyRepository.getLectureApplyCount(lectureId);
        if (applyCount >= lecture.capacity) {
          throw new Error('정원이 초과되었습니다.');
        }

        await this.lectureApplyRepository.setLectureApply(lectureApply);
      } catch (error) {
        if (error instanceof OptimisticLockVersionMismatchError) {
          retryCount++;
          if (retryCount >= this.MAX_RETRIES) {
            throw new Error(
              'Failed to apply for lecture after multiple retries',
            );
          }
        } else {
          throw error;
        }
      }
    }
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
