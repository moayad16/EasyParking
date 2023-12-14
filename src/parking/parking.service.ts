import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface Parking {
  name: string;
  lat: number;
  long: number;
  maxCap: number;
  currentCap: number;
}

interface updateCap {
  id: string;
  status: string;
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

  async updateCap(Body: updateCap): Promise<string> {
    const park = await this.prismaService.parking.findUnique({
      where: {
        id: Body.id
      }
    })

    const newCap = (Body.status === "1")? park.currentCap + 1 : park.currentCap - 1;

    if (newCap < 0 || newCap > park.maxCap) {
      return "Error: Capacity cannot be negative or exceed maximum capacity"
    }
    else if (newCap > park.maxCap) {
      return "Error: Capacity cannot exceed maximum capacity"
    }
    else {
      await this.prismaService.parking.update({
        where: {
          id: Body.id
        },
        data: {
          currentCap: newCap
        }
      })

      return "Success"
    
    }
  }
}
