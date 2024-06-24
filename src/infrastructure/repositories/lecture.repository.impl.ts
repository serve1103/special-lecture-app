import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LectureOrmEntity } from '../../infrastructure/orm/lecture.entity';
import { LectureRepository } from '../../application/interfaces/lecture.repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class LectureRepositoryImpl implements LectureRepository {
  constructor(
    @InjectRepository(LectureOrmEntity)
    private readonly lectureRepository: Repository<LectureOrmEntity>,
  ) {}
  // 특강 전체 조회
  getLectureAll(): Promise<LectureOrmEntity[]> {
    return this.lectureRepository.find();
  }

  // 특정 특강 조회
  getLecture(id: number): Promise<LectureOrmEntity | undefined> {
    return this.lectureRepository.findOne({
      where: {
        lectureId: id,
      },
    });
  }

  // 특강 생성
  setLecture(
    lectureData: Partial<LectureOrmEntity>,
  ): Promise<LectureOrmEntity> {
    const lecture = this.lectureRepository.create(lectureData);
    return this.lectureRepository.save(lecture);
  }

  // 특강 수정
  updateLecture(
    id: number,
    lectureData: Partial<LectureOrmEntity>,
  ): Promise<void> {
    return this.lectureRepository.update(id, lectureData).then(() => {});
  }

  // 특강 삭제
  delLecture(id: number): Promise<void> {
    return this.lectureRepository.delete(id).then(() => {});
  }
}
