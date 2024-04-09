import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        editTodo: (state, action: PayloadAction<Todo>) => {
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
            );
        },
        toggleCompleted: (state, action: PayloadAction<{ id: number, completed: boolean }>) => {
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
            );
        },
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
        },
    },
});

export const { addTodo, deleteTodo, editTodo, toggleCompleted, setTodos } = todoSlice.actions;

export default todoSlice.reducer;