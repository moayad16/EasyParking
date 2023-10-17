import { Controller, Get } from '@nestjs/common';
import { LightingSystemService } from './lighting_system.service';

@Controller('lighting-system')
export class LightingSystemController {
    constructor(private readonly lightingService: LightingSystemService) {}

    @Get('/getLightingInfo')
    async getLightingInfo() {
        return this.lightingService.getLightingInfo();
    }
}
