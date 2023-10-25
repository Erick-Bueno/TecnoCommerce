import { compareSync } from "bcrypt";
import { JsonWebTokenError, sign } from "jsonwebtoken";
import { UserLoginDto } from "../../Dto/UserLoginDto";
import { IAuthRepository } from "../../repositories/interfaces/IAuthRepository";
import { ITokenRepository } from "../../repositories/interfaces/ITokenRepository";
import { IProductRepository } from "../../repositories/interfaces/IProductRepository";
import SECRET from "../../secret";
import { IAuthService } from "../interfaces/IAuthService";
import Jwt from "jsonwebtoken";
import { error } from "console";
export class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly tokenRepository: ITokenRepository,
    private readonly productRepository: IProductRepository
  ) {}
  verifyJwt(jwt: any) {
    try {
      const validatetoken = Jwt.verify(jwt, SECRET);

      return { valid: true, data: validatetoken };
    } catch (error) {
      console.log(error);
      return { valid: false, error: error };
    }
  }
  async logar({ Email, Senha }: UserLoginDto) {
    if (Email == "" || Senha == "") {
      const resp = {
        erro: "Preencha todos os campos",
        status: 405,
      };
      return resp;
    }
    Email = Email.toLowerCase();
    const log = await this.authRepository.login({ Email, Senha });
    if (log == false) {
      const resp = {
        erro: "Email não cadastrado",
        status: 405,
      };
      return resp;
    }
    const VerificarSenha = compareSync(Senha, log.Senha);
    if (VerificarSenha == false) {
      const resp = {
        erro: "Senha invalida",
        status: 405,
      };
      return resp;
    }
    const id = log.id;
    const jwt = sign({ id: id }, SECRET, { expiresIn: "2h" });
    const att = await this.tokenRepository.UpdateToken({ jwt, Email });
    const favs = await this.productRepository.countFavoriteProductsByUserId(
      log.id
    );
    const QuantityProductsInCart =
      await this.productRepository.QuantityProductsInCart(log.id);
    const listProductsFavoriteds = await this.productRepository.listUserFavoritedProducts(log.id)
    const resp = {
      token: jwt,
      id: id,
      status: 200,
      Nome: log.Nome,
      countfav: favs,
      countCart: QuantityProductsInCart,
      listProductsFavoriteds: listProductsFavoriteds
    };
    return resp;
  }
}
