import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Address } from "./addresses.entity";
import { Category } from "./categories.entity";
import { UsersToProperties } from "./usersToProperties.entity";

@Entity("properties")
class Properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => UsersToProperties,
    (usersToPorperties) => usersToPorperties.properties
  )
  userToProperties: UsersToProperties;

  @ManyToOne(() => Category, (categories) => categories.properties)
  category: Category;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}

export { Properties };
