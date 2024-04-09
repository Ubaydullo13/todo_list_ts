import React from 'react';
import { MdModeEdit, MdDelete } from 'react-icons/md';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

interface TodoItemProps {
  todo: Todo;
  onToggleCompleted: (id: number, completed: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleCompleted, onEdit, onDelete }) => {
  return (
    <li className="border rounded-lg flex items-center justify-between p-1 max-w-3xl w-full">
      <div className="flex items-center gap-4">
        <input
          onChange={(e) => {
            onToggleCompleted(todo.id, e.target.checked);
          }}
          checked={todo.completed}
          type="checkbox"
          className="checkbox checkbox-secondary rounded-full ml-3"
        />
        <span className={todo.completed ? 'line-through text-xl' : 'text-gray-300 text-xl'}>
          {todo.text}
        </span>
      </div>
      <div>
        <button onClick={() => onEdit(todo)} className="btn btn-ghost text-lg">
          <MdModeEdit />
        </button>
        <button onClick={() => onDelete(todo.id)} className="btn btn-ghost text-lg">
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
