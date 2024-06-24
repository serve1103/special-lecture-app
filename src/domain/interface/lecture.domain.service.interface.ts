import { Lecture } from '../entities/lecture.entity';

export interface LectureDomainSerivce {
  // 검증 서비스
  validateLecture(lecture: Lecture): void;
}
