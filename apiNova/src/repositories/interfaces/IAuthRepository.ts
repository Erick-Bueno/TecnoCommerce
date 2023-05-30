import { UserLoginDto } from "../../Dto/UserLoginDto";

export interface IAuthRepository {
  login({ Email, Senha }: UserLoginDto);
}
