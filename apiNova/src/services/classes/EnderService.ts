import { atualizarEnderDto } from "../../Dto/AtualizarEnderDto";
import { EnderCadastroDto } from "../../Dto/EnderCadastroDto";
import { IEnderRepository } from "../../repositories/interfaces/IEnderRepository";
import { IEnderService } from "../interfaces/IEnderService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { IEnderValidations } from "../../../validations/IEnderValidations";

export class EnderService implements IEnderService, IEnderValidations {
  constructor(
    private readonly enderRepository: IEnderRepository,
    private readonly UserRepository: IUserRepository
  ) {}
  validatefields(
    Nome: any,
    Cep: any,
    Numero: any,
    Bairro: any,
    Rua: any,
    Cidade: any
  ) {
    if (
      Nome == "" ||
      Cep == "" ||
      Numero == "" ||
      Bairro == "" ||
      Rua == "" ||
      Cidade == ""
    ) {
      const resp = {
        msg: "Preencha todos os campos",
        status: 405,
      };
      return resp;
    }
  }
  CepValidation(Cep: any) {
    const cep = /^[0-9]{5}-[0-9]{3}$/;

    if (cep.test(Cep) == false) {
      const resp = {
        msg: "Informe um cep valido",
        status: 405,
      };
      return resp;
    }
  }
  ValidationNumber(Numero: any) {
    const numero = /^[0-9]*$/;
    if (numero.test(Numero) == false) {
      const resp = {
        msg: "Informe um numero valido",
        status: 405,
      };
      return resp;
    }
  }
  ValidationCity(Cidade: any) {
    const cidade = /[A-Za-z]*/;
    if (cidade.test(Cidade) == false) {
      const resp = {
        msg: "Infome uma cidade valida",
        status: 405,
      };
      return resp;
    }
  }
  async FindedAddressById(id: string) {
    const FindedAddressOrNot = await this.enderRepository.FindAddressById(id);

    const NotFindedAddress = false;
    if (FindedAddressOrNot != NotFindedAddress) {
      const FindedAddressData = {
        Nome: FindedAddressOrNot.Nome,
        Cep: FindedAddressOrNot.Cep,
        Numero: FindedAddressOrNot.Numero,
        Bairro: FindedAddressOrNot.Bairro,
        Rua: FindedAddressOrNot.Rua,
        Cidade: FindedAddressOrNot.Cidade,
      };
      return FindedAddressData;
    }
    const NotFindedAdrress = {
      msg: "endereço não encontrado",
      status: 400,
    };
    return NotFindedAdrress;
  }
  async UpdateAdress(
    { Nome, Cep, Numero, Bairro, Rua, Cidade }: atualizarEnderDto,
    id: string
  ) {
    //organizar validação em outra interface
    const errors = [
      this.validatefields(Nome, Cep, Numero, Bairro, Rua, Cidade),
      this.ValidationCity(Cidade),
      this.ValidationNumber(Numero),
      this.CepValidation(Cep),
    ].filter((erro) => erro != null);

    if (errors.length > 0) {
      return errors[0];
    }
    const data = await this.enderRepository.atualizarEnder(
      { Nome, Cep, Numero, Bairro, Rua, Cidade },
      id
    );
    return data;
  }
  async DeleteAddress(id: string) {
    const data = await this.enderRepository.deletarEnder(id);
    return data;
  }
  async FindAllAddress(id: string) {
    const data = await this.enderRepository.listarEnder(id);
    return data;
  }
  async CreateAddress({
    idUsuario,
    Nome,
    Cep,
    Numero,
    Bairro,
    Rua,
    Cidade,
  }: EnderCadastroDto) {
    const errors = [
      this.validatefields(Nome, Cep, Numero, Bairro, Rua, Cidade),
      this.ValidationCity(Cidade),
      this.ValidationNumber(Numero),
      this.CepValidation(Cep),
    ].filter((erro) => erro != null);

    if (errors.length > 0) {
      return errors[0];
    }
    const verifiedUserId = await this.UserRepository.FindUserById(idUsuario);

    if (verifiedUserId == false) {
      const ErrorUserNoExist = {
        msg: "usuario não encontrado",
        status: 405,
      };
      return ErrorUserNoExist;
    }
    const data = await this.enderRepository.adicionarEnder({
      idUsuario,
      Nome,
      Cep,
      Numero,
      Bairro,
      Rua,
      Cidade,
    });
    return data;
  }
}
