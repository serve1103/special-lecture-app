/**
 * 정원 30명인 토요일 특강을 신청할 수 있어야한다.
 * 1. 특강의 이름이 필요
 * 2. 특강이 언제 열리는지 필요
 * 3. 인원 제한을 위한 인원 수 필요
 * 4. 특강을 신청할 유저가 필요하다
 *
 * 특강의 구조 특강ID, 특강명, 개강일시, 정원
 * 유저의 구조 userId, userName
 *
 * 어떤 특강에 어떤 유저가 들어와있는지 확인하는 리스트 필요.
 * 신청현황의 구조 특강ID, 유저ID, 모집정원, 모집순번
 *
 *
 */
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class LectureOrmEntity {
  @PrimaryColumn()
  lectureId: number;

  @PrimaryColumn()
  lectureName: string;

  @Column()
  startDate: string;

  @Column()
  personnel: number;
}
