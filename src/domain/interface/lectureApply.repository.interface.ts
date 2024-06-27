import { LectureApply } from '../entities/lectureApply.entity';

export interface LectureApplyRepository {
  // 유저가 어떤 특강을 듣고있는지 확인
  getLectureApply(id: string): Promise<LectureApply>;
  // 특강 히스토리 저장
  setLectureApply(lectureApply: LectureApply): Promise<LectureApply>;
  // 특정 특강에 몇명이 듣고있는지 확인
  getLectureApplyCount(lectureId: number): Promise<Number>;
}
