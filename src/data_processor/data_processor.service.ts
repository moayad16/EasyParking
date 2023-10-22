import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DataProcessorService {
  constructor(private readonly prismaService: PrismaService) {}

  async processData(body: any) {

    console.log(body);
    

    for (const dataObj in body) {
      const park = body[dataObj].Parking;
      const lightingInfo = {
        timeStamp: body[dataObj].TimeStamp,
        Temperature: body[dataObj].Tempreture,
        Humidity: body[dataObj].Humidity,
        heatIndex: body[dataObj].HeatIndex,
        brightness: body[dataObj].LedBrightness,
      };

      if (park != null && park.status === 1) {
        await this.prismaService.parking.update({
          where: {
            id: park.id,
          },
          data: {
            currentCap: await this.prismaService.parking
              .findUnique({
                where: {
                  id: park.id,
                },
              })
              .then((result) => {
                return result.currentCap - 1;
              }),
          },
        });
      }

      const brightness = isNaN(lightingInfo.brightness) ? 100 : parseInt(lightingInfo.brightness);
      console.log("_____________________________________________________________________________");
      console.log(brightness);
      console.log("_____________________________________________________________________________");
      
      if (!isNaN(lightingInfo.timeStamp))
        await this.prismaService.lighting.create({
          data: {
            timeStamp: new Date(lightingInfo.timeStamp).toISOString(),
            Temperature: parseFloat(lightingInfo.Temperature) ?? 0,
            Humidity: parseFloat(lightingInfo.Humidity) ?? 0,
            heatIndex: parseFloat(lightingInfo.heatIndex) ?? 0,
            brightness: brightness,
          },
        });
    }

    return 'Success';
  }
}
