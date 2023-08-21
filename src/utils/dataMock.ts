const companies = [
  {
    name: 'Prospecção',
    country: 'Brasil',
    state: 'SP',
    city: 'São Paulo',
    site: '',
  },
  {
    name: 'Indicação',
    country: '',
    state: '',
    city: '',
    site: '',
  },
  {
    name: 'Ligação',
    country: '',
    state: '',
    city: '',
    site: '',
  },
  {
    name: 'E-mail',
    country: '',
    state: '',
    city: '',
    site: '',
  },
  {
    name: 'WhatsApp',
    country: '',
    state: '',
    city: '',
    site: '',
  },
  {
    name: 'Facebook',
    country: '',
    state: '',
    city: '',
    site: '',
  },
  {
    name: 'Instagram',
    country: '',
    state: '',
    city: '',
    site: '',
  },
  {
    name: 'Site',
    country: '',
    state: '',
    city: '',
    site: 'www.seusite.com.br',
  },
];

const contacts = [
  {
    socialName:"Empresa Cliente",
    name: 'Exemplo de Contato',
    cpf_cnpj: '111.222.333-44',
    email: 'teste@wavecrm.com.br',
    phone: '12987979532',
    city: 'São Paulo',
    state: 'SP',
  },
];
const mailers = [
  {
    subject: 'E-mail de boas vindas',
    title: 'Seja bem vindo!',
    template: 'Empresarial',
    text: 'Olá {{Contact}}, seja bem vindo a nossa empresa, ficamos felizes em te ter aqui conosco!',
    color:"#0048fc"
  },
];
const products = [
  {
    name: 'Software',
    value: 19990,
    description: "Acesso ao software",
  },
];
const automations = [
  {
    name: 'Envio de e-mail para novo contato',
    input: 'Criar contato',
    condition: '',
    action: "Enviar e-mail",
    output: '',
  },
  {
    name: 'Envio de e-mail quando converter',
    input: 'Alterar status de negociação',
    condition: '',
    action: "Enviar e-mail",
    output: '',
  },
  {
    name: 'Registrar tarefa quando passar de etapa',
    input: 'Follow up',
    condition: '',
    action: "Enviar e-mail",
    output: '',
  },
];

const funnels = [
  {
    name: 'Funil Padrão',
    description: 'Funil de captação e conversão padrão.',
  },
]

const Models =[  
  {
    name: 'Funil de relacionamento',
    description: 'Melhore o relacionamento com seu cliente, faça campanhas de pesquisas, promoções ou ofertas para manter seus clientes engajados com seu negócio.',
  },
  {
    name: 'Funil de SaaS(Software as a Service)',
    description: 'Esse funil é comum em empresas que oferecem serviços de software. Os leads se cadastram, passam pelo processo de onboarding, experimentam uma versão de avaliação, assinam o serviço e são ativados como clientes.',
  },
  {
    name: 'Funil Cross-selling/Upselling:',
    description: 'Esse funil é focado em aumentar o valor das vendas para clientes existentes. Após a compra inicial, são identificadas oportunidades de upselling ou cross-selling, uma oferta é feita ao cliente, uma venda adicional é realizada e a compra é confirmada.',
  },
  {
    name: 'Funil de produtos',
    description: 'Nesse funil, é possível identificar leads qualificados, apresentar seus produtos/soluções de forma atrativa, elaborar propostas personalizadas, negociar preços e condições, e fechar pedidos, otimizando assim o processo de vendas dos seus produtos e aumentando as chances de conversão e sucesso nas vendas.',
  },
  {
    name: 'Funil de consultoria',
    description: 'Com o funil de vendas para consultoria, é possível captar leads qualificados, estabelecer contato direto para compreender suas necessidades, realizar reuniões de diagnóstico para identificar desafios específicos, elaborar propostas personalizadas destacando soluções e benefícios, e finalmente, fechar contratos de forma clara e objetiva, transformando leads em clientes satisfeitos.',
  },
]

const pipelines = [
  {
    name: 'Lead',
    description: "Sem contato, efetue um contato com informações relevante sobre o produto/serviço e mova para próxima etapa."
  },
  {
    name: 'Contato efetuado',
    description: "Mantenha contato para gerar interesse e reconhecer oportunidades de negócio."
  },
  {
    name: 'Oportunidade',
    description: "Reconhecimento de oportunidade, nessa etapa é identificado o interesse sobre as informações, envie uma proposta para ir para próxima etapa."
  },
  {
    name: 'Proposta',
    description: "Proposta enviada para o contato, aguarde resposta para negociar ou fechar a negociação."
  },
  {
    name: 'Negociação',
    description: "Negocie com o cliente a proposta enviada, aplique promoções, descontos ou uma nova proposta para fechar com o contato nessa etapa."
  },
];


