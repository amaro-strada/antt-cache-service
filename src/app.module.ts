import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AnttCacheSchema } from 'schema/driveraux.schema';
import { AnttCacheService } from './antt-cache/antt-cache.service';
import { AnttCacheController } from './antt-cache/antt-cache.controller';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI, {
      dbName: process.env.DB_NAME,
    }),
    MongooseModule.forFeature([{ name: process.env.DB_DATABASE, schema: AnttCacheSchema }]),
    AuthModule,
    HealthModule,
  ],
  controllers: [AppController, AnttCacheController],
  providers: [AppService, AnttCacheService],
})
export class AppModule {}
