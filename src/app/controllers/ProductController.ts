import { Request, Response } from 'express';
import Deal from '@entities/Deal';
import queryBuilder from '@utils/queryBuilder';
import Product from '@entities/Product';

interface ProductInterface {
  id?: string;
  name?: string;
  value?: number;
  description?: string;
}

class ProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, value, description }: ProductInterface = req.body;

      if (!name ) return res.status(400).json({ message: 'Invalid value for Product' });

      const existsAutomatin = await Product.findOne({ name });

      if (existsAutomatin) return res.status(400).json({ message: 'Product already exists' });

      const product = await Product.create({ name, value, description }).save();

      return res.status(201).json({id: product.id, message: 'Product created successfully' });
    } catch (error) {      
      console.log(error)
      return res.status(404).json({ error: 'Create failed, try again' });
    }
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const product = await Product.find(queryBuilder(req.query));

      if (!product) return res.status(400).json({ error: 'Cannot find Products.' });

      return res.status(200).json(product);
    } catch (error) {
      return res.status(404).json({ error: 'Get Product Failed, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a Product id' });

      const product = await Product.findOne(id, queryBuilder(req.query));

      if (!product) return res.status(400).json({ error: 'Cannot find Product.' });

      return res.status(200).json(product);
    } catch (error) {
      return res.status(404).json({ error: 'Get Product Failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, value, description }: ProductInterface = req.body;
      const id = req.params.id;

      //if (!id) return res.status(400).json({ message: 'Please send a Product id' });

     //if (!name) return res.status(400).json({ error: 'Invalid value for Product' });

      const product = await Product.findOne(id);

      if (!product) return res.status(404).json({ message: 'Product does not exist' });

      await Product.update(id, { name, value, description });

      return res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const product = await Product.findOne(id);

      if (!product) return res.status(404).json({ message: 'Product does not exist' });

      await Product.softRemove(product);

      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Remove failed, try again' });
    }
  }
}

export default new ProductController();
