import { Body, Controller, Post } from '@nestjs/common';
import { DataProcessorService } from './data_processor.service';

@Controller('data-processor')
export class DataProcessorController {

    constructor(private readonly data_processor:DataProcessorService) {}

    @Post('/data')
    async processData(@Body() body: any) {
        return this.data_processor.processData(body);
    }

}
