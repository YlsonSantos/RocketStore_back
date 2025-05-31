import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProdutosService, Produto } from '../produtos/produtos.service';
import { AdicionarItemDto } from './dto/adicionar-item.dto';

export interface ProdutoCarrinho {
  produto: Produto;
  quantidade: number;
}

@Injectable()
export class CarrinhoService {
  private carrinho: ProdutoCarrinho[] = [];

  constructor(private readonly produtosService: ProdutosService) {}

  listarItens(): ProdutoCarrinho[] {
    return this.carrinho;
  }

  listarItensComTotal() {
    const itens = this.listarItens();
    const total = this.calcularTotal();
    return { itens, total };
  }

  adicionarItem(dto: AdicionarItemDto): ProdutoCarrinho {
    if (dto.quantidade <= 0) {
      throw new BadRequestException('Quantidade inválida');
    }

    const produto = this.produtosService.buscarPorId(dto.produtoId);
    if (!produto) {
      throw new BadRequestException('Produto não encontrado');
    }

    if (produto.estoque < dto.quantidade) {
      throw new BadRequestException('Estoque insuficiente');
    }

    const itemExistente = this.carrinho.find(
      (i) => i.produto.id === dto.produtoId,
    );

    if (itemExistente) {
      itemExistente.quantidade += dto.quantidade;
    } else {
      this.carrinho.push({ produto, quantidade: dto.quantidade });
    }

    produto.estoque -= dto.quantidade;

    return { produto, quantidade: dto.quantidade };
  }

  removerItem(produtoId: number): void {
    const index = this.carrinho.findIndex((i) => i.produto.id === produtoId);

    if (index === -1) {
      throw new NotFoundException('Produto não está no carrinho');
    }

    const item = this.carrinho[index];
    item.produto.estoque += item.quantidade;

    this.carrinho.splice(index, 1);
  }

  atualizarQuantidade(produtoId: number, quantidade: number): ProdutoCarrinho {
    if (quantidade <= 0) {
      throw new BadRequestException('Quantidade inválida');
    }

    const item = this.carrinho.find((i) => i.produto.id === produtoId);

    if (!item) {
      throw new NotFoundException('Produto não está no carrinho');
    }

    const diff = quantidade - item.quantidade;

    if (diff > 0 && item.produto.estoque < diff) {
      throw new BadRequestException('Estoque insuficiente');
    }

    item.produto.estoque -= diff;
    item.quantidade = quantidade;

    return item;
  }

  calcularTotal(): number {
    return this.carrinho.reduce(
      (acc, item) => acc + item.produto.preco * item.quantidade,
      0,
    );
  }

  finalizarCompra(): { mensagem: string; total: number } {
    if (this.carrinho.length === 0) {
      throw new BadRequestException('Carrinho vazio');
    }

    const total = this.calcularTotal();

    this.carrinho = [];

    return { mensagem: 'Compra finalizada com sucesso', total };
  }
}
