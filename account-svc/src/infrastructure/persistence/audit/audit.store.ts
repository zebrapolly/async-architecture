import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, EntityManager } from "typeorm";
import { AuditEntity } from "./audit.entity";
import { ICreateAudit } from '../../../domain';

@Injectable()
export class AuditStore {
  constructor(
    @InjectRepository(AuditEntity)
    private readonly repository: Repository<AuditEntity>
  ) {}
  
  create(payload: ICreateAudit, manager: EntityManager ) {
    return manager.getRepository(AuditEntity).save(payload)
  }
}