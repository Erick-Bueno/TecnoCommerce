import Express from "express";
import upload from "../config/multer";
import { Request, Response } from "express";
import { UserController } from "./Controllers/UserController";
import { UserService } from "./services/classes/UserService";
import { UserRepository } from "./repositories/classes/UserRepository";
import { TokenRepository } from "./repositories/classes/TokenRepository";
import { AuthController } from "./Controllers/AuthController";
import { AuthService } from "./services/classes/AuthService";
import { AuthRepository } from "./repositories/classes/AuthRepository";
import { EnderRepository } from "./repositories/classes/EnderRepository";
import { EnderController } from "./Controllers/EnderController";
import { EnderService } from "./services/classes/EnderService";
import { ProductController } from "./Controllers/ProductController";
import { ProductsServices } from "./services/classes/ProductsService";
import { ProductRepository } from "./repositories/classes/ProductRepository";
import { PedidoController } from "./Controllers/PedidoController";
import {PedidoService} from "./services/classes/PedidoService"
import {PedidoRepository} from "./repositories/classes/PedidoRepository"
const router = Express.Router();

const enderrepostiroy = new EnderRepository();
const pedidoRepository = new PedidoRepository()
const tokenrepository = new TokenRepository();
const userrepository = new UserRepository(tokenrepository, enderrepostiroy);
const userService = new UserService(
  userrepository,
  tokenrepository,
  enderrepostiroy,
  pedidoRepository
);
const usercontroller = new UserController(userService);

const productRepository = new ProductRepository();
const productService = new ProductsServices(productRepository);
const productController = new ProductController(productService);

const authrepository = new AuthRepository(userrepository);
const authservice = new AuthService(
  authrepository,
  tokenrepository,
  productRepository
);
const authcontroller = new AuthController(authservice);

const enderService = new EnderService(enderrepostiroy, userrepository);
const endercontroller = new EnderController(enderService);


const pedidoService = new PedidoService(pedidoRepository)
const pedidoController = new PedidoController(pedidoService)
/*USER ROUTES ================*/

router.post("/Register", async function (req: Request, res: Response) {
  const RegisterUser = await usercontroller.Register(req, res);

  return RegisterUser;
});

router.post("/login", async function (req: Request, res: Response) {
  const LoginUser = await authcontroller.logar(req, res);
  return LoginUser;
});

router.get("/user/:id", async function (req: Request, res: Response) {
  const FindUserById = await usercontroller.FindUserById(req, res);
  return FindUserById;
});

router.put("/profile/:id", async function (req: Request, res: Response) {
  const UpdateUserById = await usercontroller.UpdateUserById(req, res);
  return UpdateUserById;
});

router.delete("/user/:id", async function (req: Request, res: Response) {
  const DeleteUserAccount = await usercontroller.DeleteUserAccount(req, res);
  return DeleteUserAccount;
});

/*ADDRESS ROUTES ================*/

router.post("/address/add/:id", async function (req: Request, res: Response) {
  const RegisterUserAddress = await endercontroller.createEnder(req, res);
  return RegisterUserAddress;
});

router.get("/addressUser/:id", async function (req: Request, res: Response) {
  const ListUserAddresses = await endercontroller.listarEnder(req, res);
  return ListUserAddresses;
});

router.delete("/address/:id", async function (req: Request, res: Response) {
  const DeleteUserAddress = await endercontroller.delEnder(req, res);
  return DeleteUserAddress;
});

router.put("/address/:id", async function (req: Request, res: Response) {
  const UpdateUserAddress = await endercontroller.attEnder(req, res);
  return UpdateUserAddress;
});

router.get("/address/:id", async function (req: Request, res: Response) {
  const FindUserAddressById = await endercontroller.FindedAddressById(req, res);
  return FindUserAddressById;
});
router.post("/jwt/verify", function (req: Request, res: Response) {
  const verifyJwt = authcontroller.verifyTokenJwt(req, res);

  return verifyJwt;
});

/*PRODUCT ROUTES ================*/

