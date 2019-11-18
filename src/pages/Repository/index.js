import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading, Owner, IssueList, IssueFilter, PageActions,
} from './styles';

class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    filterState: [
      { state: 'all', title: 'Todas', active: true },
      { state: 'open', title: 'Abertas', active: false },
      { state: 'closed', title: 'Fechadas', active: false },
    ],
    filterIndex: 0,
    loadingFilteredData: false,
    page: 1,
  }

  async componentDidMount() {
    const { match } = this.props;
    const { filterState, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${ repoName }`),
      api.get(`/repos/${ repoName }/issues`, {
        params: {
          state: filterState[filterIndex].state,
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { filterState, filterIndex, page } = this.state;

    this.setState({ loadingFilteredData: true });

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${ repoName }/issues`, {
      params: {
        state: filterState[filterIndex].state,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data, loadingFilteredData: false });
  };

  handleFilter = async filterIndex => {
    await this.setState({ filterIndex });
    this.loadIssues();
  };

  handlePagination = async action => {
    const { page } = this.state;

    await this.setState({
      page: action === 'previous' ? page - 1 : page + 1,
    });

    this.loadIssues();
  };

  render() {
    const {
      loading, repository, issues, filterIndex, filterState, loadingFilteredData, page,
    } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={ repository.owner.avatar_url } alt={ repository.owner.login } />
          <h1>{ repository.name }</h1>
          <p>{ repository.description }</p>
        </Owner>

        <IssueList loadingFilteredData={ loadingFilteredData ? 1 : 0 }>
          <IssueFilter active={ filterIndex }>
            { filterState.map((filter, index) => (
              <button
                type="button"
                key={ filter.title }
                onClick={ () => this.handleFilter(index) }
              >{ filter.title }
              </button>
            )) }
          </IssueFilter>

          { issues.map(issue => (
            <li key={ String(issue.id) }>
              <img src={ issue.user.avatar_url } alt={ issue.user.login } />

              <div>
                <strong>
                  <a href={ issue.html_url }>{ issue.title }</a>

                  { issue.labels.map(label => (
                    <span key={ String(label.id) }>{ label.name }</span>
                  )) }
                  <p>{ issue.user.login }</p>
                </strong>
              </div>
            </li>
          )) }
        </IssueList>

        <PageActions>
          <button
            type="button"
            disabled={ page < 2 }
            onClick={ () => this.handlePagination('previous') }
          >
            Anterior
          </button>

          <span>Página { page }</span>

          <button type="button" onClick={ () => this.handlePagination('next') }>
            Próximo
          </button>
        </PageActions>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
