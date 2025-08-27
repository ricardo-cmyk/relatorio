import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import './App.css';

// Componente para o logo da Mercattoria
const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="flex-shrink-0">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center">
        <span className="font-bold text-white text-lg">M</span>
      </div>
    </div>
    <span className="text-xl font-bold text-gray-800 tracking-wider">Mercattoria</span>
  </div>
);

// Componente para os títulos das seções
const SectionTitle = ({ title, subtitle, className = '' }) => (
  <div className={`text-center mb-12 ${className}`}>
    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{title}</h2>
    <p className="text-lg text-gray-600 font-light">{subtitle}</p>
  </div>
);

// Componente para um item da linha do tempo, agora clicável
const TimelineItem = ({ title, date, index, onClick }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        setActive(true);
      }, index * 200); // Animação escalonada
      return () => clearTimeout(timeout);
    }
  }, [inView, index]);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`
        relative flex flex-col items-center cursor-pointer group
        opacity-0 transform transition-all duration-1000 ease-in-out
        ${active ? 'opacity-100 translate-y-0' : 'translate-y-16'}
      `}
    >
      <div className="z-10 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:scale-110">
        {index + 1}
      </div>
      <div className="w-0.5 h-16 bg-gray-300 transition-colors duration-300 group-hover:bg-teal-500"></div>
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center -translate-y-8 transition-transform duration-500 hover:scale-105 hover:-translate-y-10 group-hover:shadow-2xl">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-teal-600 font-semibold mt-1">{date}</p>
        <p className="mt-4 text-gray-700 text-sm font-light leading-relaxed">
          Clique para ver mais detalhes.
        </p>
      </div>
    </div>
  );
};

// Componente para os cartões de implementação, agora clicável
const Card = ({ title, description, icon, index, onClick }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        setActive(true);
      }, index * 250); // Animação escalonada
      return () => clearTimeout(timeout);
    }
  }, [inView, index]);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`
        bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-1000 ease-in-out
        hover:shadow-2xl hover:-translate-y-2 cursor-pointer
        opacity-0 ${active ? 'opacity-100 translate-y-0' : 'translate-y-16'}
      `}
    >
      <div className="flex items-center justify-center mb-4">
        <div className="bg-green-100 p-4 rounded-full text-green-600 text-3xl">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 font-light leading-relaxed">{description}</p>
    </div>
  );
};

// Componente para os itens da conclusão
const ConclusionItem = ({ title, description, icon, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        setActive(true);
      }, index * 150); // Animação escalonada
      return () => clearTimeout(timeout);
    }
  }, [inView, index]);

  return (
    <li
      ref={ref}
      className={`
        flex items-start space-x-3 mb-4
        opacity-0 transform transition-all duration-700 ease-in-out
        ${active ? 'opacity-100 translate-y-0' : 'translate-y-8'}
      `}
    >
      <div className="flex-shrink-0 text-2xl text-teal-500 mt-1">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600 font-light leading-relaxed">{description}</p>
      </div>
    </li>
  );
};

