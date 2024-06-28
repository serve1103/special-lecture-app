import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LectureOrmEntity } from '../../infrastructure/orm/lecture.entity';

import { Repository } from 'typeorm';
import { LectureRepository } from '../../domain/interface/lecture.repository.interface';
import { LectureMapper } from '../mapper/lecture.mapper';
import { Lecture } from '../../domain/entities/lecture.entity';

@Injectable()
export class LectureRepositoryImpl implements LectureRepository {
  constructor(
    @InjectRepository(LectureOrmEntity)
    private readonly lectureRepository: Repository<LectureOrmEntity>,
  ) {}

  // 특강 전체 조회
  async getLectureAll(): Promise<Lecture[]> {
    const data = await this.lectureRepository.find();
    return data.map((ormEntity) => LectureMapper.toDomain(ormEntity));
  }

  // 특정 특강 조회
  async getLecture(id: number): Promise<Lecture | undefined> {
    const data = await this.lectureRepository.findOne({
      where: {
        lectureId: id,
      },
    });

    return LectureMapper.toDomain(data);
  }

  // 특강 생성
  async setLecture(lectureData: Lecture): Promise<Lecture> {
    const ormEntity = LectureMapper.toEntity(lectureData);
    const savedOrmEntity = await this.lectureRepository.save(ormEntity);
    return LectureMapper.toDomain(savedOrmEntity);
  }

  // // 특강 수정
  // async updateLecture(
  //   id: number,
  //   lectureData: LectureOrmEntity,
  // ): Promise<void> {}

  // 특강 삭제
  async delLecture(id: number): Promise<void> {
    return this.lectureRepository.delete(id).then(() => {});
  }
}
