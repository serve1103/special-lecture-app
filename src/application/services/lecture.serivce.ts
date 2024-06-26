import { Injectable } from '@nestjs/common';
import { LectureSerivce } from '../../domain/interface/lecture.service.interface';

@Injectable()
export class LectureServiceImpl implements LectureSerivce {}
