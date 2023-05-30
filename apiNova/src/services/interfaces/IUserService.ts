import { AtualizarUserDto } from "../../Dto/AtualizarUserDto";
import { DeletarUserDto } from "../../Dto/DeletarUserDto";
import { UserCadastroDto } from "../../Dto/UserCadastroDto";

export interface IUserService {
  Register({ Nome, Email, Senha, cpf, Telefone }: UserCadastroDto);
  FindUserById(id: string);
  UpdateUserById({ Nome, Telefone, id }: AtualizarUserDto);
  DeleteUserAccount({ id, Email }: DeletarUserDto);
}
