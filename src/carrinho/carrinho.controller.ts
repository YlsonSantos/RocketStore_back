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
    const carrinho = this.carrinhoService.listarItensComTotal();
    const totalFormatado = Number(carrinho.total.toFixed(2));

    const carrinhoFormatado = {
      itens: carrinho.itens.map((i) => ({
        produto: {
          id: i.produto.id,
          nome: i.produto.nome,
          descricao: i.produto.descricao,
          preco: i.produto.preco,
        },
        quantidade: i.quantidade,
      })),
      total: totalFormatado,
    };

    return carrinhoFormatado;
  }

  @Get('carrinho')
  mostrarCarrinhoCompleto() {
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
        },
        quantidade: i.quantidade,
      })),
      total: totalFormatado,
      quantidadeTotalItens,
    };

    return carrinhoFormatado;
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
        },
        quantidade: i.quantidade,
      })),
      total: totalFormatado,
      quantidadeTotalItens,
    };

    return {
      mensagem: `Produto adicionado ao carrinho com sucesso`,
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

    const itemFormatado = {
      produto: {
        id: item.produto.id,
        nome: item.produto.nome,
        descricao: item.produto.descricao,
        preco: item.produto.preco,
      },
      quantidade: item.quantidade,
    };

    const carrinho = this.carrinhoService.listarItensComTotal();
    const totalFormatado = Number(carrinho.total.toFixed(2));

    const carrinhoFormatado = {
      itens: carrinho.itens.map((i) => ({
        produto: {
          id: i.produto.id,
          nome: i.produto.nome,
          descricao: i.produto.descricao,
          preco: i.produto.preco,
        },
        quantidade: i.quantidade,
      })),
      total: totalFormatado,
    };

    return {
      mensagem: `Quantidade do produto ${itemFormatado.produto.nome} atualizada para ${itemFormatado.quantidade} com sucesso`,
      item: itemFormatado,
      carrinho: carrinhoFormatado,
    };
  }

  @Delete('remover/:produtoId')
  removerItem(@Param('produtoId') produtoId: string) {
    const item = this.carrinhoService
      .listarItens()
      .find((i) => i.produto.id === +produtoId);
    this.carrinhoService.removerItem(+produtoId);

    const carrinho = this.carrinhoService.listarItensComTotal();
    const totalFormatado = Number(carrinho.total.toFixed(2));

    const carrinhoFormatado = {
      itens: carrinho.itens.map((i) => ({
        produto: {
          id: i.produto.id,
          nome: i.produto.nome,
          descricao: i.produto.descricao,
          preco: i.produto.preco,
        },
        quantidade: i.quantidade,
      })),
      total: totalFormatado,
    };

    return {
      mensagem: `Produto ${item?.produto.nome} removido do carrinho com sucesso`,
      carrinho: carrinhoFormatado,
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
