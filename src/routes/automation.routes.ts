import AutomationController from '@controllers/AutomationController'; 
import Router from 'express';

const routes = Router();

routes.get('/', AutomationController.findAll);
routes.get('/:id', AutomationController.findById);
routes.post('/', AutomationController.create);
routes.put('/:id', AutomationController.update);
routes.delete('/:id', AutomationController.delete);

export default routes;