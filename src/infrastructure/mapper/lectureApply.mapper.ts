import { LectureApply } from '../../domain/entities/lectureApply.entity';
import { ApplyLectureOrmEntity } from '../orm/applyLecture.entity';

export class LectureApplyMapper {
  static toDomain(entity: ApplyLectureOrmEntity): LectureApply {
    return new LectureApply(
      entity.applylectureId,
      entity.lectureId,
      entity.userId,
    );
  }

  static toEntity(domain: LectureApply): ApplyLectureOrmEntity {
    return {
      applylectureId: domain.id,
      lectureId: domain.lectureId,
      userId: domain.userId,
    };
  }
}
