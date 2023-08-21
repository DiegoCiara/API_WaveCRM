import { Request, Response } from 'express';
import Deal from '@entities/Deal';
import queryBuilder from '@utils/queryBuilder';
import Mailer from '@entities/Mailer';

interface MailerInterface {
  id?: string;
  subject?: string;
  title?: string;
  template?: string;
  text?: string;
  color?: string;
}

class MailerController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {

      const { subject, text, title, template, color }: MailerInterface = req.body;

      if (!subject || !text || !title || !template || !color) return res.status(400).json({ message: 'Invalid value for Mailer' });

      const existsMailer = await Mailer.findOne({ subject });

      if (existsMailer) return res.status(400).json({ message: 'Mailer already exists' });

      const mailer = await Mailer.create({ subject, text, title, template, color }).save();

      return res.status(201).json({id: mailer.id, message: 'Mailer created successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Create failed, try again' });
    }
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const mailer = await Mailer.find(queryBuilder(req.query));
      if (!mailer) return res.status(400).json({ error: 'Cannot find Mailers.' });
      return res.status(200).json(mailer);
    } catch (error) {
      return res.status(404).json({ error: 'Get Mailer Failed, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a Mailer id' });

      const mailer = await Mailer.findOne(id, queryBuilder(req.query));

      if (!mailer) return res.status(400).json({ error: 'Cannot find mailer.' });

      return res.status(200).json(mailer);
    } catch (error) {
      return res.status(404).json({ error: 'Get Mailer Failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { subject, text, title, template, color }: MailerInterface = req.body;
      const id = req.params.id;

      //if (!id) return res.status(400).json({ message: 'Please send a Mailer id' });

     //if (!name) return res.status(400).json({ error: 'Invalid value for Mailer' });

      const mailer = await Mailer.findOne(id);

      if (!mailer) return res.status(404).json({ message: 'Mailer does not exist' });

      await Mailer.update(id, { subject, text, title, template, color });

      return res.status(200).json({ message: 'Mailer updated successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const mailer = await Mailer.findOne(id);

      if (!mailer) return res.status(404).json({ message: 'mailer does not exist' });

      await Mailer.softRemove(mailer);

      // const deals = await Deal.find({ where: { mailer: mailer.id } });

      // deals.map(async (deal) => await Deal.update(deal.id, { status: 'ARCHIVED' }));

      return res.status(200).json({ message: 'Mailer deleted successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Remove failed, try again' });
    }
  }
}

export default new MailerController();
