import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';

import {
  Form, SubmitButton, List,
} from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    error: false,
    repositories: [],
    loading: false,
  };

  // Carregar os dados do localStorage.
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados no localStorage.
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositores !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  }

  handleSubimit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    try {
      const { newRepo, repositories } = this.state;

      // Verifica se o usuário deixou o input em branco.
      if (newRepo === '') {
        throw new Error('Você precisa informar um repositório');
      }

      // Verifica se o repositório já existe.
      const repoExists = repositories.find(repository => repository.name === newRepo);

      if (repoExists) {
        throw new Error('Repositório duplicado');
      }

      const response = await api.get(`/repos/${ newRepo }`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      });
    } catch (error) {
      this.setState({
        error: true,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }


  render() {
    const {
      newRepo, loading, repositories, error,
    } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={ this.handleSubimit } error={ error ? 1 : 0 }>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={ newRepo }
            onChange={ this.handleInputChange }
          />

          <SubmitButton loading={ loading ? 1 : 0 }>
            { loading
              ? <FaSpinner color="#fff" size={ 14 } />
              : <FaPlus color="#fff" size={ 14 } /> }

          </SubmitButton>
        </Form>

        <List>
          { repositories.map(repository => (
            <li key={ repository.name }>
              <span>{ repository.name }</span>
              <Link to={ `/repository/${ encodeURIComponent(repository.name) }` }>Detalhes</Link>
            </li>
          )) }
        </List>
      </Container>
    );
  }
}
