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
  ) {}
}
