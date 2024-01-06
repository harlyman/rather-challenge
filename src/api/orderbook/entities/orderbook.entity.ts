import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orderbook' })
@Index('orderbook_idx_pair', ['pair'], { fulltext: true })
export class OrderbookEntity {
  @PrimaryGeneratedColumn('uuid')
  guid: string;

  @Column({ type: 'varchar', length: 10 })
  pair: string;

  @Column({ type: 'double' })
  bidAmount: number;

  @Column({ type: 'double' })
  bidPrice: number;

  @Column({ type: 'double' })
  askAmount: number;

  @Column({ type: 'double' })
  askPrice: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  static getColumnsWithPrefix(prefix: string) {
    return [
      `${prefix}.guid`,
      `${prefix}.pair`,
      `${prefix}.bidAmount`,
      `${prefix}.bidPrice`,
      `${prefix}.askAmount`,
      `${prefix}.askPrice`,
      `${prefix}.createdAt`
    ];
  }
}
