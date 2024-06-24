import { Injectable } from '@nestjs/common';
import { LectureDomainSerivce } from '../interface/lecture.domain.service.interface';
import { Lecture } from '../entities/lecture.entity';

@Injectable()
export class LectureDomainSerivceImpl implements LectureDomainSerivce {
  validateLecture(lecture: Lecture): void {
    if (lecture.openDate < new Date().toString())
      throw new Error('오픈되지 않은 강의입니다.');
  }
}
