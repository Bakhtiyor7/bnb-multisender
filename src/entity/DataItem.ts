import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Upload } from "./Upload";

@Entity()
export class DataItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  recipientAddress: string;

  @Column("decimal", { precision: 18, scale: 8 })
  amount: string;

  @Column({ default: false })
  tokenAddress: string;

  @Column({ default: false })
  isDistributed: boolean; //

  @ManyToOne(() => Upload, (upload) => upload.dataItems)
  upload: Upload;
}
