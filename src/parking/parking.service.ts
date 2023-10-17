import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface Parking {
  name: string;
  lat: number;
  long: number;
  maxCap: number;
  currentCap: number;
}


@Injectable()
export class ParkingService {
  constructor(private readonly prismaService: PrismaService) {}

  async getParking() {
    return this.prismaService.parking.findMany()
    .catch((error) => {
      console.log(error);
      
    });
  }

  async createPark(Body: Parking): Promise<string> {

    return this.prismaService.parking
      .create({
        data: {
          name: Body.name,
          lat: Body.lat,
          long: Body.long,
          maxCap: Body.maxCap,
          currentCap: Body.currentCap,
        },
      })
      .then((result) => {
        return `Successfully Created Park: ${result}`;
      })
      .catch((error) => {
        return `Error Creating Park: ${error}`;
      });

  }
}