const Relationship = [
  {
    name: 'Contato e conscientização',
    description: "Nesta etapa, o objetivo é atrair a atenção de potenciais clientes e torná-los conscientes da sua empresa e dos seus produtos ou serviços. Algumas estratégias que você pode utilizar incluem marketing de conteúdo, anúncios pagos, presença nas redes sociais e otimização para mecanismos de busca. O objetivo principal é gerar tráfego qualificado para o seu site ou loja física."
  },
  {
    name: 'Identificação de interesse',
    description: "Uma vez que os clientes estejam conscientes da sua empresa, é importante despertar interesse neles. Ofereça conteúdo relevante e informativo, como eBooks, whitepapers, webinars ou amostras grátis, para capturar o interesse deles. Solicite que eles forneçam informações de contato, como e-mail, para que você possa continuar a interagir com eles."
  },
  {
    name: 'Engajamento',
    description: "Nesta etapa, você deseja criar um relacionamento mais profundo com os clientes em potencial. Envie e-mails personalizados, newsletters ou boletins informativos com conteúdo exclusivo e relevante para manter-se presente na mente deles. Considere também o uso de mídias sociais, blogs ou grupos online para interagir e responder às perguntas ou comentários dos clientes em potencial.",
  },
  {
    name: 'Conversão',
    description: "Aqui é onde ocorre a conversão propriamente dita, ou seja, quando os clientes em potencial decidem comprar o seu produto ou serviço. Ofereça promoções exclusivas, descontos especiais ou pacotes personalizados para incentivá-los a fazer a compra. Certifique-se de fornecer um processo de compra fácil e transparente, além de um excelente atendimento ao cliente.",
  },
  {
    name: 'Fidelização',
    description: "Após a conversão, é importante manter um relacionamento contínuo com os clientes para incentivá-los a comprar novamente e se tornarem defensores da sua marca. Ofereça suporte pós-venda eficiente, programa de fidelidade, envio de conteúdo exclusivo para clientes e solicite feedback para aprimorar constantemente seus produtos e serviços.",
  },
];

const SaaS = [
  {
    name: 'Lead',
    description: "Nesta etapa, seu objetivo é atrair leads qualificados que possam se interessar pelo seu produto SaaS. Existem várias estratégias para gerar leads, como marketing de conteúdo, anúncios direcionados, mídias sociais, SEO, eventos, entre outros. O foco aqui é gerar o máximo de interesse possível e coletar informações de contato, como nome e e-mail.",
  },
  {
    name: 'Solicitação de acesso',
    description: "Uma vez que você tenha leads em mãos, o próximo passo é levá-los a solicitar acesso ao seu produto ou serviço. Isso pode ser feito oferecendo uma versão de teste gratuita, uma demonstração personalizada ou uma avaliação inicial. O objetivo é permitir que os leads experimentem seu SaaS e percebam o valor que ele pode oferecer.",
  },
  {
    name: 'Apresentação',
    description: "Após a solicitação de acesso, é hora de realizar uma apresentação do seu produto ou serviço. Pode ser uma demonstração ao vivo, uma reunião virtual ou até mesmo um vídeo explicativo. Aqui, você deve destacar os benefícios do seu SaaS, resolver dúvidas e mostrar como ele pode atender às necessidades específicas do cliente em potencial.",
  },
  {
    name: 'Proposta',
    description: "Depois da apresentação, é hora de enviar uma proposta personalizada ao cliente em potencial. A proposta deve detalhar os recursos e preços do seu SaaS, além de enfatizar o retorno do investimento que o cliente pode obter. Certifique-se de alinhar a proposta às necessidades e objetivos do cliente, demonstrando como seu produto pode resolver seus problemas ou melhorar seus processos.",
  },
  {
    name: 'Negociação',
    description: "Se o cliente em potencial estiver interessado na proposta, você entra na etapa de negociação. Nessa fase, discuta detalhes específicos, como prazos, condições contratuais, personalizações adicionais ou descontos. O objetivo é chegar a um acordo mútuo que beneficie ambas as partes e finalize a venda.",
  },
];

const CrossUp = [
  {
    name: 'Contato com o cliente',
    description: "Nesta etapa, você deve focar em conhecer bem o cliente, suas necessidades e dores. Realize pesquisas, análise de dados e interações para entender seus interesses e preferências."
  },
  {
    name: 'Oportunidade',
    description: "Com base nas informações coletadas na etapa anterior, identifique uma dor específica que o cliente esteja enfrentando. Isso pode ser um problema relacionado ao produto ou serviço que ele já adquiriu.",
  },
  {
    name: 'Solução',
    description: "Nesta etapa, você oferece uma solução para a necessidade identificada, que envolve o cross-selling ou up-selling. Recomende um produto ou serviço adicional que possa resolver o problema do cliente e agregue valor à sua experiência. Destaque os benefícios específicos da solução que você está oferecendo",
  },
  {
    name: 'Proposta',
    description: "Finalmente, faça o pitch da oferta e incentive o cliente a adquirir o produto ou serviço adicional. Certifique-se de que o preço e as condições sejam atraentes e demonstre como a compra ajudará o cliente a obter ainda mais valor do seu investimento inicial.",
  },
  {
    name: 'Negociação',
    description: "Negocie com o cliente termos e condições favoráveis para a realização do produto adicional ou upgrade. Faça ofertas, converse com o cliente e identifique o que ele precisa para fechar a venda.",
  },
];

