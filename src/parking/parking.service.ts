import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpStatus } from '@nestjs/common';

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

  async updateCap(Query: updateCap): Promise<{status: number, message: string}> {
    
    console.log(Query);
    

    const park = await this.prismaService.parking.findUnique({
      where: {
        id: Query.id
      }
    })

    const newCap = (Query.status === "1")? park.currentCap + 1 : park.currentCap - 1;

    if (newCap < 0 || newCap > park.maxCap) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message:
          'Error: Capacity cannot be negative or exceed maximum capacity'
      };
    }
    else if (newCap > park.maxCap) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Error: Capacity cannot be negative or exceed maximum capacity',
      };
    }
    else {
      await this.prismaService.parking.update({
        where: {
          id: Query.id
        },
        data: {
          currentCap: newCap
        }
      })

      return {
        status: HttpStatus.OK,
        message: 'Successfully updated capacity'
      }
    
    }
  }
}
