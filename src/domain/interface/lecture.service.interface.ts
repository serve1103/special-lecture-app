import { Lecture } from '../entities/lecture.entity';

export interface LectureSerivce {
  // 특강 신청
  setLectureApply();
  // 특강 목록
  getLectureList();
  // 특강 신청 완료 여부
  getLectureComplet();
}
