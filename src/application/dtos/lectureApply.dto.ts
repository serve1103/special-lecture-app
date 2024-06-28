import { IsNumber, IsString } from 'class-validator';

export class LectureApplyDto {
  @IsNumber()
  lectureId: number;

  @IsString()
  userId: string;
}
