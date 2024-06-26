import { Lecture } from '../entities/lecture.entity';
import { LectureApply } from '../entities/lectureApply.entity';

export interface LectureSerivce {
  // 특강 신청
  setLectureApply(lectureApply: LectureApply): Promise<void>;
  // 특강 목록 조회
  getLectureList(): Promise<Lecture[]>;
  // 특강 신청 완료 여부 조회
  getLectureComplete(userId: string): Promise<boolean>;
}
