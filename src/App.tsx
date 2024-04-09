import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo, toggleCompleted, setTodos } from './redux/todoSlice';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
import EditModal from './components/EditModal';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface RootState {
  todo: {
    todos: Todo[];
  };
}

const App: React.FC = () => {
  const [editTodoItem, setEditTodoItem] = useState<Todo | null>(null);

  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    dispatch(setTodos(storedTodos));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (text: string) => {
    const todo: Todo = { id: Date.now(), text, completed: false };
    dispatch(addTodo(todo));
  };

  const handleToggleCompleted = (id: number, completed: boolean) => {
    dispatch(toggleCompleted({ id, completed }));
  };

  const handleEdit = (todo: Todo) => {
    setEditTodoItem(todo);
  };

  const handleEditSubmit = (text: string) => {
    if (editTodoItem) {
      dispatch(editTodo({ ...editTodoItem, text }));
      setEditTodoItem(null);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleCancelEdit = () => {
    setEditTodoItem(null);
  };

  return (
    <div className="max-w-[1200px] w-full box-border mx-auto">
      <h1 className="text-5xl text-center font-bold mt-5">Todo List</h1>
      <TodoForm onSubmit={handleAddTodo} />
      <ul className="flex flex-col items-center gap-3 mt-10">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleCompleted={handleToggleCompleted}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      {editTodoItem && (
        <EditModal
          initialValue={editTodoItem.text}
          onSubmit={handleEditSubmit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default App;
