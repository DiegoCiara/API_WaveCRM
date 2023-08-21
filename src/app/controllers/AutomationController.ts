import { Request, Response } from 'express';
import Deal from '@entities/Deal';
import queryBuilder from '@utils/queryBuilder';
import Automation from '@entities/Automation';

interface AutomationInterface {
  id?: string;
  name?: string;
  input?: string;
  condition?: string;
  action?: string;
  output?: string;
}

class AutomationController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, input,  condition, output, action }: AutomationInterface = req.body;

      if (!name || !input || !condition || !output || !action ) return res.status(400).json({ message: 'Invalid value for Automation' });

      const existsAutomatin = await Automation.findOne({ name });

      if (existsAutomatin) return res.status(400).json({ message: 'Automation already exists' });

      const automation = await Automation.create({ name, input, condition, output, action }).save();

      return res.status(201).json({id: automation.id, message: 'Automation created successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Create failed, try again' });
    }
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const automation = await Automation.find(queryBuilder(req.query));

      if (!automation) return res.status(400).json({ error: 'Cannot find Automations.' });

      return res.status(200).json(automation);
    } catch (error) {
      return res.status(404).json({ error: 'Get Automation Failed, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a Automation id' });

      const automation = await Automation.findOne(id, queryBuilder(req.query));

      if (!automation) return res.status(400).json({ error: 'Cannot find automation.' });

      return res.status(200).json(automation);
    } catch (error) {
      return res.status(404).json({ error: 'Get automation Failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, input , condition , output, action }: AutomationInterface = req.body;
      const id = req.params.id;

      //if (!id) return res.status(400).json({ message: 'Please send a Automation id' });

     //if (!name) return res.status(400).json({ error: 'Invalid value for Automation' });

      const automation = await Automation.findOne(id);

      if (!automation) return res.status(404).json({ message: 'automation does not exist' });

      await Automation.update(id, { name, input , condition , output, action });

      return res.status(200).json({ message: 'automation updated successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const automation = await Automation.findOne(id);

      if (!automation) return res.status(404).json({ message: 'automation does not exist' });

      await Automation.softRemove(automation);

      return res.status(200).json({ message: 'automation deleted successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Remove failed, try again' });
    }
  }
}

export default new AutomationController();
