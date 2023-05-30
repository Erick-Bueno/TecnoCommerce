export interface IEnderValidations {
  validatefields(Nome, Cep, Numero, Bairro, Rua, Cidade);
  CepValidation(Cep);
  ValidationNumber(Numero);
  ValidationCity(Cidade);
}
