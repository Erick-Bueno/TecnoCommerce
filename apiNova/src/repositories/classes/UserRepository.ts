import { UserCadastroDto } from "../../Dto/UserCadastroDto";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";

import cliente from "../../../prisma/cliente";

import { ITokenRepository } from "../interfaces/ITokenRepository";
import { AtualizarUserDto } from "../../Dto/AtualizarUserDto";
import { IEnderRepository } from "../interfaces/IEnderRepository";
import { DeletarUserDto } from "../../Dto/DeletarUserDto";

export class UserRepository implements IUserRepository {
  constructor(
    private readonly tokenRepository: ITokenRepository,
    private readonly enderRepository: IEnderRepository
  ) {}
  async DeleteUserAccount(id: string) {
      const deletarAccount = await cliente.$transaction(async(tx)=>{
        const user = await tx.users.delete({where:{id:id}});
        const pedidos = await tx.pedido.deleteMany({where:{userId:id}})
        const enderecos = await tx.enderecos.deleteMany({where:{idUsuario:id}})
        const itempedidos = await tx.itemPedido.deleteMany({where:{pedido:{userId:id}}})
        const avaliacoes = await tx.avaliacoes.deleteMany({where:{id_user:id}})
        const favoritos = await tx.favoritos.deleteMany({where:{id_user:id}})
        const carrinho = await tx.favoritos.deleteMany({where:{id_user:id}})
      })
      return deletarAccount;
  }
  async Registrer({ Nome, Email, Senha, cpf, Telefone }: UserCadastroDto) {
    try {
      const FindUserEmail = await cliente.users.findFirst({
        where: { Email: Email },
      });
      if (FindUserEmail) {
        return true;
      }

      const savedados = await cliente.users.create({
        data: {
          Nome: Nome,
          Email: Email,
          Senha: Senha,
          cpf: cpf,
          Telefone: Telefone,
        },
      });

      return savedados;
    } catch (error) {
      return error;
    }
  }
  async FindUserByEmail(email: string) {
    try {
      const dado = await cliente.users.findFirst({ where: { Email: email } });

      return dado;
    } catch (error) {
      return error;
    }
  }
  async FindUserById(id: string) {
    try {
      const dado = await cliente.users.findFirst({ where: { id: id } });
      if (!dado) {
        return false;
      }
      return { dado };
    } catch (error) {
      return error;
    }
  }
  async UpdateUserById({ Nome, Telefone, id }: AtualizarUserDto) {
    try {
      const ID = id;
      const data = await cliente.users.update({
        where: { id: id },
        data: { Nome: Nome, Telefone: Telefone },
      });

      const resp = {
        msg: "Dados atualizados com sucesso",
        status: 200,
      };
      return resp;
    } catch (error) {
      return error;
    }
  }
}
