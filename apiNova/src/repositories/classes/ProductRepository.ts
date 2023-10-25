import cliente from "../../../prisma/cliente";
import { CreateAssessmentDto } from "../../Dto/CreateAssessmentDto";
import { CreateProductDto } from "../../Dto/CreateProductDto";
import { ProductToCartDto } from "../../Dto/ProductToCartDto";
import { FavoriteProductDto } from "../../Dto/favoriteProductDto";
import { IProductRepository } from "../interfaces/IProductRepository";

export class ProductRepository implements IProductRepository {
  async listAssesmentSeeMore(idUser: string, data: string) {
    
    const listAssesment = await cliente.avaliacoes.findMany({
      where: { AND: [{ id_user: idUser, Date: { lt: data } }] },
      take: 4,
      orderBy:[{Date:"desc"}]
    });
    return listAssesment;
  }
  async listAssessment(idUser: string) {
    const listAssessment = await cliente.avaliacoes.findMany({
      where: { id_user: idUser },
      take: 4,
      orderBy: [{ Date: "desc" }],
    });
    return listAssessment;
  }

  async pagination(offset: number, productName: string) {
    let productsPagination = await cliente.products.findMany({
      select: {
        id: true,
        img: true,
        NomeProduto: true,
        Preco: true,
        Enderecos: {
          select: {
            promovalor: true,
          },
        },
        FavoritesProduct: {
          select: {
            id_user: true,
          },
        },
      },
      take: 5,
      skip: offset,
      where: {
        NomeProduto: {
          contains: productName,
        },
      },
    });

    return productsPagination;
  }
  async findCountProductsByName(product_name: string) {
    const countProducts = await cliente.products.count({
      where: {
        NomeProduto: {
          contains: product_name,
        },
      },
    });
    return countProducts;
  }
  async searchProduct(product_name: string) {
    const sarchingProduct = await cliente.products.findMany({
      where: {
        NomeProduto: {
          contains: product_name,
        },
      },
    });
    return sarchingProduct;
  }
  async QuantityProductsInCart(id_user: string) {
    const CountProducts = await cliente.carrinho.aggregate({
      _sum: {
        quantidade: true,
      },
      where: {
        id_user: id_user,
      },
    });

    return CountProducts;
  }
  async removeProductFromCart(id_user: string, id_product: string) {
    try {
      const removedProduct = await cliente.carrinho.deleteMany({
        where: { id_product: id_product, id_user: id_user },
      });
      return "Produto deletado do carrinho";
    } catch (error) {
      return false;
    }
  }
  async addfretevalue(
    pricefrete: number,
    id_product: string,
    id_user: string
  ) {}
  async PriceTotalCart(user_id: string) {
    const PriceTotalCart =
      await cliente.$queryRaw`Select sum(valor_unit_total) as totalCart from Carrinho where id_user = ${user_id}`;

    return PriceTotalCart;
  }
  async updatePriceUnit(price: number, id_product: string, id_user: string) {
    const UpdatePriceUnitProductInCart = await cliente.carrinho.updateMany({
      where: { id_product: id_product, id_user: id_user },
      data: { valor_unit_total: price },
    });

    return true;
  }
  async unitPriceAndTotalPrice(id_user: string, id_product: string) {
    const CartUnitPrices =
      await cliente.$queryRaw`select quantidade  * valor_unit as total from Carrinho where id_user = ${id_user} and id_product = ${id_product}`;

    return CartUnitPrices;
  }
  async updateQuantityProductInCart(
    id_user: string,
    id_product: string,
    quantidade: number
  ) {
    const UpdateQUantityProductInCart = await cliente.carrinho.updateMany({
      where: { id_product: id_product, id_user: id_user },
      data: { quantidade: quantidade },
    });

    return UpdateQUantityProductInCart;
  }
  async verifyStock(id_product: string) {
    let quantityInStock = await cliente.products.findFirst({
      select: {
        Quantidade: true,
      },
      where: { id: id_product },
    });
    return quantityInStock;
  }
  async updateQuantityProductInCartIfProductExists(
    id_user: string,
    id_product: string
  ) {
    const updateQuantity = await cliente.carrinho.updateMany({
      where: { id_product: id_product, id_user: id_user },
      data: { quantidade: { increment: 1 } },
    });
    return true;
  }
  async productExistsInCart(id_user: any, id_product: any) {
    const inCartOrNot = await cliente.carrinho.findFirst({
      where: { AND: [{ id_product: id_product, id_user: id_user }] },
    });
    if (inCartOrNot) {
      return true;
    }
    return false;
  }
  async AddProductToCart(
    id_user: string,
    id_product: string,
    quantidade: number,
    valor_unit: number
  ) {
    const productAddedToCart = await cliente.carrinho.create({
      data: {
        id_user: id_user,
        id_product: id_product,
        quantidade: quantidade,
        valor_unit: valor_unit,
        valor_unit_total: valor_unit,
      },
    });
    if (productAddedToCart) {
      return true;
    }
    return false;
  }
  async ProductsInCart(id_user: string) {
    const ListProductsInCart = await cliente.carrinho.findMany({
      select: {
        quantidade: true,
        valor_unit: true,
        valor_unit_total: true,
        produto: {
          select: {
            id: true,
            NomeProduto: true,
            img: true,
          },
        },
      },
      where: {
        id_user: id_user,
      },
    });
    if (ListProductsInCart) {
      return ListProductsInCart;
    }
    return false;
  }
  async SeeMoreAssessment(data: string, id_product: string) {
    const SeeMoreAssessment = await cliente.avaliacoes.findMany({
      select: {
        Comentario: true,
        Nota: true,
        id: true,
        Date: true,
        user: {
          select: {
            Nome: true,
          },
        },
      },
      where: { AND: [{ id_product: id_product }, { Date: { lt: data } }] },
      take: 4,

      orderBy: [{ Date: "desc" }],
    });

    return SeeMoreAssessment;
  }
  async CountAssessmentProduct(id_product: string) {
    const AssessmentProduct = await cliente.avaliacoes.findMany({
      where: { id_product: id_product },
    });
    const countAssessment = AssessmentProduct.length;
    return countAssessment;
  }
  async ListFourAssessment(id_product: string) {
    const ListFourAssessment = await cliente.avaliacoes.findMany({
      select: {
        Comentario: true,
        Nota: true,
        id: true,
        Date: true,
        user: {
          select: {
            Nome: true,
          },
        },
      },
      where: {
        id_product: id_product,
      },
      take: 4,
      orderBy: [{ Date: "desc" }],
    });

    return ListFourAssessment;
  }
  async CreateAssessment({
    id_user,
    id_product,
    text,
    note,
  }: CreateAssessmentDto) {
    try {
      const createdAssessment = await cliente.avaliacoes.create({
        data: {
          id_product: id_product,
          id_user: id_user,
          Nota: note,
          Comentario: text,
        },
      });
      if (createdAssessment) {
        return createdAssessment;
      }
      return false;
    } catch (error) {
      return error;
    }
  }
  async listUserFavoritedProducts(id_user: string) {
    const listProductsFavoriteds = await cliente.favoritos.findMany({
      select: {
        product: {
          select: {
            id: true,
            NomeProduto: true,
            DescProduto: true,
            Preco: true,
            img: true,
            Enderecos: {
              select: {
                promovalor: true,
              },
            },
          },
        },
      },
      where: {
        id_user: id_user,
      },
    });

    return listProductsFavoriteds;
  }
  async findProductFavorited({ id_product, id_user }: FavoriteProductDto) {
    const findProductFavorited = await cliente.favoritos.findFirst({
      where: { AND: [{ id_product: id_product }, { id_user: id_user }] },
    });
    if (!findProductFavorited) {
      return false;
    }
    return true;
  }

