import Automations from '@entities/Automation';
import Company from '@entities/Company';
import Contact from '@entities/Contact';
import Deals from '@entities/Deal';
import Mailers from '@entities/Mailer';
import Pipelines from '@entities/Pipeline';
import Users from '@entities/User';
import transport from '@src/modules/mailer';
import { deals } from '@utils/dataMock';
import queryBuilder from '@utils/queryBuilder';
import { Request, Response } from 'express';

interface ContactInterface {
  socialName?: string;
  name?: string;
  cpf_cnpj?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  company?: Company;
}

class ContactController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const contacts = (await Contact.find(queryBuilder(req.query))).reverse();

      return res.status(200).json(contacts);
    } catch (error) {
      return res.status(404).json({ error: 'Find contact failed, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const contact = await Contact.findOne(id, queryBuilder(req.query));

      if (!contact) return res.status(400).json({ message: 'Contact does not exist' });

      return res.status(200).json(contact);
    } catch (error) {
      return res.status(404).json({ error: 'Find contact failed, try again' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { socialName, name, cpf_cnpj, email, phone, city, state, company }: ContactInterface = req.body;

      if ( !name || !cpf_cnpj || !email  || !company) return res.status(400).json({message: 'Invalid values for contacts'});

      const findContact = await Contact.findOne({ cpf_cnpj });

      if (findContact) return res.status(400).json({ message: 'Contact already exists' });

      const contact = await Contact.create({ name, socialName,  cpf_cnpj, email, phone, city, state, company }).save();

      if (!contact) return res.status(400).json({ message: 'Cannot create contact' });


      // Automação de e-mail
      const automations = await Automations.find();

      for (const automationData of automations) {
        if (automationData.input === "Criar contato") {
          const automationEmail = await Automations.findOne({action: "Enviar e-mail"})
          const CreateNegociation = await Automations.findOne({action: "Criar negociação"})
          const automationNotification = await Automations.findOne({action: "Notificar"})

          if ( automationEmail  && automationData.action !== "Criar negociação" ){

          const mailerProWithOutput = await Mailers.findOne({ subject: automationData.output, template: "Empresarial"});
          const mailerPersonWithOutput = await Mailers.findOne({ subject: automationData.output, template: "Pessoal"});
          const createdBy = await  Users.findOne(req.userId)

          if (mailerProWithOutput) {
            console.log(mailerProWithOutput)
            const Contact = contact.name; 
            const Company = contact.socialName; 
            const Email = contact.email;
            const Subject = mailerProWithOutput.subject;
            const Title = mailerProWithOutput.title;
            const Color = mailerProWithOutput.color;
            const Photo = createdBy.picture;
            const Responsible = createdBy.name;
            const Client = process.env.CLIENT_NAME;
            let Text = mailerProWithOutput.text;
            Text = Text.replace('{{Contact}}', Contact);
            Text = Text.replace('{{Company}}', Company);
            Text = Text.replace('{{Email}}', Email);
            
            transport.sendMail({
              to: Email,
              from: '"Wave CRM" <api@contato.com>',
              subject: Subject,
              template: 'ProfessionalMailer',
              context: {Responsible, Photo, Title, Company, Text, Contact, Color, Client },
            }, (err) => {
              if (err) {
                console.log('Email not sent');
                console.log(err);
              }
              transport.close();
            });
          } else if (mailerPersonWithOutput) {
            console.log(mailerPersonWithOutput)
            const Contact = contact.name; 
            const Company = contact.socialName; 
            const Email = contact.email;
            const Subject = mailerPersonWithOutput.subject;
            const Title = mailerPersonWithOutput.title;
            const Color = mailerPersonWithOutput.color;
            const Photo = createdBy.picture;
            const Responsible = createdBy.name;
            const Client = process.env.CLIENT_NAME;

            let Text = mailerPersonWithOutput.text;
            Text = Text.replace('{{Contact}}', Contact);
            Text = Text.replace('{{Company}}', Company);
            Text = Text.replace('{{Email}}', Email);

            transport.sendMail({
              to: Email,
              from: '"Wave CRM" <api@contato.com>',
              subject: Subject,
              template: 'PersonalMailer',
              context: {Responsible, Photo, Title, Text, Color, Company, Contact, Client },
            }, (err) => {
              if (err) {
                console.log('Email not sent');
                console.log(err);
              }
              transport.close();
            });
           }
          }
           else if ( CreateNegociation ){
            try{  const tasksInsert = automationData.output;

              const createdBy = await Users.findOne(req.userId);
              const companiesFind = await Company.find();
              const contactFind = await Contact.find();
              const pipelineFind = await Pipelines.find();
        
        
              if (!(await Deals.findOne({ name: name })) && contactFind.length >= 1 && pipelineFind.length >= 1 && companiesFind.length >= 1) {
                for (let index = 0; index < deals.length; index++) {
                  const deal = deals[index];
                  await Deals.create({
                    ...deal,
                    name: "Nova oportunidade",
                    pipeline: pipelineFind[index],
                    company: contact.company,
                    contact: contact,
                    activity: [
                      {
                        name: '',
                        description: '',
                        createdAt: Date.parse('2021-11-01T17:38:44.873Z'),
                        createdBy: { id: createdBy.id, name: createdBy.name },
                        tag: 'COLD',
                      },
                    ],
                    value: Number(tasksInsert),
                    status: 'INPROGRESS',
                  }).save();
                }
              }
        
            
            } catch (error) {
              console.log(error)
              return res.status(400).json({ error: 'Cannot insert activity, try again' });
            }
            }
        }
      }


      // transport.sendMail({
      //   to: email,
      //   from: '"Wave CRM" <api@contato.com>',
      //   subject: 'Solicitação de acesso ', // assunto do email
      //   template: 'newContact',

      //   context: { name },
      // },
      // (err) => {
      //   if (err) console.log('Email not sent')

      //   transport.close();
      // });

      return res.status(201).json({ id: contact.id });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error: 'Create contact failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const { socialName, name, cpf_cnpj, email, phone, city, state, company }: ContactInterface = req.body;

      if (!id) return res.status(404).json({ message: 'Please send contact id' });

      const contact = await Contact.findOne(id);

      if (!contact) return res.status(404).json({ message: 'Cannot find contact' });

      const valuesToUpdate: ContactInterface = {
        socialName: socialName || contact.socialName,
        name: name || contact.name,
        cpf_cnpj: cpf_cnpj || contact.cpf_cnpj,
        email: email || contact.email,
        phone: phone || contact.phone,
        city: city || contact.city,
        state: state || contact.state,
        company: company || contact.company,
      };

      await Contact.update(id, { ...valuesToUpdate });

      return res.status(200).json();
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(404).json({ message: 'Please send Contact id' });

      const contact = await Contact.findOne(id);

      if (!contact) return res.status(404).json({ message: 'Contact does not exist' });

      await Contact.softRemove(contact);

      return res.status(200).json();
    } catch (error) {
      return res.status(404).json({ error: 'Cannot delete Contact, try again' });
    }
  }
}

export default new ContactController();