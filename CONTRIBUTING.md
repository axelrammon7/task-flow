# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o Task Flow! Este documento fornece diretrizes para contribuições.

## 📋 Como Contribuir

### 1. Fork e Clone
```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/SEU-USUARIO/task-flow.git
cd task-flow
```

### 2. Configurar Ambiente
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

### 3. Criar Branch
```bash
git checkout -b feature/nova-funcionalidade
# ou
git checkout -b fix/correcao-bug
```

### 4. Desenvolver
- Siga as convenções de código existentes
- Escreva testes quando apropriado
- Mantenha commits pequenos e descritivos
- Use TypeScript para tipagem

### 5. Testar
```bash
# Verificar tipos
npm run typecheck

# Executar linting
npm run lint

# Build de produção
npm run build
```

### 6. Commit e Push
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
git push origin feature/nova-funcionalidade
```

### 7. Pull Request
- Crie um PR no GitHub
- Descreva claramente as mudanças
- Referencie issues relacionadas
- Aguarde review e feedback

## 📝 Convenções

### Commits
Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração de código
test: adiciona testes
chore: tarefas de manutenção
```

### Código
- Use TypeScript para tipagem
- Siga o ESLint configurado
- Use Prettier para formatação
- Nomes descritivos para variáveis e funções
- Comentários em português

### Componentes
- Um componente por arquivo
- Props tipadas com TypeScript
- Hooks customizados quando apropriado
- Responsividade com TailwindCSS

## 🐛 Reportar Bugs

Use o template de issue do GitHub:

1. **Título**: Descrição clara do bug
2. **Descrição**: Passos para reproduzir
3. **Comportamento esperado**: O que deveria acontecer
4. **Comportamento atual**: O que está acontecendo
5. **Screenshots**: Se aplicável
6. **Ambiente**: Navegador, OS, versão

## ✨ Sugerir Funcionalidades

1. Verifique se já não existe uma issue similar
2. Descreva a funcionalidade detalhadamente
3. Explique o caso de uso
4. Considere a complexidade de implementação
5. Discuta com a comunidade

## 📚 Estrutura do Projeto

```
app/
├── components/     # Componentes reutilizáveis
├── contexts/       # Contextos React
├── routes/         # Páginas da aplicação
├── stores/         # Estado global (Zustand)
├── types/          # Definições TypeScript
└── utils/          # Funções utilitárias
```

## 🧪 Testes

### Executar Testes
```bash
npm run test
```

### Cobertura
```bash
npm run test:coverage
```

### Testes E2E
```bash
npm run test:e2e
```

## 📖 Documentação

- Atualize o README.md quando necessário
- Documente APIs e componentes complexos
- Use JSDoc para funções importantes
- Mantenha exemplos de uso atualizados

## 🔄 Processo de Review

1. **Automático**: CI/CD executa testes e linting
2. **Manual**: Reviewers verificam código
3. **Feedback**: Discussão e melhorias
4. **Aprovação**: Merge após aprovação
5. **Deploy**: Deploy automático se aprovado

## 📞 Suporte

- **Issues**: Use o GitHub Issues
- **Discussões**: GitHub Discussions
- **Email**: seu.email@exemplo.com

## 🎯 Roadmap

- [ ] Testes unitários
- [ ] Testes E2E
- [ ] PWA (Progressive Web App)
- [ ] Temas personalizáveis
- [ ] Notificações push
- [ ] Colaboração em tempo real
- [ ] Mobile app (React Native)

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a licença MIT.

---

**Obrigado por contribuir com o Task Flow! 🚀**
