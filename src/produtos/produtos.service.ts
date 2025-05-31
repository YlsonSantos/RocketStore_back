import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { AtualizarProdutoDto } from './dto/atualizar-produto.dto';

export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
}

@Injectable()
export class ProdutosService {
  private produtos: Produto[] = [];
  private idCounter = 1;

  listarTodos(): Produto[] {
    return this.produtos;
  }

  buscarPorId(id: number): Produto {
    const produto = this.produtos.find((p) => p.id === id);
    if (!produto) throw new NotFoundException('Produto não encontrado');
    return produto;
  }

  criar(dto: CriarProdutoDto): Produto {
    const novoProduto: Produto = {
      id: this.idCounter++,
      nome: dto.nome,
      descricao: dto.descricao,
      preco: dto.preco,
      estoque: dto.estoque,
    };
    this.produtos.push(novoProduto);
    return novoProduto;
  }

  atualizar(id: number, dto: AtualizarProdutoDto): Produto {
    const produto = this.buscarPorId(id);
    Object.assign(produto, dto);
    return produto;
  }

  deletar(id: number): void {
    const index = this.produtos.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('Produto não encontrado');
    this.produtos.splice(index, 1);
  }
}
