import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { DataItem } from "./DataItem";

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tokenAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => DataItem, (dataItem) => dataItem.upload, { cascade: true })
  dataItems: DataItem[];
}
