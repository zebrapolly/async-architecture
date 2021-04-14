import { HttpService, Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { FullProfileModel } from "./profile.model";

@Injectable()
export class FullProfileService {
  private readonly route: string;
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService
  ) {
    this.route = this.configService.get<string>('AUTH_SERVICE');
  }

  async getOneById(id: string): Promise<FullProfileModel> {
    return this.httpService.get<FullProfileModel>(`${this.route}/${id}`)
      .toPromise()
      .then(res => res.data);
  }
}