import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { createParkDto } from './dtos/create.park.dto';

@Controller('parking')
export class ParkingController {
    constructor(private readonly parkingService: ParkingService) {}

    @Get('/getAllParkingSpots')
    async getParking() {
        return this.parkingService.getParking();
    }

    @Post('/createPark')
    async createPark(@Body() Body: createParkDto) {        
        return this.parkingService.createPark(Body);
    }

    @Get('/updateCap')
    async updateCap(@Query() id: string, @Query() status: string) {
        return this.parkingService.updateCap({id, status});
    }
}
