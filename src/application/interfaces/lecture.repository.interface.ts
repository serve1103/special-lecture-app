import { LectureOrmEntity } from '../../infrastructure/orm/lecture.entity';

export interface LectureRepository {
  getLectureAll(): Promise<LectureOrmEntity[]>;
  getLecture(id: number): Promise<LectureOrmEntity | undefined>;
  setLecture(lectureData: Partial<LectureOrmEntity>): Promise<LectureOrmEntity>;
  updateLecture(
    id: number,
    lectureData: Partial<LectureOrmEntity>,
  ): Promise<void>;
  delLecture(id: number): Promise<void>;
}
