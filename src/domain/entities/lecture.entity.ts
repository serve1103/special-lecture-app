export class Lecture {
  constructor(
    // 특강 ID
    public id: number,
    // 특강 명
    public title: string,
    // 개강일시
    public openDate: string,
    // 모집정원
    public capacity: number,
    // 수강인원
    public attendees: number = 0,
  ) {}

  // 초과 여부
  isFull(): boolean {
    return this.attendees >= this.capacity;
  }

  // 수강 신청 로직
  addAttendee(): void {
    // 초과 확인
    if (this.isFull()) {
      throw new Error('정원이 초과되었습니다.');
    }
    // 수강인원 추가
    this.attendees++;
  }
}
