import { UserLoginDto } from "../../Dto/UserLoginDto";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import { IUserRepository } from "../interfaces/IUserRepository";
export class AuthRepository implements IAuthRepository {
  constructor(private readonly userRepository: IUserRepository) {}
  async login({ Email, Senha }: UserLoginDto) {
    try {
      const VerificarEmail = await this.userRepository.FindUserByEmail(Email);

      if (!VerificarEmail) {
        return false;
      }
      return VerificarEmail;
    } catch (error) {
      return error;
    }
  }
}
