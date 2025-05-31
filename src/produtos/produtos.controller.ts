import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { AtualizarProdutoDto } from './dto/atualizar-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  listarTodos() {
    return this.produtosService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.produtosService.buscarPorId(+id);
  }

  @Post()
  criar(@Body() dto: CriarProdutoDto) {
    const produto = this.produtosService.criar(dto);
    return {
      mensagem: `Produto "${produto.nome}" adicionado com sucesso`,
      produto,
    };
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() dto: AtualizarProdutoDto) {
    const produtoAtualizado = this.produtosService.atualizar(+id, dto);
    return {
      mensagem: `Produto "${produtoAtualizado.nome}" atualizado com sucesso`,
      produto: produtoAtualizado,
    };
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    const produto = this.produtosService.buscarPorId(+id);
    this.produtosService.deletar(+id);
    return { mensagem: `Produto "${produto.nome}" deletado com sucesso` };
  }
}
