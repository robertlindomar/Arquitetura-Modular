# Arquitetura Modular e Limpa

Este é um projeto backend desenvolvido com Node.js, Express, TypeScript e Prisma, seguindo uma arquitetura modular e limpa.

## Arquitetura do Projeto

```
src/
├── modules/                    # Módulos da aplicação
│   ├── categoria/             # Módulo de Categorias
│   │   ├── controllers/       # Controladores
│   │   │   └── CategoriaController.ts
│   │   ├── dtos/             # Objetos de Transferência de Dados
│   │   │   ├── CategoriaRequest.ts
│   │   │   └── CategoriaResponse.ts
│   │   ├── models/           # Modelos de domínio
│   │   │   └── Categoria.ts
│   │   ├── repositories/     # Camada de acesso a dados
│   │   │   └── CategoriaRepository.ts
│   │   ├── services/         # Lógica de negócios
│   │   │   └── CategoriaService.ts
│   │   └── routes.ts         # Rotas do módulo
│
├── shared/                    # Recursos compartilhados
│   ├── database/             # Configurações do banco de dados
│   ├── middlewares/          # Middlewares da aplicação
│   └── utils/                # Utilitários
│
├── routes.ts                 # Roteador principal
└── server.ts                 # Ponto de entrada da aplicação
```

## Estrutura Modular

O projeto segue uma arquitetura modular, onde cada funcionalidade é encapsulada em seu próprio módulo. Cada módulo contém:

### 1. Controllers
- Responsáveis por receber as requisições HTTP
- Validam os dados de entrada
- Chamam os serviços apropriados
- Formatam as respostas

### 2. DTOs (Data Transfer Objects)
- Definem a estrutura dos dados de entrada e saída
- Garantem a tipagem correta dos dados
- Separam a representação dos dados da lógica de negócios

### 3. Models
- Representam as entidades do domínio
- Definem a estrutura dos dados
- São independentes da camada de persistência

### 4. Repositories
- Responsáveis pelo acesso aos dados
- Encapsulam a lógica de persistência
- Utilizam o Prisma para operações no banco de dados

### 5. Services
- Contêm a lógica de negócios
- Coordenam as operações entre repositories
- Implementam as regras de negócio

### 6. Routes
- Definem os endpoints da API
- Mapeiam URLs para controllers
- Gerenciam middlewares específicos do módulo

## Tratamento de Erros

O projeto implementa um tratamento de erros robusto para garantir respostas claras e seguras em caso de falhas:

- **Classe `AppError`**: Centraliza a criação de erros personalizados, permitindo definir mensagens e códigos de status HTTP específicos.
- **Middleware global de erros**: Todas as exceções não tratadas são capturadas por um middleware dedicado, que formata e retorna a resposta adequada ao cliente.
- **Mensagens descritivas**: Os erros retornam mensagens claras, facilitando o entendimento do problema tanto para desenvolvedores quanto para consumidores da API.
- **Códigos de status apropriados**: Cada erro retorna o código HTTP correspondente (por exemplo, 400 para erros de validação, 404 para não encontrado, 500 para erros internos).
- **Tratamento em cada camada**: Controllers, services e repositories lançam exceções específicas quando necessário, garantindo que falhas sejam propagadas corretamente.




## Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```
5. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Endpoints da API

### Categorias

- `POST /categoria` - Criar uma nova categoria
- `GET /categoria` - Listar todas as categorias
- `GET /categoria/:id` - Buscar categoria por ID
- `PUT /categoria/:id` - Atualizar categoria
- `DELETE /categoria/:id` - Deletar categoria

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request 
