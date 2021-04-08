import { Injectable } from "@nestjs/common";

@Injectable()
export class PriceService {
  getProfit() {
    return this.randomInteger(20, 40);
  }

  getFee() {
    return this.randomInteger(10, 20);
  }

  private randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
}