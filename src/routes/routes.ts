import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import DealRoutes from '@routes/deal.routes';
import Router from 'express';
import AuthRoutes from './auth.routes';
import AutomationRoutes from './automation.routes';
import MailerRoutes from './mailer.routes';
import CompanyRoutes from './company.routes';
import ContactRoutes from './contact.routes';
import PipelineRoutes from './pipeline.routes';
import FunnelRoutes from './funnel.routes';
import ProductRoutes from './product.routes';
import UserRoutes from './user.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ API: 'Terceiro Semetre' });
});

// prefix
routes.use('/auth', AuthRoutes);
routes.use('/user', UserRoutes); // middlewares estão no UserRoutes;
routes.use('/pipeline', ensureAuthenticated, PipelineRoutes);
routes.use('/automation', ensureAuthenticated, AutomationRoutes);
routes.use('/mail', ensureAuthenticated, MailerRoutes);
routes.use('/funnel', ensureAuthenticated, FunnelRoutes);
routes.use('/product', ensureAuthenticated, ProductRoutes);
routes.use('/company', ensureAuthenticated, CompanyRoutes);
routes.use('/contact', ensureAuthenticated, ContactRoutes);
routes.use('/deal', ensureAuthenticated, DealRoutes);

export default routes;
