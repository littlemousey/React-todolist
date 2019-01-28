import { v4 } from 'node-uuid';
import * as api from '../api';

export const requestTodos = filter => ({
    type: 'REQUEST_TODOS',
    filter,
});

export const fetchTodos = filter =>
    api.fetchTodos(filter).then(response => receiveTodos(filter, response));

export const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response,
});

export const addTodo = text => ({
    type: 'ADD_TODO',
    id: v4(), // generate unique id
    text,
});

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id,
});

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
};
