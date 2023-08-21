import Contact from '@entities/Contact';
import Company from '@entities/Company';
import Deal from '@entities/Deal';
import Pipeline from '@entities/Pipeline';
import { Request, Response, json } from 'express';
import User from '@entities/User';
import queryBuilder from '@utils/queryBuilder';
import transport from '@src/modules/mailer';
import MailerController from './MailerController';
import Mailers from '@entities/Mailer';
import { mailers } from '@utils/dataMock';
import Automations from '@entities/Automation';
import { NameCompany } from '@src/client';

interface DealInteface {
  id?: string;
  pipeline?: Pipeline;
  company?: Company;
  contact?: Contact;
  name?: string;
  deadline?: Date;
  priority?: string;
  value?: number;
  status?: string;
  activity?: ActivityInterface;
}

declare namespace Express {
  interface Request {
    userId: string;
    id:string;
  }
}


interface ActivityInterface {
  tag: string;
  name: string;
  createdAt: Date;
  createdBy: { id: string; name: string };
  description: string;
}

class DealController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const {name, deadline, priority, value, status, company, contact, pipeline }: DealInteface = req.body;
      const { tag } = req.body;

      if (!name || !company || !contact || !pipeline) return res.status(400).json({ message: 'Invalid values for Deal' });

      const createdBy = await  User.findOne(req.userId)

      // const createdBy = await idUser;

      const deal = await Deal.create({ name, company, contact, pipeline, deadline, priority, value, status, activity: [  {
          tag: tag || 'HOT',
          name: 'Negociação iniciada',
          description: '',
          createdAt: new Date(),
          createdBy: { id: createdBy.id, name: createdBy.name },
        },
      ],
      }).save();

      if (!deal) return res.status(400).json({ message: 'Cannot create Deal' });
      

      return res.status(201).json({ id: deal.id });

    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: 'Cannot create Deal, try again' });
    }
  }



  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const deal = await Deal.find(queryBuilder(req.query));
      // relations: ['company', 'contact', 'pipeline'],

      return res.status(200).json(deal);
    } catch (error) {
      return res.status(400).json({ error: 'Cannot find Deals, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const deal = await Deal.findOne(id, queryBuilder(req.query));
      // relations: ['company', 'contact', 'pipeline'],

      if (!deal) return res.status(404).json({ message: 'Deal does not exist' });

      return res.status(200).json(deal);
    } catch (error) {
      return res.status(400).json({ error: 'Cannot find Deal, try again' });
    }
  }


  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, priority, value, status, company, contact, pipeline, deadline }: DealInteface = req.body;
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send Deal id' });

      const deal = await Deal.findOne(id, { relations: ['company', 'contact', 'pipeline'] });

      if (!deal) return res.status(404).json({ message: 'Deal does not exist' });

      const valuesToUpdate = {
        company: company || deal.company,
        contact: contact || deal.contact,
        pipeline: pipeline || deal.pipeline,
        priority: priority || deal.priority,
        deadline: deadline || deal.deadline,
        status: status || deal.status,
        value: value || deal.value,
        name: name || deal.name,
      };

      const DealStatus = valuesToUpdate.status;

      // Automação de e-mail
      const automations = await Automations.find();

      for (const automationData of automations) {
        if (DealStatus === automationData.condition) {
          const automationEmail = await Automations.findOne({action: "Enviar e-mail"})
          const automationTask = await Automations.findOne({action: "Registrar atividade"})
          const automationNotification = await Automations.findOne({action: "Notificar"})

          if ( automationEmail  && automationData.action !== "Registrar atividade" ){

          const mailerProWithOutput = await Mailers.findOne({ subject: automationData.output, template: "Empresarial"});
          const mailerPersonWithOutput = await Mailers.findOne({ subject: automationData.output, template: "Pessoal"});
          const createdBy = await  User.findOne(req.userId)

          if (mailerProWithOutput) {
            console.log(mailerProWithOutput)
            const Name = deal.name;
            const Contact = deal.contact.name; 
            const Email = deal.contact.email;
            const Subject = mailerProWithOutput.subject;
            const Title = mailerProWithOutput.title;
            const Color = mailerProWithOutput.color;
            const Photo = createdBy.picture;
            const Responsible = createdBy.name;
            const Client = process.env.CLIENT_NAME;
            let Text = mailerProWithOutput.text;
            Text = Text.replace('{{Name}}', Name);
            Text = Text.replace('{{Contact}}', Contact);
            Text = Text.replace('{{Email}}', Email);
            
            transport.sendMail({
              to: Email,
              from: '"Wave CRM" <api@contato.com>',
              subject: Subject,
              template: 'ProfessionalMailer',
              context: {Responsible, Photo, Title, Text, Name, Contact, Color, Client },
            }, (err) => {
              if (err) {
                console.log('Email not sent');
                console.log(err);
              }
              transport.close();
            });
          } else if (mailerPersonWithOutput) {
            console.log(mailerPersonWithOutput)
            const Name = deal.name;
            const Contact = deal.contact.name; 
            const Email = deal.contact.email;
            const Subject = mailerPersonWithOutput.subject;
            const Title = mailerPersonWithOutput.title;
            const Color = mailerPersonWithOutput.color;
            const Photo = createdBy.picture;
            const Responsible = createdBy.name;
            const Client = process.env.CLIENT_NAME;

            let Text = mailerPersonWithOutput.text;
            Text = Text.replace('{{Name}}', Name);
            Text = Text.replace('{{Contact}}', Contact);
            Text = Text.replace('{{Email}}', Email);

            transport.sendMail({
              to: Email,
              from: '"Wave CRM" <api@contato.com>',
              subject: Subject,
              template: 'PersonalMailer',
              context: {Responsible, Photo, Title, Text, Name, Color, Contact, Client },
            }, (err) => {
              if (err) {
                console.log('Email not sent');
                console.log(err);
              }
              transport.close();
            });
           }
          }
           else if ( automationTask ){
            try{  const tasksInsert = automationData.output;

              const createdBy = await User.findOne(req.userId);
            
            
              if (!deal) {
                return res.status(404).json({ message: 'Deal does not exist' });
              }
            
              const newActivity = {
                name: tasksInsert,
                description: "",
                createdAt: new Date(),
                tag: "HOT",
                createdBy: { id: createdBy.id, name: createdBy.name },
              };
            
              deal.activity.push(newActivity);
              await deal.save();

            } catch (error) {
              console.log(error)
              return res.status(400).json({ error: 'Cannot insert activity, try again' });
            }
            }
        }
      }


      await Deal.update(id, { ...valuesToUpdate });

      const currentTimestamp: number = Date.now();
      console.log(currentTimestamp);
      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot update Deal, try again' });
    }

  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send Deal id' });

      const deal = await Deal.findOne(id);

      if (!deal) return res.status(404).json({ message: 'Deal does not exist' });

      await Deal.softRemove(deal);

      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot delete Deal, try again' });
    }
  }

  public async insertActivity(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, tag, createdAt }: ActivityInterface = req.body;
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send Deal id' });

      const createdBy = await User.findOne(req.userId);

      if (!name || !description || !tag || !createdAt || !createdBy)
        return res.status(400).json({ message: 'Invalid values to insert Activity' });

      const deal = await Deal.findOne(id);

      if (!deal) return res.status(404).json({ message: 'Deal does not exist' });

      deal.activity.push({ name, description, createdAt, tag, createdBy: { id: createdBy.id, name: createdBy.name } });

      await deal.save();

      return res.status(201).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot insert activity, try again' });
    }
  }
  public async pipelineUpdate(req: Request, res: Response): Promise<Response> {
    try {
      const { pipeline } = req.body;
      const id = req.params.id;
  
      const dealFind = await Deal.findOne(id, { relations: ['company', 'contact', 'pipeline'] });
  
      if (!dealFind) return res.status(404).json({ error: 'Deal does not exist' });
  
      const destinationPipeline = await Pipeline.findOne(pipeline);
  
      if (!destinationPipeline) return res.status(404).json({ error: 'Destination pipeline does not exist' });
  
      const destinationPipelineName = destinationPipeline.id;

      // Automação de e-mail
      const automations = await Automations.find();

      for (const automationData of automations) {
        if (destinationPipelineName === automationData.condition) {
          const automationEmail = await Automations.findOne({action: "Enviar e-mail"})
          const automationTask = await Automations.findOne({action: "Registrar atividade"})
          const automationNotification = await Automations.findOne({action: "Notificar"})

          if ( automationEmail  && automationData.action !== "Registrar atividade" ){

          const mailerProWithOutput = await Mailers.findOne({ subject: automationData.output, template: "Empresarial"});
          const mailerPersonWithOutput = await Mailers.findOne({ subject: automationData.output, template: "Pessoal"});
          const createdBy = await  User.findOne(req.userId)

          if (mailerProWithOutput) {
            console.log(mailerProWithOutput)
            const Name = dealFind.name;
            const Contact = dealFind.contact.name; 
            const Email = dealFind.contact.email;
            const Subject = mailerProWithOutput.subject;
            const Title = mailerProWithOutput.title;
            const Color = mailerProWithOutput.color;
            const Photo = createdBy.picture;
            const Responsible = createdBy.name;
            const Client = process.env.CLIENT_NAME;
            let Text = mailerProWithOutput.text;
            Text = Text.replace('{{Name}}', Name);
            Text = Text.replace('{{Contact}}', Contact);
            Text = Text.replace('{{Email}}', Email);
            
            transport.sendMail({
              to: Email,
              from: '"Wave CRM" <api@contato.com>',
              subject: Subject,
              template: 'ProfessionalMailer',
              context: {Responsible, Photo, Title, Text, Name, Contact, Color, Client },
            }, (err) => {
              if (err) {
                console.log('Email not sent');
                console.log(err);
              }
              transport.close();
            });
          } else if (mailerPersonWithOutput) {
            console.log(mailerPersonWithOutput)
            const Name = dealFind.name;
            const Contact = dealFind.contact.name; 
            const Email = dealFind.contact.email;
            const Subject = mailerPersonWithOutput.subject;
            const Title = mailerPersonWithOutput.title;
            const Color = mailerPersonWithOutput.color;
            const Photo = createdBy.picture;
            const Responsible = createdBy.name;
            const Client = process.env.CLIENT_NAME;

            let Text = mailerPersonWithOutput.text;
            Text = Text.replace('{{Name}}', Name);
            Text = Text.replace('{{Contact}}', Contact);
            Text = Text.replace('{{Email}}', Email);

            transport.sendMail({
              to: Email,
              from: '"Wave CRM" <api@contato.com>',
              subject: Subject,
              template: 'PersonalMailer',
              context: {Responsible, Photo, Title, Text, Name, Color, Contact, Client },
            }, (err) => {
              if (err) {
                console.log('Email not sent');
                console.log(err);
              }
              transport.close();
            });
           }
          }
           else if ( automationTask ){
            try{  const tasksInsert = automationData.output;

              const createdBy = await User.findOne(req.userId);
            
            
              if (!dealFind) {
                return res.status(404).json({ message: 'Deal does not exist' });
              }
            
              const newActivity = {
                name: tasksInsert,
                description: "",
                createdAt: new Date(),
                tag: "HOT",
                createdBy: { id: createdBy.id, name: createdBy.name },
              };
            
              dealFind.activity.push(newActivity);
              await dealFind.save();

            } catch (error) {
              console.log(error)
              return res.status(400).json({ error: 'Cannot insert activity, try again' });
            }
            }
        }
      }
      await Deal.update(id, { pipeline });


  
  
      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot update Deal pipeline, try again' });
    }
  }
        }

export default new DealController();
