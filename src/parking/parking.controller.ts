import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { createParkDto } from './dtos/create.park.dto';

@Controller('parking')
export class ParkingController {
    constructor(private readonly parkingService: ParkingService) {}

    @Get('/getAllParkingSpots')
    async getParking() {
        console.log('getParking');
        
        return this.parkingService.getParking();
    }

    @Post('/createPark')
    async createPark(@Body() Body: createParkDto) {        
        return this.parkingService.createPark(Body);
    }

    @Get('/updateCap')
    async updateCap(@Query() info: {status: string, id: string}) {
        return this.parkingService.updateCap(info);
    }
}
