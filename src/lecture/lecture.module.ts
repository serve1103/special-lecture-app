import { Module } from '@nestjs/common';
import { LectureController } from './presentation/controllers/lecture.controller';
import { LectureServiceImpl } from './application/services/lecture.serivce';

@Module({
  controllers: [LectureController],
  providers: [{ provide: 'LectureService', useClass: LectureServiceImpl }],
})
export class LectureModule {}
