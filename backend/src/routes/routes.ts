import express from 'express';
import { UserRoutes } from '../modules/User/user.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { ShopRoutes } from '../modules/Shop/shop.routes';
import { StafRoutes } from '../modules/Staf/staf.route';
import { productRoutes } from '../modules/Products/product.route';
import { customerRoutes } from '../modules/Customer/customer.route';
import { VariantRoutes } from '../modules/Variant/variant.routes';
import { CategoryRoutes } from '../modules/Category/category.route';
import { CgRoutes } from '../modules/CustomerGroup/cg.route';
import { OrderRoutes } from '../modules/Order/order.routes';
import { suppliersRouter } from '../modules/Suppliers/suppliers.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/shop',
    route: ShopRoutes,
  },
  {
    path: '/staf',
    route: StafRoutes,
  },
  {
    path: '/product',
    route: productRoutes,
  },
  {
    path: '/customer',
    route: customerRoutes,
  },
  {
    path: '/variant',
    route: VariantRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/customerGroup',
    route: CgRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/suppliers',
    route: suppliersRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
