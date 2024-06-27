import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LectureApplyRepository } from '../../domain/interface/lectureApply.repository.interface';
import { ApplyLectureOrmEntity } from '../orm/applyLecture.entity';
import { LectureApply } from '../../domain/entities/lectureApply.entity';
import { LectureApplyMapper } from '../mapper/lectureApply.mapper';

@Injectable()
export class LectureApplyRepositoryImpl implements LectureApplyRepository {
  constructor(
    @InjectRepository(ApplyLectureOrmEntity)
    private readonly lectureApplyRepository: Repository<ApplyLectureOrmEntity>,
  ) {}

  async getLectureApply(id: string): Promise<LectureApply> {
    const data = await this.lectureApplyRepository.findOne({
      where: {
        userId: id,
      },
    });

    return LectureApplyMapper.toDomain(data);
  }

  async setLectureApply(lectureApply: LectureApply): Promise<LectureApply> {
    const ormEntity = LectureApplyMapper.toEntity(lectureApply);
    const createdEntity = await this.lectureApplyRepository.save(ormEntity);
    return LectureApplyMapper.toDomain(createdEntity);
  }

  async getLectureApplyCount(lectureId: number): Promise<number> {
    return await this.lectureApplyRepository.count({
      where: { lectureId },
    });
  }
}
