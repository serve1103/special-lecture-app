import { Lecture } from '../../domain/entities/lecture.entity';
import { LectureOrmEntity } from '../orm/lecture.entity';

export class LectureMapper {
  static toDomain(entity: LectureOrmEntity): Lecture {
    return new Lecture(
      entity.lectureId,
      entity.lectureName,
      entity.startDate,
      entity.personnel,
    );
  }

  static toEntity(domain: Lecture): LectureOrmEntity {
    return {
      lectureId: domain.id ?? 0,
      lectureName: domain.title ?? '',
      startDate: domain.openDate ?? '',
      personnel: domain.capacity ?? 0,
    };
  }
}
