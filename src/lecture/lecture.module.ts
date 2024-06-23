import { Module } from '@nestjs/common';
import { LectureController } from './presentation/controllers/lecture.controller';
import { LectureService } from './application/services/lecture.application-service';

@Module({
  controllers: [LectureController],
  providers: [LectureService]
})
export class LectureModule {}
