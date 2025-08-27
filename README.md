# Mercattoria - Consultoria em Prevenção de Perdas

Uma página de apresentação moderna e interativa desenvolvida em React para apresentar os resultados da consultoria em prevenção de perdas da Mercattoria.

## 🚀 Características

- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Animações Suaves**: Transições e animações elegantes usando Intersection Observer
- **Modais Interativos**: Detalhes expandidos para reuniões e implementações
- **Timeline Interativa**: Visualização cronológica das principais reuniões
- **Tecnologias Modernas**: React, Tailwind CSS, e componentes otimizados

## 🛠️ Tecnologias Utilizadas

- React 19
- Tailwind CSS
- React Intersection Observer
- Vite
- PNPM

## 📦 Instalação e Execução Local

```bash
# Clone o repositório
git clone <seu-repositorio>
cd mercattoria-presentation

# Instale as dependências
pnpm install

# Execute o servidor de desenvolvimento
pnpm run dev
```

## 🚀 Deploy no Vercel

### Opção 1: Deploy via GitHub (Recomendado)

1. **Faça push do código para o GitHub:**
   ```bash
   git add .
   git commit -m "feat: página de apresentação Mercattoria"
   git push origin main
   ```

2. **Conecte ao Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "New Project"
   - Selecione o repositório `mercattoria-presentation`
   - O Vercel detectará automaticamente que é um projeto Vite/React
   - Clique em "Deploy"

3. **Configurações automáticas:**
   - Build Command: `pnpm run build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`

### Opção 2: Deploy via Vercel CLI

```bash
# Instale a CLI do Vercel
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel

# Para deploy em produção
vercel --prod
```

## 📁 Estrutura do Projeto

```
mercattoria-presentation/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos personalizados
│   ├── index.css        # Estilos globais
│   └── main.jsx         # Ponto de entrada
├── vercel.json          # Configuração do Vercel
├── package.json
└── README.md
```

## 🎨 Funcionalidades

### Timeline Interativa
- Visualização cronológica das reuniões
- Animações de entrada escalonadas
- Modais com detalhes completos de cada reunião

### Cards de Implementação
- Apresentação visual das principais conquistas
- Hover effects e transições suaves
- Modais com descrições detalhadas

### Design Responsivo
- Layout adaptável para diferentes tamanhos de tela
- Navegação otimizada para mobile
- Componentes flexíveis

## 🔧 Scripts Disponíveis

- `pnpm run dev` - Servidor de desenvolvimento
- `pnpm run build` - Build para produção
- `pnpm run preview` - Preview do build de produção
- `pnpm run lint` - Verificação de código

## 📝 Customização

Para personalizar o conteúdo, edite os arrays de dados em `src/App.jsx`:

- `timelineData` - Dados das reuniões
- `implementationsData` - Dados das implementações
- `conclusionsData` - Dados das conclusões

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💼 Consultor

**Ricardo Higa**  
Especialista em Prevenção de Perdas

---

Desenvolvido com ❤️ para a Mercattoria