router.post(
  "/product",
  upload.single("file"),
  async function (req: Request, res: Response) {
    const RegisterProduct = await productController.createProduct(req, res);
    return RegisterProduct;
  }
);

router.get("/assessment/:id", async function(req:Request, res:Response) {
  const listAssesment = await productController.listAssesment(req, res)
  return listAssesment
})
router.post("/assessment/:id", async function(req:Request, res:Response){
  const listAssesment = await productController.listAssesmentSeeMore(req, res)
  return listAssesment
})

router.get("/productBestSeller", async function (req: Request, res: Response) {
  const FindProductBestSeller = await productController.findProduct(req, res);
});
router.get("/product/:id", async function (req, res) {
  const findedProduct = await productController.findProductById(req, res);

  return findedProduct;
});

router.post("/favoriteProducts", async function (req: Request, res: Response) {
  const CreateFavoritedProduct = await productController.CreateFavoritedProduct(
    req,
    res
  );
  return CreateFavoritedProduct;
});
router.delete(
  "/desfavoriteProducts/:id_product/:id_user",
  async function (req: Request, res: Response) {
    const desfavoriteProduct = await productController.DesfavoriteProduct(
      req,
      res
    );
    return desfavoriteProduct;
  }
);
router.get(
  "/countfavoriteproduct/:id",
  async function (req: Request, res: Response) {
    const countfavoriteproduct = await productController.countProudctfavorite(
      req,
      res
    );
    return countfavoriteproduct;
  }
);
router.get(
  "/productlistfavorited/:id",
  async function (req: Request, res: Response) {
    const listProductsFavoriteds = await productController.ProductListFavorited(
      req,
      res
    );
    return listProductsFavoriteds;
  }
);
router.post("/assessment", async function (req: Request, res: Response) {
  const CreateAssessment = await productController.createAssessmentProduct(
    req,
    res
  );
  return CreateAssessment;
});
router.get(
  "/listfourassessment/:id",
  async function (req: Request, res: Response) {
    const ListFourAssessment = await productController.ListFourAssessment(
      req,
      res
    );
    return ListFourAssessment;
  }
);
router.get("/seemore/:id/:Data", async function (req: Request, res: Response) {
  const seemore = await productController.SeeMoreAssessment(req, res);
  return seemore;
});

/*PRODUCT CART ================== */
router.post("/cart/add", async function (req: Request, res: Response) {
  const AddProductToCart = await productController.AddProductToCart(req, res);
  return AddProductToCart;
});
router.get("/cart/:id", async function (req: Request, res: Response) {
  const ListProductsInCart = await productController.ListProductsInCart(
    req,
    res
  );
  return ListProductsInCart;
});

router.post("/cart", async function (req: Request, res: Response) {
  const updateCart = await productController.PricesProductsInCart(req, res);
  return updateCart;
});
router.post("/frete", async function (req: Request, res: Response) {
  const freteprice = await productController.sumFreteTotalPrice(req, res);
  return freteprice;
});
router.post("/remove", async function (req: Request, res: Response) {
  const RemoveProductFromCart = await productController.RemoveProductFromCart(
    req,
    res
  );
  return RemoveProductFromCart;
});
router.post("/search", async function(req: Request, res: Response){
  const searchProduct = await productController.searchingProduct(
    req, 
    res
  );
  return searchProduct;
});
router.get("/products/:productName", async function (req:Request, res:Response){
  const findCountProduct = await productController.findCountProduct(req, res)
  return findCountProduct
})
router.post("/pagination", async function(req:Request, res:Response){
  const products = await productController.paginationProducts(req, res)
  return products
})
/*PEDIDO ================== */
router.post("/order", async function(req:Request, res:Response){
  const order = await pedidoController.createOrder(req, res)
  return order   
})
router.get("/order/:id", async function(req:Request, res:Response){
  const listOrder = await pedidoController.listOrder(req, res)
  return listOrder
})
router.get("/orderproducts/:id", async function(req: Request, res:Response){
  const listOrderProducts = await pedidoController.listOrderProducts(req, res)

  return listOrderProducts
})
export default router;
