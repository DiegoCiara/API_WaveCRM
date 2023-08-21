import MailerController from '@controllers/MailerController'; 
import Router from 'express';

const routes = Router();

routes.get('/', MailerController.findAll);
routes.get('/:id', MailerController.findById);
routes.post('/', MailerController.create);
routes.put('/:id', MailerController.update);
routes.delete('/:id', MailerController.delete);

export default routes;