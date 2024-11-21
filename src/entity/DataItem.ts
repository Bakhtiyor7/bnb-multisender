import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Upload } from "./Upload";

@Entity()
export class DataItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recipientAddress: string;

  @Column("decimal", { precision: 65, scale: 0 })
  amount: string;

  @Column({ default: false })
  isDistributed: boolean; //

  @ManyToOne(() => Upload, (upload) => upload.dataItems)
  upload: Upload;
}
