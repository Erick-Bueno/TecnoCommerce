import { CreateAssessmentDto } from "../../Dto/CreateAssessmentDto";
import { CreateProductDto } from "../../Dto/CreateProductDto";
import { ProductToCartDto } from "../../Dto/ProductToCartDto";
import { FavoriteProductDto } from "../../Dto/favoriteProductDto";

export interface IProductsService {
  createProduct({
    NomeProduto,
    DescProduto,
    Quantidade,
    Preco,
    src,
    Vendidos,
    Modelo,
    Marca,
  }: CreateProductDto);
  findProductBestSeller();
  findeProductById(id: string);
  favoriteProduct({ id_product, id_user }: FavoriteProductDto);
  countFavoriteProductsByUserId(id_user: string);
  desfavoriteProduct({ id_product, id_user }: FavoriteProductDto);
  listUserFavoritedProducts(id_user: string);
  CreateAssessment({ id_user, id_product, text, note }: CreateAssessmentDto);
  ListFourProducAssessment(id_product);
  SeeMoreProduct(data: string, id_product: string);
  AddProductToCart({
    id_user,
    id_product,
    quantidade,
    valor_unit,
  }: ProductToCartDto);
  ProductsInCart(id_user: string);
  productInCartQuantityAndPrice(
    id_product: string,
    id_user: String,
    quantity: number,
    frete: number
  );
  freteprice(valuefrete: number, id_user: String);
  removeProductFromCart(
    id_user: string,
    id_product: string,
    freteprice: number
  );
  searchProduct(product_name: string);
}
