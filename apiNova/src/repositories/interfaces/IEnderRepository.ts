import { atualizarEnderDto } from "../../Dto/AtualizarEnderDto";
import { EnderCadastroDto } from "../../Dto/EnderCadastroDto";

export interface IEnderRepository {
  listarEnder(id: string);
  deletarAccount(id: string);
  adicionarEnder({
    idUsuario,
    Nome,
    Cep,
    Numero,
    Bairro,
    Rua,
    Cidade,
  }: EnderCadastroDto);
  deletarEnder(id: string);
  atualizarEnder(
    { Nome, Cep, Numero, Bairro, Rua, Cidade }: atualizarEnderDto,
    id: string
  );
  FindAddressById(id: string);
}
