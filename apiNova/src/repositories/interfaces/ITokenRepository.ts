import { AtualizarJwtDto } from "../../Dto/AtualizarJwtDto";
import { TokenCadastroDto } from "../../Dto/TokenCadastroDto";

export interface ITokenRepository {
  CreateToken({ Email, Token }: TokenCadastroDto);
  UpdateToken({ jwt, Email }: AtualizarJwtDto);
  DeleteToken(Email: string);
}
