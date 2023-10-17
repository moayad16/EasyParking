import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LightingSystemService {
    constructor(private readonly prismaService: PrismaService) {}

    async getLightingInfo() {
        return this.prismaService.lighting.findMany({
            orderBy: {
                timeStamp: 'desc',
            },
            take: 1,
        });
    }
}
