import { Module } from '@nestjs/common';
import { LectureController } from './presentation/controllers/lecture.controller';
import { LectureServiceImpl } from './application/services/lecture.serivce';
import { LectureService } from './application/services/lecture.service.interface';

@Module({
  controllers: [LectureController],
  providers: [
    { provide: LectureService, useClass: LectureServiceImpl },
  ],
  exports: [
    LectureService,
  ]
})
export class LectureModule {}
