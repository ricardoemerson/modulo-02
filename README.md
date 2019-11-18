<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>

<h3 align="center">
  Repositórios do GitHub - Aplicação desenvolvida durante o curso de ReactJS + Desafio 05
</h3>

<h3 align="center">
  #rocketseat, #reactjs, #axios, #prop-types, #react-icons, #react-router-dom, #styled-components
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-01?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

<p align="center">
  <a href="#rocket-sobre-a-aplicação">Sobre a Aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#telas-da-aplicação">Telas da Aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre a Aplicação

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app gerenciador de repositórios do GitHub, onde o usuário pode adicionar repositórios para acompanhar, podendo detalhar a descrição do repositório e listar a suas issues.

Abaixo segue todo o conteúdo que foi abordado no curso para o desenvolvimento da aplicação.

## Primeiro projeto com ReactJS

- Criando projeto do zero
- ESLint, Prettier & EditorConfig
- Roteamento no React
- Styled Components
- Estilos globais
- Estilizando página Main
- Adicionando repositórios
- Listando repositórios
- Utilizando LocalStorage
- Navegação de rotas
- Carregando dados da API
- Definindo PropTypes
- Exibindo repositório
- Exibindo issues

## :rocket: Sobre o desafio

Nesse desafio você adicionará novas funcionalidades na aplicação que desenvolvemos ao longo desse módulo.

### Funcionalidades

#### 1. Captando erros

Adicione um `try/catch` por volta do código presente na função `handleSubmit` presente no componente `Main` e caso um repositório não seja encontrado na API do Github adicione uma borda vermelha por volta do input em que o usuário digitou o nome do repositório.

#### 2. Repositório duplicado

Antes de fazer a chamada à API na função `handleSubmit` faça uma verificação para ver se o repositório não está duplicado, ou seja, se ele ainda não existe no estado de `repositories`.

Caso exista, dispare um erro, e com isso o código cairá no `catch` do `try/catch` criado na funcionalidade anterior.

```js
throw new Error('Repositório duplicado');
```

#### 3. Filtro de estado

Adicione um filtro de estado na listagem de Issues que criamos no detalhe do repositório. O estado representa se a issue está em aberto, fechada ou uma opção para exibir todas.

Exemplos de requisição:

```
https://api.github.com/repos/rocketseat/unform/issues?state=all
https://api.github.com/repos/rocketseat/unform/issues?state=open
https://api.github.com/repos/rocketseat/unform/issues?state=closed
```

Você pode encontrar a documentação [nesse link](https://developer.github.com/v3/issues/#parameters-1);

#### 4. Paginação

Adicione paginação nas issues listadas no detalhe do repositório. A API do Github lista no máximo 30 issues por página e você pode controlar o número da página atual por um parâmetro no endereço da requisição:

```
https://api.github.com/repos/rocketseat/unform/issues?page=2
```

Adicione apenas um botão de próxima página e página anterior. O botão de página anterior deve ficar desativado na primeira página.

## 📅 Entrega

Esse desafio **não precisa ser entregue** e não receberá correção, mas você pode ver o resultado do [código do desafio aqui](https://github.com/Rocketseat/bootcamp-gostack-desafio-05). Após concluir o desafio, adicionar esse código ao seu Github é uma boa forma de demonstrar seus conhecimentos para oportunidades futuras.

## Telas da Aplicação

### Página Principal
![Main](.github/main.png)

### Página Repositório
![Repository](.github/repository.png)

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com ♥ by Rocketseat :wave: [Entre na nossa comunidade!](https://discordapp.com/invite/gCRAFhc)
