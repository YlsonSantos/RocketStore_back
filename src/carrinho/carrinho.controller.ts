import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { AdicionarItemDto } from './dto/adicionar-item.dto';

@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}

  @Get()
  listarItens() {
    return this.carrinhoService.listarItensComTotal();
  }

  @Post('adicionar')
  adicionarItem(@Body() dto: AdicionarItemDto) {
    this.carrinhoService.adicionarItem(dto);
    const carrinho = this.carrinhoService.listarItensComTotal();
    const totalFormatado = Number(carrinho.total.toFixed(2));

    const quantidadeTotalItens = carrinho.itens.reduce(
      (total, item) => total + item.quantidade,
      0,
    );

    const carrinhoFormatado = {
      itens: carrinho.itens.map((i) => ({
        produto: {
          id: i.produto.id,
          nome: i.produto.nome,
          descricao: i.produto.descricao,
          preco: i.produto.preco,
          quantidade: i.quantidade,
        },
        quantidade: i.quantidade,
      })),
      total: totalFormatado,
      quantidadeTotalItens,
    };

    return {
      mensagem: `Produto adicionado com sucesso`,
      carrinho: carrinhoFormatado,
    };
  }

  @Put('atualizar/:produtoId')
  atualizarQuantidade(
    @Param('produtoId') produtoId: string,
    @Body() body: { quantidade: number },
  ) {
    const item = this.carrinhoService.atualizarQuantidade(
      +produtoId,
      body.quantidade,
    );
    return {
      mensagem: `Quantidade do produto ${item.produto.nome} atualizada para ${item.quantidade} com sucesso`,
      item,
      carrinho: this.carrinhoService.listarItensComTotal(),
    };
  }

  @Delete('remover/:produtoId')
  removerItem(@Param('produtoId') produtoId: string) {
    const item = this.carrinhoService
      .listarItens()
      .find((i) => i.produto.id === +produtoId);
    this.carrinhoService.removerItem(+produtoId);
    return {
      mensagem: `Produto ${item?.produto.nome} removido do carrinho com sucesso`,
      carrinho: this.carrinhoService.listarItensComTotal(),
    };
  }

  @Post('finalizar')
  finalizarCompra() {
    const resultado = this.carrinhoService.finalizarCompra();
    return {
      mensagem: resultado.mensagem,
      total: Number(resultado.total.toFixed(2)),
    };
  }

  @Get('total')
  total() {
    return { total: this.carrinhoService.calcularTotal() };
  }
}
