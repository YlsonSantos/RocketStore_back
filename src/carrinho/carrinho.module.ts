import { Module } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoController } from './carrinho.controller';
import { ProdutosModule } from '../produtos/produtos.module';

@Module({
  imports: [ProdutosModule],
  providers: [CarrinhoService],
  controllers: [CarrinhoController],
})
export class CarrinhoModule {}
