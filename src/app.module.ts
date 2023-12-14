import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingController } from './parking/parking.controller';
import { ParkingService } from './parking/parking.service';
import { PrismaModule } from './prisma/prisma.module';
import { ParkingModule } from './parking/parking.module';

@Module({
  imports: [PrismaModule, ParkingModule],
  controllers: [AppController, ParkingController],
  providers: [AppService, ParkingService],
})
export class AppModule {}
