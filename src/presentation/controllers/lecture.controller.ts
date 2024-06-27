import { Controller, Get, Inject, Post } from '@nestjs/common';
import { LectureServiceImpl } from '../../application/services/lecture.serivce';
import { LectureApplyDto } from 'src/application/dtos/lectureApply.dto';

@Controller('lecture')
export class LectureController {
  constructor(
    @Inject('LectureService')
    private readonly lectureService: LectureServiceImpl,
  ) {}

  // 특강 신청 API
  @Post('/apply')
  async setLectureApply(lectureApply: LectureApplyDto) {
    return await this.lectureService.setLectureApply(lectureApply);
  }

  // 특강 목록 조회 API
  @Get('')
  async getLectureList() {
    return await this.lectureService.getLectureList();
  }

  // 특강 신청 완료 여부 조회 API
  @Get('application/:id')
  async getLectureComplet(id: string) {
    return await this.lectureService.getLectureComplete(id);
  }
}
