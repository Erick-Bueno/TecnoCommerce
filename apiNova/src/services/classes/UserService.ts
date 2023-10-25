import { UserCadastroDto } from "../../Dto/UserCadastroDto";
import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { AtualizarUserDto } from "../../Dto/AtualizarUserDto";
import { DeletarUserDto } from "../../Dto/DeletarUserDto";
import { ITokenRepository } from "../../repositories/interfaces/ITokenRepository";
import { hashSync } from "bcrypt";
import SECRET from "../../secret";
import { sign } from "jsonwebtoken";
import { IEnderRepository } from "../../repositories/interfaces/IEnderRepository";
import {IPedidoRepository} from "../../repositories/interfaces/IPedidoRepository";

export class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenRepository: ITokenRepository,
    private readonly enderRepository: IEnderRepository,
    private readonly pedidoRepository: IPedidoRepository
  ) {}
  async DeleteUserAccount({ id, Email }: DeletarUserDto) {
    
    const accountDeleted = await this.userRepository.DeleteUserAccount(id);
    return accountDeleted;
  }
  async Register({ Nome, Email, Senha, cpf, Telefone }: UserCadastroDto) {
    const empty = "";
    if (
      Nome == empty ||
      Email == empty ||
      Senha == empty ||
      cpf == empty ||
      Telefone == empty
    ) {
      const emptyFields = {
        msg: "Preencha todos os campos",
        status: 405,
      };
      return emptyFields;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(Email) == false) {
      const invalidEmail = {
        msg: "Informe um email valido",
        status: 405,
      };
      return invalidEmail;
    }
    const strongPasswordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    if (strongPasswordRegex.test(Senha) == false) {
      const invalidPassword = {
        msg: "A senha deve conter ao menos um digito, uma letra maiusucula e minuscula, um caractere especial, e tamanho minimo de 8 caracteres",
        status: 405,
      };
      return invalidPassword;
    }
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

    if (cpfRegex.test(cpf) == false) {
      const invalidCpf = {
        msg: "Informe um cpf valido ex: 000.000.000-00",
        status: 405,
      };
      return invalidCpf;
    }
    const telephoneRegex = /^\([0-9]{2}\)[0-9]?[0-9]{4}-[0-9]{4}$/;
    if (telephoneRegex.test(Telefone) == false) {
      const invalidTelephone = {
        msg: "Informe um telefone valido ex:(00)00000-0000",
        status: 405,
      };
      return invalidTelephone;
    }

    let LowerCaseEmail: string = Email.toLowerCase();
    Email = LowerCaseEmail;

    let encryptPassword = hashSync(Senha, 10);
    Senha = encryptPassword;

    const UserRegistredOrNot = await this.userRepository.Registrer({
      Nome,
      Email,
      Senha,
      cpf,
      Telefone,
    });
    const UserRegistred = true;
    if (UserRegistredOrNot == UserRegistred) {
      const EmailRegistered = {
        erro: "email ja cadastrado",
        status: 404,
      };
      return EmailRegistered;
    }

    const Userid = UserRegistredOrNot.id;
    const generatedTokenJWT = sign({ Userid }, SECRET, { expiresIn: 500 });
    const Token = generatedTokenJWT;
    const data = await this.tokenRepository.CreateToken({ Email, Token });

    const resp = {
      token: Token,
      id: Userid,
      status: 200,
      Nome: Nome,
    };
    return resp;
  }
  async FindUserById(id: string) {
    const userFound = await this.userRepository.FindUserById(id);
    const userNotFound = !userFound;
    if (userNotFound) {
      const MessageUserNotFound = {
        msg: "usuaro não encontrado",
        status: 200,
      };
      return MessageUserNotFound;
    }
    return userFound;
  }
  async UpdateUserById({ Nome, Telefone, id }: AtualizarUserDto) {
    const empty = "";
    if (Nome == empty || Telefone == empty) {
      const emptyFields = {
        msg: "Preencha todos os campos",
        status: 405,
      };
      return emptyFields;
    }
    const telephoneRegex = /^\([0-9]{2}\)[0-9]?[0-9]{4}-[0-9]{4}$/;

    if (telephoneRegex.test(Telefone) == false) {
      const invalidTelephone = {
        msg: "Infome um telefone valido",
        status: 405,
      };
      return invalidTelephone;
    }
    const updatedUser = await this.userRepository.UpdateUserById({
      Nome,
      Telefone,
      id,
    });
    return updatedUser;
  }
}
