import { LectureApply } from '../entities/lectureApply.entity';

export interface LectureApplyRepository {
  getLectureApply(id: string): Promise<LectureApply>;
  setLectureApply(lectureApply: LectureApply): Promise<LectureApply>;
}
