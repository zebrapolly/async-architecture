import { Injectable } from "@nestjs/common";
import { ICreateAccount } from "../../../domain";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository, Transaction, TransactionManager } from "typeorm";
import { AccountEntity } from "./account.entity";

@Injectable()
export class AccountStore {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly repository: Repository<AccountEntity>
  ) {}
  
  create(payload: ICreateAccount) {
    return this.repository.save(payload);
  }

  getAll(manager: EntityManager) {
    return manager.getRepository(AccountEntity)
    .createQueryBuilder("account")
    .useTransaction(true)
    .innerJoinAndSelect('account.profile', 'profile')
    .getMany()
  }

  findByProfileId(profileId: string, manager: EntityManager) {
    return manager.getRepository(AccountEntity)
      .createQueryBuilder("account")
      .useTransaction(true)
      .innerJoinAndSelect('account.profile', 'profile')
      .where('profile."publicId" = :profileId',  {profileId})
      .getOne()
  }

  decreaseBalance(id: number, value: number, manager: EntityManager) {
    return manager.getRepository(AccountEntity)
      .createQueryBuilder()
      .update()
      .set({ balance: () => `balance - ${value}` })
      .where("id = :id", { id })
      .useTransaction(true)
      .execute();
  } 

  increaseBalance(id: number, value: number, manager: EntityManager) {
    return manager.getRepository(AccountEntity)
      .createQueryBuilder()
      .update()
      .set({ balance: () => `balance + ${value}` })
      .where("id = :id", { id })
      .useTransaction(true)
      .execute();
  }
}