// Componente Modal para exibir os detalhes da reunião
const MeetingModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold text-gray-900">{content.title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-teal-600 font-semibold mb-4">{content.date}</p>
          
          {content.objective && (
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Contexto e Objetivo</h4>
              <p className="text-gray-700 leading-relaxed">{content.objective}</p>
            </div>
          )}
          
          {content.discussions.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Principais Discussões</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {content.discussions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {content.actions.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Ações Definidas/Implementadas</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {content.actions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Novo componente Modal para exibir os detalhes da implementação
const ImplementationModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold text-gray-900">{content.title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {content.fullDescription && (
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{content.fullDescription}</p>
            </div>
          )}
          
          {content.subpoints && content.subpoints.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Ações e Resultados</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {content.subpoints.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isImplementationModalOpen, setIsImplementationModalOpen] = useState(false);
  const [selectedImplementation, setSelectedImplementation] = useState(null);

  const timelineData = [
    {
      title: 'Reunião de 09 de Abril de 2025',
      date: 'Início da Consultoria',
      objective: 'A primeira reunião marcou o início formal do trabalho de consultoria, com foco na apresentação do time de prevenção e estabelecimento de novos modelos de auditoria nas lojas. Esta reunião foi fundamental para definir as estratégias de acompanhamento que seriam implementadas ao longo do projeto.',
      discussions: [
        'Implementação de acompanhamento diário das produções, lançamentos, trocas e perdas dos setores.',
        'Estabelecimento de auditoria específica para lançamento de perdas da Rotisseria.',
        'Criação de sistema de contagem semanal de estoque de carnes para antecipar falta de produtos.',
        'Desenvolvimento de novo modelo de acompanhamento para lançamentos de carnes do açougue.',
        'Identificação das dificuldades dos Auditores de Prevenção na cobrança de processos dos líderes.',
        'Necessidade de maior participação do gerente da loja na intensificação da cobrança dos setores.'
      ],
      actions: [
        'Providenciar lacres descartáveis para caminhões visando monitorar transferências entre lojas.',
        'Desenvolver sistema de rastreio de rotas dos caminhões utilizando compartilhamento de localização via WhatsApp.',
        'Intensificar cobrança dos setores de manipulação e produção para identificar perdas inexistentes.',
        'Dar continuidade à contagem de estoque na loja de Bady Bassit para maior assertividade do time de compras.',
        'Agendar reunião entre Líderes, Gerente e Prevenção.',
        'Desenvolver cronograma de acompanhamento da pesagem de perdas do Hortifruti.'
      ]
    },
    {
      title: 'Reunião de 25 de Junho de 2025',
      date: 'Foco em Notas Fiscais',
      objective: 'Esta reunião foi convocada para abordar problemas específicos identificados no setor de notas fiscais, com participação ampliada incluindo representantes do depósito, prevenção, diretoria, comercial e relações internas. O foco principal foi a correção de erros contínuos em notas de entrada.',
      discussions: [
        'Identificação e correção de erros no CFOP e ST em notas de entrada.',
        'Necessidade de treinamento para responsáveis pela liberação de notas em todas as lojas.',
        'Padronização de transferências de sábado com horário limite até 10h da manhã.',
        'Obrigatoriedade de acompanhamento por colaborador do recebimento em todas as transferências.',
        'Implementação de coleta de mercadorias sempre com auxílio do coletor.',
        'Exigência de nota fiscal para todas as transferências entre lojas.',
        'Estabelecimento de prioridade para produtos perecíveis.'
      ],
      actions: [
        'Reciclagem de todos os colaboradores responsáveis pela liberação de notas sobre impostos, CFOP e ST.',
        'Acompanhamento rigoroso das transferências com implantação de lacres nos caminhões.',
        'Cadastro de códigos de itens de matéria-prima pelo time de prevenção para coleta via sistema.',
        'Cobrança sistemática sobre canhotos retidos e comunicação com o comercial.',
        'Priorização efetiva do recebimento de produtos perecíveis.',
        'Criação de espaço reservado e fechado para liberadores de notas.'
      ]
    },
    {
      title: 'Reunião de 03 de Julho de 2025',
      date: 'Mudança de Foco Estratégico',
      objective: 'Esta reunião marcou uma mudança estratégica no foco da consultoria, direcionando esforços específicos para o setor de açougue. A reunião estabeleceu um cronograma detalhado para a prevenção de perdas.',
      discussions: [
        'Definição de foco total no setor de açougue como prioridade estratégica.',
        'Implementação de programa de limpeza nos setores da matriz solo para evitar aglomeração de pragas.',
        'Criação de calendário dos colaboradores de prevenção para definir disponibilidade nas lojas.',
        'Alinhamento dos pontos específicos de fiscalização no setor de açougue.',
        'Estabelecimento de cronograma de balanço no açougue.',
        'Implementação de atas semanais da prevenção.',
        'Definição de reuniões semanais para alinhamento.'
      ],
      actions: [
        'Aplicação imediata do foco total no setor de açougue.',
        'Início da fiscalização sistemática da limpeza nos setores.',
        'Implementação do calendário de fiscalização nas lojas.',
        'Início da cobrança de atas semanais.',
        'Implantação do processo de fiscalização de pesagem do sebo/perdas.'
      ]
    },
    {
      title: 'Reunião de 14 de Agosto de 2025',
      date: 'Aperfeiçoamento no Açougue',
      objective: 'Esta reunião representou o ápice do foco no setor de açougue, com a participação da Mercattoria e implementação de um sistema estruturado de balanços periódicos. A reunião estabeleceu protocolos detalhados para controle de estoque e prevenção de perdas específicas do setor.',
      discussions: [
        'Iniciação formal do balanço e conferência dos processos no setor de açougue.',
        'Coordenação com o setor de compras para quantidades adequadas nos dias de balanço.',
        'Organização prévia das câmaras frias um dia antes do balanço.',
        'Padronização de balanços em dia específico da semana em todas as lojas.',
        'Conscientização sobre processos de recebimento e armazenamento de bovinos, suínos e aves.',
        'Revisão do rendimento das novilhas.',
        'Controle rigoroso de perdas e saída do sebo.'
      ],
      actions: [
        'Início dos balanços a partir do mês seguinte com intervalos de 28 dias.',
        'Comunicação sistemática das datas ao setor de compras.',
        'Comunicação prévia aos líderes para organização das câmaras frias.',
        'Realização dos balanços nas segundas-feiras a partir das 6h da manhã.',
        'Acompanhamento rigoroso da entrada de bovinos, suínos e aves.',
        'Novo cálculo de rendimento das novilhas com o fiscal do açougue.',
        'Fiscalização das 10 carnes com maiores divergências após cada balanço.'
      ]
    },
  ];

  const implementationsData = [
    {
      title: 'Monitoramento e Controle de Transferências',
      description: 'Sistema robusto com lacres descartáveis e rastreamento via WhatsApp.',
      icon: '🚚',
      fullDescription: 'Uma das principais conquistas da consultoria foi a implementação de um sistema robusto de monitoramento de transferências entre lojas. Esta implementação incluiu a introdução de lacres descartáveis para caminhões e o desenvolvimento de um sistema de rastreio de rotas utilizando tecnologia acessível como o compartilhamento de localização via WhatsApp.',
      subpoints: [
        'Os resultados foram significativos na redução de erros e perdas durante o transporte de mercadorias.',
        'Proporcionou maior segurança e controle sobre os produtos em trânsito entre as unidades.'
      ]
    },
    {
      title: 'Otimização do Recebimento',
      description: 'Treinamento contínuo e padronização para reduzir erros em notas fiscais.',
      icon: '📋',
      fullDescription: 'A consultoria identificou problemas críticos no processo de recebimento de mercadorias, especialmente relacionados a erros em notas fiscais. Foi implementado um programa abrangente de treinamento e padronização que incluiu reciclagem de colaboradores responsáveis pela liberação de notas sobre impostos, CFOP e ST.',
      subpoints: [
        'Redução significativa de erros em notas de entrada.',
        'Melhoria na comunicação entre setores durante o processo de recebimento.',
        'Padronização de horários e procedimentos para transferências.',
        'Criação de espaços dedicados para liberadores de notas.'
      ]
    },
    {
      title: 'Foco Estratégico no Açougue',
      description: 'Implementação de balanços periódicos e controle rigoroso de perdas.',
      icon: '🥩',
      fullDescription: 'O setor de açougue recebeu atenção especial com a implementação de um sistema estruturado de balanços periódicos. Esta abordagem incluiu a coordenação com o setor de compras, organização prévia das câmaras frias e padronização de procedimentos em todas as lojas.',
      subpoints: [
        'Balanços realizados a cada 28 dias com protocolos rigorosos.',
        'Melhoria significativa no controle de estoque de carnes.',
        'Redução de perdas através de fiscalização sistemática.',
        'Novo cálculo de rendimento das novilhas com maior precisão.',
        'Controle rigoroso da saída de sebo e subprodutos.'
      ]
    },
    {
      title: 'Cultura de Prevenção',
      description: 'Estabelecimento de reuniões semanais e atas para acompanhamento contínuo.',
      icon: '📊',
      fullDescription: 'A consultoria estabeleceu uma cultura organizacional focada na prevenção de perdas através da implementação de reuniões semanais de alinhamento e a obrigatoriedade de atas semanais da prevenção. Esta mudança cultural promoveu maior engajamento dos colaboradores e melhor comunicação entre os setores.',
      subpoints: [
        'Reuniões semanais de alinhamento entre todos os setores.',
        'Atas semanais documentando ações e resultados.',
        'Maior participação dos gerentes na cobrança dos processos.',
        'Calendário estruturado de fiscalização nas lojas.',
        'Acompanhamento sistemático de indicadores de performance.'
      ]
    },
  ];

  const conclusionsData = [
    {
      title: 'Redução Significativa de Perdas',
      description: 'Implementação de controles rigorosos resultou em diminuição mensurável das perdas operacionais.',
      icon: '📉'
    },
    {
      title: 'Melhoria nos Processos',
      description: 'Padronização e otimização de procedimentos em todos os setores críticos.',
      icon: '⚙️'
    },
    {
      title: 'Engajamento da Equipe',
      description: 'Maior participação e comprometimento dos colaboradores com os objetivos organizacionais.',
      icon: '👥'
    },
    {
      title: 'Controle de Qualidade',
      description: 'Estabelecimento de padrões rigorosos de qualidade e acompanhamento contínuo.',
      icon: '✅'
    }
  ];

  const handleMeetingClick = (index) => {
    setSelectedMeeting(timelineData[index]);
    setIsMeetingModalOpen(true);
  };

  const closeMeetingModal = () => {
    setIsMeetingModalOpen(false);
    setSelectedMeeting(null);
  };

  const handleImplementationClick = (index) => {
    setSelectedImplementation(implementationsData[index]);
    setIsImplementationModalOpen(true);
  };

  const closeImplementationModal = () => {
    setIsImplementationModalOpen(false);
    setSelectedImplementation(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            <nav className="hidden md:flex space-x-8">
              <a href="#timeline" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
                Timeline
              </a>
              <a href="#implementacoes" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
                Implementações
              </a>
              <a href="#conclusoes" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
                Conclusões
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-green-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Consultoria em Prevenção de Perdas
          </h1>
          <p className="text-xl text-gray-700 font-light mb-8 max-w-3xl mx-auto leading-relaxed">
            Relatório detalhado das atividades, implementações e resultados obtidos durante o período de consultoria especializada em prevenção de perdas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#timeline"
              className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Ver Timeline
            </a>
            <a
              href="#implementacoes"
              className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-teal-600"
            >
              Ver Resultados
            </a>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Timeline das Reuniões"
            subtitle="Acompanhe a evolução cronológica das principais reuniões e marcos do projeto."
          />
          <div className="flex flex-col space-y-8">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                title={item.title}
                date={item.date}
                index={index}
                onClick={() => handleMeetingClick(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Implementações e Resultados Section */}
      <section id="implementacoes" className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Implementações e Resultados"
            subtitle="Principais conquistas e o impacto positivo das ações tomadas."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {implementationsData.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
                index={index}
                onClick={() => handleImplementationClick(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Conclusões e Recomendações Section */}
      <section id="conclusoes" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Conclusões e Recomendações"
            subtitle="A consultoria demonstrou eficácia notável na identificação de gargalos e na proposição de soluções."
          />
          <div className="flex flex-col md:flex-row md:space-x-12">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Principais Conquistas</h3>
              <ul className="list-none space-y-6">
                {conclusionsData.map((item, index) => (
                  <ConclusionItem key={index} {...item} index={index} />
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Impacto Organizacional e Recomendações</h3>
              <p className="text-gray-700 font-light leading-relaxed mb-6">
                As implementações resultaram em uma transformação cultural significativa na organização, com maior engajamento dos colaboradores. Para garantir a sustentabilidade dos resultados, a consultoria recomenda:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 font-light">
                <li>Manutenção das reuniões semanais de alinhamento.</li>
                <li>Continuidade dos treinamentos periódicos sobre processos e procedimentos.</li>
                <li>Expansão gradual do modelo de balanços periódicos para outros setores.</li>
                <li>Monitoramento contínuo dos indicadores de perdas e eficiência.</li>
                <li>Avaliação regular da eficácia das implementações.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <p className="text-gray-400 font-light">&copy; {new Date().getFullYear()} Mercattoria. Todos os direitos reservados.</p>
          <p className="text-gray-400 font-light mt-2">Consultor: Ricardo Higa</p>
        </div>
      </footer>

      {/* Modal Condicional para Reuniões */}
      <MeetingModal
        isOpen={isMeetingModalOpen}
        onClose={closeMeetingModal}
        content={selectedMeeting}
      />

      {/* Modal Condicional para Implementações */}
      <ImplementationModal
        isOpen={isImplementationModalOpen}
        onClose={closeImplementationModal}
        content={selectedImplementation}
      />
    </div>
  );
}

