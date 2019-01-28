import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers';
import TodoList from '../components/TodoList';
import FetchError from '../components/FetchError';

class VisibleTodoList extends Component {
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        const { filter, fetchTodos } = this.props;
        fetchTodos(filter).then(() => console.log('done!'));
    }

    render() {
        const { isFetching, errorMessage, toggleTodo, todos } = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>;
        }
        if (errorMessage && !todos.length) {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={() => this.fetchData()}
                />
            );
        }

        return <TodoList todos={todos} onTodoClick={toggleTodo} />;
    }
}

const mapStateToProps = (state, { match }) => {
    const filter = match.params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        errorMessage: getErrorMessage(state, filter),
        isFetching: getIsFetching(state, filter),
        filter,
    };
};

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(actions.toggleTodo(id)),
    // receiveTodos: () => dispatch(actions.receiveTodos()),
    fetchTodos: filter => dispatch(actions.fetchTodos(filter)),
    // requestTodos: filter => dispatch(actions.requestTodos(filter)),
});

VisibleTodoList = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(VisibleTodoList)
);

export default VisibleTodoList;
