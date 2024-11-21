import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { DataItem } from "./DataItem";

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tokenAddress: string;

  @Column({ default: "pending" })
  status: "pending" | "completed" | "failed"; // Enum-like for status tracking

  @Column({ nullable: true })
  transactionHash: string; // Store blockchain transaction hash

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => DataItem, (dataItem) => dataItem.upload, { cascade: true })
  dataItems: DataItem[];
}
