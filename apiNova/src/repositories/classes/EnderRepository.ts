import cliente from "../../../prisma/cliente";
import { atualizarEnderDto } from "../../Dto/AtualizarEnderDto";
import { EnderCadastroDto } from "../../Dto/EnderCadastroDto";
import { IEnderRepository } from "../interfaces/IEnderRepository";

export class EnderRepository implements IEnderRepository {
  async FindAddressById(id: string) {
    try {
      const FindedAddress = await cliente.enderecos.findFirst({
        where: { id: id },
      });

      if (!FindedAddress) {
        return false;
      }
      return FindedAddress;
    } catch (error) {
      return error;
    }
  }
  async atualizarEnder(
    { Nome, Cep, Numero, Bairro, Rua, Cidade }: atualizarEnderDto,
    id: string
  ) {
    try {
      const data = await cliente.enderecos.update({
        where: { id: id },
        data: {
          Nome: Nome,
          Cep: Cep,
          Numero: Numero,
          Bairro: Bairro,
          Rua: Rua,
          Cidade: Cidade,
        },
      });
      const resp = {
        status: 200,
        msg: "Endereço atualizado",
      };
      return resp;
    } catch (error) {
      return error;
    }
  }
  async listarEnder(id: string) {
    try {
      const data = await cliente.enderecos.findMany({
        where: { idUsuario: id },
      });
      const resp = data.map(function (e) {
        return {
          id: e.id,
          Nome: e.Nome,
          Bairro: e.Bairro,
          Numero: e.Numero,
          Cep: e.Cep,
          Rua: e.Rua,
          Cidade: e.Cidade,
        };
      });
      return resp;
    } catch (error) {
      return error;
    }
  }
  async deletarEnder(id: string) {
    try {
      const data = await cliente.enderecos.delete({ where: { id: id } });
      return "endereço deletado";
    } catch (error) {
      return error;
    }
  }

  async deletarAccount(id: string) {
    try {
      const data = await cliente.enderecos.deleteMany({
        where: { idUsuario: id },
      });

      return data;
    } catch (error) {
      return error;
    }
  }
  async adicionarEnder({
    idUsuario,
    Nome,
    Cep,
    Numero,
    Bairro,
    Rua,
    Cidade,
  }: EnderCadastroDto) {
    try {
      const data = await cliente.enderecos.create({
        data: {
          idUsuario: idUsuario,
          Nome: Nome,
          Cep: Cep,
          Numero: Numero,
          Bairro: Bairro,
          Rua: Rua,
          Cidade: Cidade,
        },
      });

      const resp = {
        msg: "Endereço cadastrado",
        status: 200,
      };
      return resp;
    } catch (error) {
      return error;
    }
  }
}
