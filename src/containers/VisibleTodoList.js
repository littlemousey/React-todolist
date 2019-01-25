import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos } from '../reducers';
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
        const { filter, fetchTodos } = this.props;
        fetchTodos(filter);
    }

    render() {
        const { ...rest } = this.props;
        return <TodoList {...rest} />;
    }
}

const mapStateToProps = (state, { match }) => {
    const filter = match.params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        filter,
    };
};

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(actions.toggleTodo(id)),
    receiveTodos: () => dispatch(actions.receiveTodos()),
    fetchTodos: filter => dispatch(actions.fetchTodos(filter)),
});

VisibleTodoList = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(VisibleTodoList)
);

export default VisibleTodoList;
