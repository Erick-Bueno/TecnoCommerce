import { CreateProductDto } from "../../Dto/CreateProductDto";
import { IProductsService } from "../interfaces/IProductsService";
import { IProductRepository } from "../../repositories/interfaces/IProductRepository";
import { FavoriteProductDto } from "../../Dto/favoriteProductDto";
import { CreateAssessmentDto } from "../../Dto/CreateAssessmentDto";

import { ProductToCartDto } from "../../Dto/ProductToCartDto";

export class ProductsServices implements IProductsService {
  constructor(private readonly productRepository: IProductRepository) {}
  async listAssessmentSeeMore(idUser: string, data: string) {
    const listAssesment = await this.productRepository.listAssesmentSeeMore(idUser, data)
    return listAssesment
  }
  async listAssessment(idUser: string) {
    const listAssessment = await this.productRepository.listAssessment(idUser)
    return listAssessment
  }
  async findCountProductsByName(product_name: string) {
    const prodCount = await this.productRepository.findCountProductsByName(product_name)
    let totpages = Math.ceil(prodCount/5)
    return totpages
  }
  async paginationProduct(productName:string, currentpage: number) {
      let offset = (currentpage - 1)* 5
      let productsPagination = await this.productRepository.pagination(offset, productName)
      const productData = productsPagination.map(function(p:any){
        return{
          id: p.id,
          NomeProduto: p.NomeProduto,
          img: p.img,
          preco: Number(p.Preco).toLocaleString('pt-br',{style: 'currency', currency:'brl'}),
          promovalor: p.Enderecos && p.Enderecos.length > 0 ? Number(p.Enderecos[0].promovalor).toLocaleString("pt-br", {style:"currency", currency:"brl"}) : 0,
          fav: p.FavoritesProduct
        }
      })
      return  productData
  }
  async searchProduct(product_name: string) {
    const searchingProduct = await this.productRepository.searchProduct(
      product_name
    );
    return searchingProduct;
  }
  async removeProductFromCart(
    id_user: string,
    id_product: string,
    freteprice: number
  ) {
    const productRemovedOrNot =
      await this.productRepository.removeProductFromCart(id_user, id_product);
    if (productRemovedOrNot == false) {
      const responseFailed = {
        msg: "Falha ao deletar produto",
        status: 400,
      };
      return responseFailed;
    }
    let totalincart = await this.productRepository.PriceTotalCart(id_user);
    const formatedFreteValue = String(freteprice)
      .replace(",", ".")
      .replace("R$", "");
    if (totalincart[0].totalCart == null) {
      totalincart[0].totalCart = 0;
    }
    const ProductQuantityInCart =
      await this.productRepository.QuantityProductsInCart(id_user);
    return {
      totalincart: Number(totalincart[0].totalCart).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      }),
      newtot: (
        Number(totalincart[0].totalCart) + Number(formatedFreteValue)
      ).toLocaleString("pt-br", { style: "currency", currency: "BRL" }),
      quantiyProductInCart: ProductQuantityInCart,
    };
  }
  async freteprice(valuefrete: number, id_user: string) {
    const totalincart = await this.productRepository.PriceTotalCart(id_user);
    const formatedFreteValue = String(valuefrete).replace(",", ".");

    return {
      newtot: (
        Number(totalincart[0].totalCart) + Number(formatedFreteValue)
      ).toLocaleString("pt-br", { style: "currency", currency: "BRL" }),
      frete: Number(formatedFreteValue).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      }),
    };
  }
  async productInCartQuantityAndPrice(
    id_product: string,
    id_user: string,
    quantity: number,
    frete_price: number
  ) {
    const QuantityInStock = await this.productRepository.verifyStock(
      id_product
    );
    console.log(QuantityInStock.Quantidade);
    if (quantity < 1) {
      return {
        status: 400,
        msg: "Quantidade invalida",
      };
    }
    if (quantity > QuantityInStock.Quantidade) {
      return {
        status: 400,
        msg: "Quantidade em estoque indisponivel",
      };
    }
    const QuantityInCartUpdated =
      await this.productRepository.updateQuantityProductInCart(
        id_user,
        id_product,
        quantity
      );
    const quantitUnit = await this.productRepository.unitPriceAndTotalPrice(
      id_user,
      id_product
    );

    const PriceTotInCartUpdate = await this.productRepository.updatePriceUnit(
      quantitUnit[0].total,
      id_product,
      id_user
    );
    const totalincart = await this.productRepository.PriceTotalCart(id_user);

    const formatedFreteValue = String(frete_price)
      .replace(",", ".")
      .replace("R$", "");

    const QuantityProductInCart =
      await this.productRepository.QuantityProductsInCart(id_user);

    return {
      quantidadeUnit: Number(quantitUnit[0].total).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      }),
      totalincart: (
        Number(totalincart[0].totalCart) + Number(formatedFreteValue)
      ).toLocaleString("pt-br", { style: "currency", currency: "BRL" }),
      totnotshipping: Number(totalincart[0].totalCart).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      }),
      QuantityProductInCart: QuantityProductInCart,
      status: 200,
    };
  }
  async ProductsInCart(id_user: string) {
    const ListProductsInCart = await this.productRepository.ProductsInCart(
      id_user
    );
    if (ListProductsInCart) {
      const responseSucess = ListProductsInCart.map(function (c: any) {
        return {
          id: c.produto.id,
          ProdutoNome: c.produto.NomeProduto,
          Quantidade: c.quantidade,
          Preco: Number(c.valor_unit).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          }),
          Total: Number(c.valor_unit_total).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          }),
          img: c.produto.img,
        };
      });
      const PriceTotalCart = await this.productRepository.PriceTotalCart(
        id_user
      );

      return {
        responseSucess: responseSucess,
        priceTotalCart: Number(PriceTotalCart[0].totalCart).toLocaleString(
          "pt-br",
          { style: "currency", currency: "BRL" }
        ),
      };
    }
    const responseFailed = {
      status: 400,
    };
    return responseFailed;
  }
  async AddProductToCart({
    id_user,
    id_product,
    quantidade,
    valor_unit,
  }: ProductToCartDto) {
    const verifyproductincart =
      await this.productRepository.productExistsInCart(id_user, id_product);

    if (verifyproductincart == true) {
      const QuantityProductInCart =
        await this.productRepository.QuantityProductsInCart(id_user);
      return QuantityProductInCart._sum.quantidade;
    }
    const valor_unit_converted = valor_unit.replace("R$", "");

    const valor_R$_removed = Number(
      valor_unit_converted.replace(".", "").replace(",", ".")
    );

    const productAddedToCart = await this.productRepository.AddProductToCart(
      id_user,
      id_product,
      quantidade,
      Number(valor_R$_removed)
    );
    if (productAddedToCart == true) {
      const QuantityProductInCart =
        await this.productRepository.QuantityProductsInCart(id_user);

      return QuantityProductInCart._sum.quantidade;
    }
    const responseFailed = {
      status: 400,
    };
    return responseFailed;
  }
  async SeeMoreProduct(data: string, id_product: string) {
    //calc pagination
    const SeeMoreAssessment = await this.productRepository.SeeMoreAssessment(
      data,
      id_product
    );
    if (SeeMoreAssessment) {
      const seeMore = SeeMoreAssessment.map(function (a: any) {
        return {
          UserName: a.user.Nome,
          Comentario: a.Comentario,
          Nota: a.Nota,
          Data: a.Date,
          id: a.id,
        };
      });
      return seeMore;
    }
    const error = {
      msg: "erro ao listar avialiações",
      status: 404,
    };
    return error;
  }
  async ListFourProducAssessment(id_product: any) {
    const fourAssessment = await this.productRepository.ListFourAssessment(
      id_product
    );

    if (fourAssessment) {
      const List = fourAssessment.map(function (a: any) {
        return {
          UserName: a.user.Nome,
          Comentario: a.Comentario,
          Nota: a.Nota,
          id: a.id,
          Data: a.Date,
        };
      });

      return List;
    }
    const error = {
      msg: "não foi possivel listar as avaliações",
      status: 404,
    };
    return error;
  }
  async CreateAssessment({
    id_user,
    id_product,
    text,
    note,
  }: CreateAssessmentDto) {
    if (text == null) {
      return {
        msg: "Erro ao criar avaliação",
        status: 400,
      };
    }
    const CreateAssessmentProduct =
      await this.productRepository.CreateAssessment({
        id_user,
        id_product,
        text,
        note,
      });

    const resp = {
      msg: "Avaliação criada",
      status: 200,
      Data: CreateAssessmentProduct.Date,
    };
    return resp;
  }
  async listUserFavoritedProducts(id_user: string) {
    const listProductsFavoriteds =
      await this.productRepository.listUserFavoritedProducts(id_user);

    const productsFavorited = listProductsFavoriteds.map(function (f: any) {
      return {
        id: f.product.id,
        NomeProduto: f.product.NomeProduto,
        Preco: Number(f.product.Preco).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
        img: f.product.img,
        desc: f.product.DescProduto,
        //analisar esse ternario
        promovalor:
          f.product.Enderecos && f.product.Enderecos.length > 0
            ? Number(f.product.Enderecos[0].promovalor).toLocaleString(
                "pt-br",
                { style: "currency", currency: "BRL" }
              )
            : 0,
      };
    });

    return productsFavorited;
  }
  async desfavoriteProduct({ id_product, id_user }: FavoriteProductDto) {
    const desfavoriteProduct = await this.productRepository.desfavoriteProduct({
      id_product,
      id_user,
    });

    const count = await this.countFavoriteProductsByUserId(id_user);
    return count;
  }
  async countFavoriteProductsByUserId(id_user: string) {
    const countfavoritedProducts =
      await this.productRepository.countFavoriteProductsByUserId(id_user);
    return countfavoritedProducts;
  }
  async favoriteProduct({ id_product, id_user }: FavoriteProductDto) {
    const productFavoriteFind =
      await this.productRepository.findProductFavorited({
        id_product,
        id_user,
      });

    if (productFavoriteFind == false) {
      const productFavoritedOrNot =
        await this.productRepository.favoriteProduct({ id_product, id_user });
      if (productFavoritedOrNot == false) {
        const ErrorFavoritedProduct = {
          msg: " Erro ao favoritar produto ",
          status: " 405 ",
        };
        return ErrorFavoritedProduct;
      }
      const countFavorites = await this.countFavoriteProductsByUserId(id_user);

      return countFavorites;
    }
    //se for true e pq ja salvo no banco entt deleta favorito
    try {
      const desfavoriteProduct =
        await this.productRepository.desfavoriteProduct({
          id_product,
          id_user,
        });
      const countfavoritedProducts = await this.countFavoriteProductsByUserId(
        id_user
      );
      return countfavoritedProducts;
    } catch (error) {}
  }
  async findeProductById(id: string) {
    const findedProductOrNot = await this.productRepository.findProductById(id);

    if (findedProductOrNot == false) {
      const ProductNotFound = {
        msg: "produto não encontrado",
        status: 404,
      };
      return ProductNotFound;
    }
    const countAssessment = await this.productRepository.CountAssessmentProduct(
      id
    );

    const Preco = Number(findedProductOrNot.Preco).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    findedProductOrNot.avaliacoes = countAssessment;
    findedProductOrNot.Preco = Preco;
    findedProductOrNot.Enderecos =
      findedProductOrNot.Enderecos.length > 0
        ? Number(findedProductOrNot.Enderecos[0].promovalor).toLocaleString(
            "pt-br",
            { style: "currency", currency: "BRL" }
          )
        : 0;

    return findedProductOrNot;
  }
  async findProductBestSeller() {
    let BestSellingProductPosition: number = 0;

    const findedProducts = await this.productRepository.findProductBestSeller();

    const resp = findedProducts.map(function (d: any) {
      BestSellingProductPosition = BestSellingProductPosition + 1;

      return {
        id: d.id,
        NomeProduto: d.NomeProduto,
        Preco: Number(d.Preco).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
        img: d.img,
        vendidos: d.Vendidos,
        posicão: BestSellingProductPosition,
        //analisar esse ternario
        promovalor:
          d.Enderecos && d.Enderecos.length > 0
            ? Number(d.Enderecos[0].promovalor).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })
            : 0,
        fav: d.FavoritesProduct,
      };
    });

    return resp;
  }
  async createProduct({
    NomeProduto,
    DescProduto,
    Quantidade,
    Preco,
    src,
    Vendidos,
    Modelo,
    Marca,
  }: CreateProductDto) {
    Quantidade = Number(Quantidade);
    Vendidos = Number(Vendidos);
    Preco = Preco.replace(",", ".");

    const ProductCreatedOrNot = await this.productRepository.createProduct({
      NomeProduto,
      DescProduto,
      Quantidade,
      Preco,
      src,
      Vendidos,
      Modelo,
      Marca,
    });
  
    
    const ProductCreated = true;
    if (ProductCreatedOrNot == ProductCreated) {
      const MessageSucessProductCreated = {
        status: 200,
        msg: "Produto cadastrado com sucesso",
      };
      return MessageSucessProductCreated;
    }
    const MessageErrorProductCreate = {
      status: 400,
      msg: "erro ao criar produto",
    };
    return MessageErrorProductCreate;
  }
}
