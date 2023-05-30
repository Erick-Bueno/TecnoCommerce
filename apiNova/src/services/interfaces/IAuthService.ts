import { UserLoginDto } from "../../Dto/UserLoginDto";

export interface IAuthService {
  logar({ Email, Senha }: UserLoginDto);
  verifyJwt(jwt: string);
}
