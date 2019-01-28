import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos, getIsFetching } from '../reducers';
import TodoList from '../components/TodoList';

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
        const { filter, fetchTodos, requestTodos } = this.props;
        requestTodos(filter);
        fetchTodos(filter);
    }

    render() {
        const { isFetching, toggleTodo, todos } = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>;
        }

        return <TodoList todos={todos} onTodoClick={toggleTodo} />;
    }
}

const mapStateToProps = (state, { match }) => {
    const filter = match.params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        filter,
    };
};

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(actions.toggleTodo(id)),
    receiveTodos: () => dispatch(actions.receiveTodos()),
    fetchTodos: filter => dispatch(actions.fetchTodos(filter)),
    requestTodos: filter => dispatch(actions.requestTodos(filter)),
});

VisibleTodoList = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(VisibleTodoList)
);

export default VisibleTodoList;
