import { IsNumber, IsString } from 'class-validator';

export class CreateLectureApplyDto {
  @IsString()
  lectureName: string;
  
  @IsString()
  startDate: string;

  @IsNumber()
  personnel: number;
}
