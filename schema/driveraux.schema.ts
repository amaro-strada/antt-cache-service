import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class AnttCache {
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  carrierName: string;

  @Prop()
  carrierTaxId: string;

  @Prop()
  activeRntrc: boolean;

  @Prop()
  carrierRntrc: string;

  @Prop()
  licensePlate: string;

  @Prop()
  message: string;

  @Prop({ unique: true })
  protocol: string;
}

export const AnttCacheSchema = SchemaFactory.createForClass(AnttCache).index(
  { carrierTaxId: 1, carrierRntrc: 1, licensePlate: 1 },
  { unique: true },
);
