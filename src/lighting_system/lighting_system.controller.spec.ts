import { Test, TestingModule } from '@nestjs/testing';
import { LightingSystemController } from './lighting_system.controller';

describe('LightingSystemController', () => {
  let controller: LightingSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LightingSystemController],
    }).compile();

    controller = module.get<LightingSystemController>(LightingSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
