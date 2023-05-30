import { AtualizarUserDto } from "../../Dto/AtualizarUserDto";
import { DeletarUserDto } from "../../Dto/DeletarUserDto";
import { UserCadastroDto } from "../../Dto/UserCadastroDto";

export interface IUserRepository {
  Registrer({ Nome, Email, Senha, cpf, Telefone }: UserCadastroDto);
  FindUserByEmail(email: string);
  FindUserById(id: string);
  UpdateUserById({ Nome, Telefone, id }: AtualizarUserDto);
  DeleteUserAccount(id: string);
}