const Product = [
  {
    name: 'Qualificação de leads',
    description: "Nesta etapa, você precisa identificar e qualificar leads que têm potencial para se tornarem clientes. Você pode utilizar várias estratégias para isso, como a geração de leads por meio de anúncios online, participação em feiras e eventos relacionados ao setor de doces, ou até mesmo a captura de leads por meio do seu site ou redes sociais. Certifique-se de coletar informações relevantes dos leads, como nome, contato, localização e interesses."
  },
  {
    name: 'Apresentação',
    description: "Uma vez que você tenha identificado os leads qualificados, é hora de apresentar seu produto ou solução de maneira atraente. Destaque os diferenciais dos seus doces, como ingredientes de qualidade, sabores únicos, variedade de opções e até mesmo aspectos relacionados à saúde, como produtos sem glúten ou opções veganas. Utilize materiais visuais e descritivos para transmitir a qualidade e a variedade dos seus produtos."
  },
  {
    name: 'Elaboração de proposta',
    description: "Nesta etapa, você precisa elaborar propostas para atender às necessidades e preferências individuais dos leads. Isso pode incluir a criação de pacotes, descontos especiais para quantidades maiores, ou até mesmo a possibilidade de desenvolver produtos exclusivos para eventos especiais. Certifique-se de que suas propostas estejam alinhadas com as expectativas dos clientes e sejam competitivas em termos de preço e qualidade."
  },
  {
    name: 'Negociação',
    description: "Após apresentar a proposta, é hora de negociar o preço e as condições com o cliente. Esteja aberto para ouvir as necessidades e preocupações do cliente e esteja preparado para fazer ajustes nas condições, se necessário. Busque um equilíbrio entre maximizar o valor da venda para sua empresa e garantir a satisfação do cliente. Lembre-se de que um bom relacionamento com o cliente pode levar a vendas futuras e recomendações positivas."
  },
]

const Consulting =[
{
  name: 'Captação de Leads',
  description: "Nesta etapa, o objetivo é atrair potenciais clientes interessados nos serviços da sua consultoria. Isso pode ser feito através de estratégias de marketing digital, como anúncios, conteúdo relevante, mídias sociais e otimização de mecanismos de busca. O foco é gerar leads qualificados, ou seja, pessoas que demonstram interesse genuíno no que você oferece."
},
{
  name: 'Contato',
  description: "Após capturar os leads, é importante estabelecer o primeiro contato com eles. Isso pode ser feito através de telefonemas, e-mails ou mensagens diretas. O objetivo é iniciar uma conversa para entender melhor as necessidades e desafios do lead, bem como fornecer informações iniciais sobre a sua consultoria."
},
{
  name: 'Reunião de diagnóstico',
  description: "Nesta etapa, é hora de aprofundar o conhecimento sobre o lead e sua empresa. Uma reunião de diagnóstico é agendada, na qual são feitas perguntas detalhadas para entender os problemas que o lead está enfrentando e como sua consultoria pode ajudar. O objetivo é coletar informações relevantes para personalizar a proposta posteriormente."
},
{
  name: 'Proposta',
  description: "Com base nas informações coletadas na etapa anterior, é hora de criar uma proposta personalizada para o lead. A proposta deve ser clara, detalhada e destacar os benefícios e soluções específicas que sua consultoria oferece. O objetivo é convencer o lead de que sua consultoria é a melhor opção para resolver seus problemas."
},
{
  name: 'Assinatura de contrato',
  description: "Uma vez que a proposta tenha sido aceita pelo lead, é hora de formalizar o acordo através da assinatura de contrato. Nesta etapa, os detalhes finais são acertados, como prazos, valores e condições específicas. O objetivo é estabelecer uma relação contratual clara e definida entre a sua consultoria e o cliente."
},
]

const users = [
  {
    name: 'Suporte Técnico',
    email: 'suporte@wavecrm.com.br',
    role: 'ADMIN',
    password: 'die140401',
  },
];

const deals = [
  {
    name: 'Exemplo de negociação',
    deadline: new Date(),
    priority: 'medium',
    value: 676577,
  },
];

const deals2 = [
  {
    name: 'nReport',
    deadline: new Date(),
    priority: 'medium',
    value: 258445,
  },
];

const deals3 = [
  {
    name: 'nReport',
    deadline: new Date(),
    priority: 'medium',
    value: 258445,
  },
];

const deals4 = [
  {
    name: 'nReport',
    deadline: new Date(),
    priority: 'high',
    value: 258445,
  },
];

export { companies, contacts, users, funnels, pipelines, Relationship, SaaS, CrossUp,  Consulting, deals, automations, products, mailers,deals2, deals3, deals4 };
