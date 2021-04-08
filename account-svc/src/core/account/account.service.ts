import { Injectable } from "@nestjs/common";
import { ICreateProfileEvent, IProfile } from "../../domain";
import { AccountStore } from "../../infrastructure";

@Injectable()
export class AccountService {
  constructor(
    private readonly accountStore: AccountStore,
  ) {
    
  }
  create(profile: ICreateProfileEvent) {
    return this.accountStore.create({ profile })
  }
}