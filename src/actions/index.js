import { v4 } from 'node-uuid';

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
