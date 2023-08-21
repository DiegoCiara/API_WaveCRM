import { Request, Response } from 'express';
import Pipeline from '@entities/Pipeline';
import Deal from '@entities/Deal';
import queryBuilder from '@utils/queryBuilder';
import Funnel from '@entities/Funnel';
import { Consulting, CrossUp, Product, Relationship, SaaS } from '@utils/dataMock';
import { In } from 'typeorm';

interface FunnelInterface {
  id?: string;
  name?: string;
  description?: string;
}

class FunnelController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description }: FunnelInterface = req.body;

      if (!name || !description) return res.status(400).json({ message: 'Invalid value for Funnel' });

      const funnelCount = await Funnel.count();

      if (funnelCount >= 5 ) {
        return res.status(400).json({ message: 'Maximum number of funnels reached' });
      }

      const existsFunnel = await Funnel.findOne({ description });

      if (existsFunnel) return res.status(400).json({ message: 'Funnel already exists' });

      const funnel = await Funnel.create({ name, description }).save();
      if (name === 'Funil de relacionamento') {
        const funnelsSec = await Funnel.find({ name: 'Funil de relacionamento' });
        if (!(await Pipeline.findOne({ name: '' })) && funnelsSec.length > 0) {
          for (let i = 0; i < Relationship.length; i++) {
            await Pipeline.create({ ...Relationship[i], funnel: funnelsSec[0] }).save();
            console.log(`Pipelinemkt ${i + 1} criado`);
          }
          console.log('pipelines second ok');
        }
      }
      if (name === 'Funil de SaaS(Software as a Service)') {
        const funnelsSec = await Funnel.find({ name: 'Funil de SaaS(Software as a Service)' });
        if (!(await Pipeline.findOne({ name: '' })) && funnelsSec.length > 0) {
          for (let i = 0; i < SaaS.length; i++) {
            await Pipeline.create({ ...SaaS[i], funnel: funnelsSec[0] }).save();
            console.log(`Pipelinemkt ${i + 1} criado`);
          }
          console.log('pipelines second ok');
        }
      }
      if (name === 'Funil Cross-selling/Upselling') {
        const funnelsSec = await Funnel.find({ name: 'Funil Cross-selling/Upselling' });
        if (!(await Pipeline.findOne({ name: '' })) && funnelsSec.length > 0) {
          for (let i = 0; i < CrossUp.length; i++) {
            await Pipeline.create({ ...CrossUp[i], funnel: funnelsSec[0] }).save();
            console.log(`Pipelinemkt ${i + 1} criado`);
          }
          console.log('pipelines second ok');
        }
      }
      if (name === 'Funil de produtos') {
        const funnelsSec = await Funnel.find({ name: 'Funil de produtos' });
        if (!(await Pipeline.findOne({ name: '' })) && funnelsSec.length > 0) {
          for (let i = 0; i < Product.length; i++) {
            await Pipeline.create({ ...Product[i], funnel: funnelsSec[0] }).save();
            console.log(`Pipelinemkt ${i + 1} criado`);
          }
          console.log('pipelines second ok');
        }
      }
      if (name === 'Funil de consultoria') {
        const funnelsSec = await Funnel.find({ name: 'Funil de consultoria' });
        if (!(await Pipeline.findOne({ name: '' })) && funnelsSec.length > 0) {
          for (let i = 0; i < Consulting.length; i++) {
            await Pipeline.create({ ...Consulting[i], funnel: funnelsSec[0] }).save();
            console.log(`Pipelinemkt ${i + 1} criado`);
          }
          console.log('pipelines second ok');
        }
      }

      return res.status(201).json({id: funnel.id, message: 'Pipeline created successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Create failed, try again' });
    }
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const funnel = await Funnel.find(queryBuilder(req.query));

      if (!funnel) return res.status(400).json({ error: 'Cannot find funnels.' });

      return res.status(200).json(funnel);
    } catch (error) {
      return res.status(404).json({ error: 'Get funnel Failed, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a pipeline id' });

      const funnel = await Funnel.findOne(id, queryBuilder(req.query));

      if (!funnel) return res.status(400).json({ error: 'Cannot find funnel.' });

      return res.status(200).json(funnel);
    } catch (error) {
      return res.status(404).json({ error: 'Get funnel Failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description }: FunnelInterface = req.body;
      const id = req.params.id;

      //if (!id) return res.status(400).json({ message: 'Please send a pipeline id' });

     //if (!name) return res.status(400).json({ error: 'Invalid value for pipeline' });

      const funnel = await Funnel.findOne(id);

      if (!funnel) return res.status(404).json({ message: 'funnel does not exist' });

      await Funnel.update(id, { name, description });

      return res.status(200).json({ message: 'funnel updated successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const funnel = await Funnel.findOne(id);

      if (!funnel) return res.status(404).json({ message: 'funnel does not exist' });

      await Funnel.softRemove(funnel);

      const pipelines = await Pipeline.find({ where: { funnel: funnel?.id } });

      const pipelineIds = pipelines.map(pipeline => pipeline.id);


      await Pipeline.softRemove(pipelines);

      const deals = await Deal.find({ where: { pipeline: In(pipelineIds) } });

      deals.map(async (deal) => await Deal.update(deal.id, { status: 'ARCHIVED' }));

      return res.status(200).json({ message: 'funnel deleted successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Remove failed, try again' });
    }
  }
}

export default new FunnelController();
