import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Upload } from "./Upload";

@Entity()
export class DataItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recipientAddress: string;

  @Column()
  amount: string;

  @ManyToOne(() => Upload, (upload) => upload.dataItems)
  upload: Upload;
}
