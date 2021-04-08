export interface IEvent {
  ver: number,
  message: {
    type: string,
    data: Buffer
  }
}