import { Injectable } from '@nestjs/common';
import { LectureRepository } from '../../application/interfaces/lecture.repository.interface';
import { LectureOrmEntity } from 'src/infrastructure/orm/lecture.entity';

@Injectable()
export class LectureRepositoryImpl implements LectureRepository {
  //
  getLectureAll(): Promise<LectureOrmEntity[]> {
    throw new Error('Method not implemented.');
  }
  getLecture(id: number): Promise<LectureOrmEntity> {
    throw new Error('Method not implemented.');
  }
  setLecture(
    lectureData: Partial<LectureOrmEntity>,
  ): Promise<LectureOrmEntity> {
    throw new Error('Method not implemented.');
  }
  updateLecture(
    id: number,
    lectureData: Partial<LectureOrmEntity>,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delLecture(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
