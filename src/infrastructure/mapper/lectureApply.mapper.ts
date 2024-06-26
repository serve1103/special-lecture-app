import { LectureApply } from '../../domain/entities/lectureApply.entity';
import { ApplyLectureOrmEntity } from '../orm/applyLecture.entity';

export class LectureApplyMapper {
  static toDomain(entity: ApplyLectureOrmEntity): LectureApply {
    return new LectureApply(
      entity.lectureId,
      entity.userId,
    );
  }

  static toEntity(domain: LectureApply): ApplyLectureOrmEntity {
    return {
      lectureId: domain.lectureId,
      userId: domain.userId,
      applylectureId: domain.applyLecture,
    };
  }
}
