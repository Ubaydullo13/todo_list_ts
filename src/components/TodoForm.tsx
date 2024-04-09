import React, { useRef } from 'react';

interface TodoFormProps {
  onSubmit: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const todoRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (todoRef.current && todoRef.current.value.trim() !== '') {
      onSubmit(todoRef.current.value);
      todoRef.current.value = '';
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center gap-3 mt-5">
      <input
        ref={todoRef}
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-2xl"
        required
      />
      <button type="submit" className="btn btn-primary text-white">
        ADD
      </button>
    </form>
  );
};

export default TodoForm;
