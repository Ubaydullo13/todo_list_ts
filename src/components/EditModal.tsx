import React, { useRef } from 'react';

interface EditModalProps {
  initialValue: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ initialValue, onSubmit, onCancel }) => {
  const editTaskRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editTaskRef.current && editTaskRef.current.value.trim() !== '') {
      onSubmit(editTaskRef.current.value);
      editTaskRef.current.value = '';
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-slate-800 p-5 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-2">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name..."
            className="input input-bordered w-full mb-2"
            ref={editTaskRef}
            defaultValue={initialValue}
          />
          <div className="flex items-center gap-1">
            <button
              type="submit"
              className="btn btn-secondary w-[49%] max-w-xl text-fuchsia-50 text-lg"
            >
              EDIT
            </button>
            <button
              onClick={onCancel}
              className="btn btn-error w-[49%] max-w-xl text-fuchsia-50 text-lg"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
