import { Lecture } from '../../infrastructure/orm/lecture.entity';

export interface LectureRepository {
  getLectureAll(): Promise<Lecture[]>;
  getLecture(id: number): Promise<Lecture | undefined>;
  setLecture(lectureData: Partial<Lecture>): Promise<Lecture>;
  updateLecture(id: number, lectureData: Partial<Lecture>): Promise<void>;
  delLecture(id: number): Promise<void>;
}
