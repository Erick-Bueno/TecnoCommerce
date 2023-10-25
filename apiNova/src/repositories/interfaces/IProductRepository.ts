import { CreateAssessmentDto } from "../../Dto/CreateAssessmentDto";
import { CreateProductDto } from "../../Dto/CreateProductDto";
import { ProductToCartDto } from "../../Dto/ProductToCartDto";
import { FavoriteProductDto } from "../../Dto/favoriteProductDto";

export interface IProductRepository {
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
  findProductById(id: string);
  favoriteProduct({ id_product, id_user }: FavoriteProductDto);
  desfavoriteProduct({ id_product, id_user }: FavoriteProductDto);
  countFavoriteProductsByUserId(id_user: string);
  findProductFavorited({ id_product, id_user }: FavoriteProductDto);
  listUserFavoritedProducts(id_user: string);
  CreateAssessment({ id_user, id_product, text, note }: CreateAssessmentDto);
  ListFourAssessment(id_product: string);
  CountAssessmentProduct(id_product: string);
  SeeMoreAssessment(data: string, id_product: string);
  ProductsInCart(id_user: string);
  AddProductToCart(
    id_user: string,
    id_product: string,
    quantidade: number,
    valor_unit: number
  );
  productExistsInCart(id_user: string, id_product: string);
  updateQuantityProductInCartIfProductExists(
    id_user: string,
    id_product: string
  );
  updateQuantityProductInCart(
    id_user: string,
    id_product: string,
    quantidade: number
  );
  verifyStock(id_product: string);
  unitPriceAndTotalPrice(id_user: string, id_product: string);
  updatePriceUnit(price: number, id_product: string, id_user: string);
  PriceTotalCart(user_id: string);
  addfretevalue(pricefrete: number, id_product: string, id_user: string);
  removeProductFromCart(id_user: string, id_product: string);
  QuantityProductsInCart(id_user: string);
  searchProduct(product_name: string);
  findCountProductsByName(product_name: string)
  pagination(offset:number, productName:string)
  listAssessment(idUser:string)
  listAssesmentSeeMore(idUser:string , data:string)
}
