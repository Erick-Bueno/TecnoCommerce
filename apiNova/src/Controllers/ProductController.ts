import { Request, Response } from "express";
import { IProductsService } from "../services/interfaces/IProductsService";

export class ProductController {
  constructor(private readonly productService: IProductsService) {}
  async createProduct(req: Request, res: Response) {
    var {
      NomeProduto,
      DescProduto,
      Quantidade,
      Preco,
      Vendidos,
      Modelo,
      Marca,
    } = req.body;
    const img = req.file;
    const src = img?.path!;
    const data = await this.productService.createProduct({
      NomeProduto,
      DescProduto,
      Quantidade,
      Preco,
      src,
      Vendidos,
      Modelo,
      Marca,
    });

    return res.send(data).status(200);
  }
  async findProduct(req: Request, res: Response) {
    const data = await this.productService.findProductBestSeller();

    return res.send(data).status(200);
  }
  async findProductById(req: Request, res: Response) {
    const id = req.params.id;

    const findedProduct = await this.productService.findeProductById(id);
    return res.json(findedProduct);
  }
  async CreateFavoritedProduct(req: Request, res: Response) {
    const { id_user, id_product } = req.body;
    const FavoritedProduct = await this.productService.favoriteProduct({
      id_product,
      id_user,
    });
    return res.json(FavoritedProduct);
  }
  async DesfavoriteProduct(req: Request, res: Response) {
    const id_user = req.params.id_user;
    const id_product = req.params.id_product;

    const desfavoriteProduct = await this.productService.desfavoriteProduct({
      id_product,
      id_user,
    });
    return res.json(desfavoriteProduct);
  }
  async countProudctfavorite(req: Request, res: Response) {
    const id_user = req.params.id;
    const countProudctfavorite =
      await this.productService.countFavoriteProductsByUserId(id_user);
    return res.json(countProudctfavorite);
  }
  async ProductListFavorited(req: Request, res: Response) {
    const id_user = req.params.id;
    const ProductListFavorited =
      await this.productService.listUserFavoritedProducts(id_user);
    return res.json(ProductListFavorited);
  }
  async createAssessmentProduct(req: Request, res: Response) {
    const { id_product, id_user, text, note } = req.body;
    const CreateAssessment = await this.productService.CreateAssessment({
      id_product,
      id_user,
      text,
      note,
    });
    return res.json(CreateAssessment);
  }
  async ListFourAssessment(req: Request, res: Response) {
    const id_product = req.params.id;
    const ListFourAssessment =
      await this.productService.ListFourProducAssessment(id_product);

    return res.json(ListFourAssessment);
  }
  async SeeMoreAssessment(req: Request, res: Response) {
    const id_product = req.params.id;
    const data = req.params.Data;
    const seeMore = await this.productService.SeeMoreProduct(data, id_product);
    return res.json(seeMore);
  }
  async AddProductToCart(req: Request, res: Response) {
    const { id_user, id_product, quantidade, valor_unit } = req.body;
    const AddProductToCart = await this.productService.AddProductToCart({
      id_user,
      id_product,
      quantidade,
      valor_unit,
    });
    return res.json(AddProductToCart);
  }
  async ListProductsInCart(req: Request, res: Response) {
    const id = req.params.id;
    const ListProductsInCart = await this.productService.ProductsInCart(id);
    return res.json(ListProductsInCart);
  }
  async PricesProductsInCart(req: Request, res: Response) {
    const { id_user, id_product, quantity, frete } = req.body;
    const PricesProductsInCart =
      await this.productService.productInCartQuantityAndPrice(
        id_product,
        id_user,
        quantity,
        frete
      );
    return res.json(PricesProductsInCart);
  }
  async sumFreteTotalPrice(req: Request, res: Response) {
    const { id_user, price } = req.body;
    const freteprice = await this.productService.freteprice(price, id_user);
    return res.json(freteprice);
  }
  async RemoveProductFromCart(req: Request, res: Response) {
    const { id_user, id_product, freteprice } = req.body;
    const productRemoved = await this.productService.removeProductFromCart(
      id_user,
      id_product,
      freteprice
    );
    return res.json(productRemoved);
  }
  async searchingProduct(req: Request, res: Response) {
    const { product_name } = req.body;
    const searchingProduct = await this.productService.searchProduct(
      product_name
    );
    return res.json(searchingProduct);
  }
}
