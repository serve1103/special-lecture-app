import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureController } from './presentation/controllers/lecture.controller';
import { LectureRepositoryImpl } from './infrastructure/repositories/lecture.repository.impl';
import { LectureOrmEntity } from './infrastructure/orm/lecture.entity';
import { ApplyLectureOrmEntity } from './infrastructure/orm/applyLecture.entity';
import { LectureServiceImpl } from './application/services/lecture.serivce';
import { LectureApplyRepositoryImpl } from './infrastructure/repositories/lectureApply.repository.impl';


@Module({
  imports: [
    TypeOrmModule.forFeature([LectureOrmEntity, ApplyLectureOrmEntity]),
  ],
  controllers: [LectureController],
  providers: [
    {
      provide: 'LectureService',
      useClass: LectureServiceImpl,
    },
    {
      provide: 'LectureRepository',
      useClass: LectureRepositoryImpl,
    },
    {
      provide: 'LectureApplyRepository',
      useClass: LectureApplyRepositoryImpl,
    },
  ],
  exports: ['LectureService', 'LectureRepository', 'LectureApplyRepository'],
})
export class LectureModule {}
