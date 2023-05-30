import { atualizarEnderDto } from "../../Dto/AtualizarEnderDto";
import { EnderCadastroDto } from "../../Dto/EnderCadastroDto";

export interface IEnderService {
  CreateAddress({
    idUsuario,
    Nome,
    Cep,
    Numero,
    Bairro,
    Rua,
    Cidade,
  }: EnderCadastroDto);
  FindAllAddress(id: String);
  DeleteAddress(id: string);
  UpdateAdress(
    { Nome, Cep, Numero, Bairro, Rua, Cidade }: atualizarEnderDto,
    id: string
  );
  FindedAddressById(id: string);
}