  async desfavoriteProduct({ id_product, id_user }: FavoriteProductDto) {
    const desfavoriteProduct = await cliente.favoritos.deleteMany({
      where: { AND: [{ id_product: id_product }, { id_user: id_user }] },
    });

    return desfavoriteProduct;
  }
  async countFavoriteProductsByUserId(id_user: string) {
    const countfavoritedProducts = await cliente.favoritos.findMany({
      where: { id_user: id_user },
    });
    const count = countfavoritedProducts.length;
    return count;
  }
  async favoriteProduct({ id_product, id_user }: FavoriteProductDto) {
    const AddFavoriteProduct = await cliente.favoritos.create({
      data: { id_product: id_product, id_user: id_user },
    });
    if (!AddFavoriteProduct) {
      return false;
    }
    return AddFavoriteProduct;
  }
  async findProductById(id: string) {
    const findedProduct = await cliente.products.findFirst({
      select: {
        NomeProduto: true,
        Vendidos: true,
        img: true,
        Preco: true,
        DescProduto: true,
        Enderecos: {
          select: {
            promovalor: true,
          },
        },
      },
      where: { id: id },
    });
    if (!findedProduct) {
      return false;
    }
    return findedProduct;
  }
  async findProductBestSeller() {
    try {
      const findedProducts = await cliente.products.findMany({
        take: 6,
        orderBy: [{ Vendidos: "desc" }],
        select: {
          id: true,
          NomeProduto: true,
          DescProduto: true,
          Preco: true,
          img: true,
          Vendidos: true,
          Enderecos: {
            select: {
              promovalor: true,
            },
          },
          FavoritesProduct: {
            select: {
              id_user: true,
            },
          },
        },
      });

      return findedProducts;
    } catch (error) {
      return error;
    }
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
    try {
      const createProd = await cliente.products.create({
        data: {
          NomeProduto: NomeProduto,
          DescProduto: DescProduto,
          Quantidade: Quantidade,
          Preco: Preco,
          img: src,
          Vendidos: Vendidos,
          Modelo: Modelo,
          Marca: Marca,
        },
      });

      if (createProd) {
        return true;
      }
      return false;
    } catch (error) {
      return error;
    }
  }
}
