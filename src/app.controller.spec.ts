import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('obterMensagem', () => {
    it('deve retornar a mensagem esperada', () => {
      const resultado = appController.obterMensagem();
      expect(resultado).toBe('Hello World!');
    });

    it('deve tratar erro corretamente', () => {
      try {
        throw new Error('Erro simulado');
      } catch (error) {
        const err = error as Error;
        expect(err.message).toBe('Erro simulado');
      }
    });
  });
});
