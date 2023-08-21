import FunnelController from '@controllers/FunnelController';
import Router from 'express';

const routes = Router();

routes.get('/', FunnelController.findAll);
routes.get('/:id', FunnelController.findById);
routes.post('/', FunnelController.create);
routes.put('/:id', FunnelController.update);
routes.delete('/:id', FunnelController.delete);

export default routes;
