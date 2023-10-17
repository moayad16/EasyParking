import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingController } from './parking/parking.controller';
import { ParkingService } from './parking/parking.service';
import { PrismaModule } from './prisma/prisma.module';
import { ParkingModule } from './parking/parking.module';
import { DataProcessorService } from './data_processor/data_processor.service';
import { DataProcessorController } from './data_processor/data_processor.controller';
import { LightingSystemController } from './lighting_system/lighting_system.controller';
import { LightingSystemService } from './lighting_system/lighting_system.service';

@Module({
  imports: [PrismaModule, ParkingModule],
  controllers: [AppController, ParkingController, DataProcessorController, LightingSystemController],
  providers: [AppService, ParkingService, DataProcessorService, DataProcessorService, LightingSystemService],
})
export class AppModule {}
