// mocks
import { companies, contacts, users, pipelines, deals, deals2, deals3, deals4, automations , mailers, products, funnels } from './dataMock';
import Company from '@entities/Company';
import Contact from '@entities/Contact';
import Pipeline from '@entities/Pipeline';
import Deal from '@entities/Deal';
import User from '@entities/User';
import bcrypt from 'bcryptjs';
import Automation from '@entities/Automation';
import Mailer from '@entities/Mailer';
import Funnels from '@entities/Funnel';
import Product from '@entities/Product';

const mocks = async (): Promise<void> => {
  // inserindo dados iniciais no Banco de dados;
  try {
    if (!(await User.findOne({ email: 'admin@wavecrm.com.br' }))) {
      const pass = await bcrypt.hash('die140401', 10);

      await User.create({ name: 'admin', email: 'admin@wavecrm.com.br', role: 'ADMIN', passwordHash: pass }).save();
    }


    if (!(await Funnels.findOne({ name: 'Funil Padrão' }))) {
      for (let i = 0; i < funnels.length; i++) {
        await Funnels.create({ ...funnels[i] }).save();
        console.log(`Funnels ${i + 1} criado`);
      }
      console.log('Funnelss ok');
    }

    const funnelsFind = await Funnels.find()

    if (!(await Pipeline.findOne({ name: 'Lead' }))&& funnelsFind.length) {
      for (let i = 0; i < pipelines.length; i++) {
        await Pipeline.create({ ...pipelines[i], funnel: funnelsFind[0]  }).save();
        console.log(`Pipeline ${i + 1} criado`); 
      }
      console.log('pipelines ok');
    }

    // const funnelsSec = await Funnels.findOne({name: 'Marketing'})

    // if (!(await Pipeline.findOne({ name: 'Campanha de anúncios' }))&& funnelsSec) {
    //   for (let i = 0; i < pipelines2.length; i++) {
    //     await Pipeline.create({ ...pipelines2[i], funnel: funnelsSec[0]  }).save();
    //     console.log(`Pipelinemkt ${i + 1} criado`); 
    //   }
    //   console.log('pipelines second ok');
    // }
    
    if (!(await Automation.findOne({ name: 'Envio de e-mail para novo contato' }))) {
      for (let i = 0; i < automations.length; i++) {
        await Automation.create({ ...automations[i] }).save();
        console.log(`Automation ${i + 1} criado`);
      }
      console.log('Automations ok');
    }
    if (!(await Mailer.findOne({ subject: 'E-mail de boas vindas' }))) {
      for (let i = 0; i < mailers.length; i++) {
        await Mailer.create({ ...mailers[i] }).save();
        console.log(`Mailer ${i + 1} criado`);
      }
      console.log('Mailers ok');
    }

    
    if (!(await Product.findOne({ name: 'Software' }))) {
      for (let i = 0; i < products.length; i++) {
        await Product.create({ ...products[i] }).save();
        console.log(`Product ${i + 1} criado`);
      }
      console.log('Products ok');
    }

    if (!(await Company.findOne({ name: 'Prospecção' }))) {
      for (const company of companies) {
        await Company.create({ ...company }).save();
        console.log(`Canal ${company.name} criada`);
      }
      console.log('companies ok');
    }

    if (!(await User.findOne({ email: 'suporte@wavecrm.com.br' }))) {
      users.map(async (admin) => {
        const passwordHash = await bcrypt.hash(admin.password, 10);
        await User.create({ ...admin, passwordHash }).save();
      });
      console.log('users ok');
    }
    const companiesFind = await Company.find();

    if (!(await Contact.findOne({ email: 'teste@wavecrm.com.br' })) && companiesFind.length >= 5) {
      for (let index = 0; index < contacts.length; index++) {
        const contact = contacts[index];
        await Contact.create({ ...contact, company: companiesFind[index] }).save();
      }
    
      console.log('contacts ok');
    }const contactFind = await Contact.find();
  const userFind = await User.find();
  const pipelineFind = await Pipeline.find();


if (!(await Deal.findOne({ name: 'Exemplo de negociação' })) && contactFind.length >= 1 && pipelineFind.length >= 1 && companiesFind.length >= 1) {
  for (let index = 0; index < deals.length; index++) {
    const deal = deals[index];
    await Deal.create({
      ...deal,
      pipeline: pipelineFind[index],
      company: companiesFind[index],
      contact: contactFind[index],
      activity: [
        {
          name: 'teste',
          description: 'testando',
          createdAt: Date.parse('2021-11-01T17:38:44.873Z'),
          createdBy: { id: '', name: '' },
          tag: 'COLD',
        },
      ],
      value: Math.random() * (0 - 0) + 0,
      status: 'ARCHIVED',
    }).save();
  }

      // deals2.map(async (deal, index) => {
      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'COLD',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'INPROGRESS',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();
      // });

      // deals3.map(async (deal, index) => {
      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'HOT',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'LOST',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();
      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'HOT',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'LOST',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();
      // });

      // deals4.map(async (deal, index) => {
      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'COLD',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'WON',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();

      //   await Deal.create({
      //     ...deal,
      //     pipeline: pipelineFind[index],
      //     company: companiesFind[index],
      //     contact: contactFind[index],
      //     // status: 'ARCHIVED',
      //     activity: [
      //       {
      //         name: 'teste',
      //         description: 'testando',
      //         // createdAt: new Date(),
      //         createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //         createdBy: { id: userFind[index + 1].id, name: userFind[index + 1].name },
      //         tag: 'COLD',
      //       },
      //     ],
      //     value: Math.random() * (132100 - 23580) + 23580,
      //     status: 'WON',
      //     // createdAt: Date.parse(`2021-11-01T17:38:44.873Z`),
      //     // updatedAt: Date.parse(`2021-11-0${c}T17:38:44.873Z`),
      //   }).save();
      // });

      console.log('deals ok');
    }

    const dealsFind = await Deal.find();
    if (!dealsFind.length) mocks();
  } catch (error) {
    console.log('Erro ao rodar mocks!');
  }
};

export default mocks;
