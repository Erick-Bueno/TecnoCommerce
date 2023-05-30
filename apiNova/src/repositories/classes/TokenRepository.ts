import cliente from "../../../prisma/cliente";
import { AtualizarJwtDto } from "../../Dto/AtualizarJwtDto";
import { TokenCadastroDto } from "../../Dto/TokenCadastroDto";
import { ITokenRepository } from "../interfaces/ITokenRepository";

export class TokenRepository implements ITokenRepository {
  async DeleteToken(Email: string) {
    try {
      const deletedUserToken = await cliente.tokens.deleteMany({
        where: { Email: Email },
      });
    } catch (error) {
      return error;
    }
  }
  async CreateToken({ Email, Token }: TokenCadastroDto) {
    try {
      const CreatedUserToken = await cliente.tokens.create({
        data: {
          Email: Email,
          Token: Token,
        },
      });
      return CreatedUserToken;
    } catch (error) {
      return error;
    }
  }
  async UpdateToken({ jwt, Email }: AtualizarJwtDto) {
    try {
      const UpdatedUserToken = await cliente.tokens.updateMany({
        where: { Email: Email },
        data: { Token: jwt },
      });
      return;
    } catch (error) {
      return error;
    }
  }
}
