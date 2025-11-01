import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleUpdate = () => {
    if (editTitle.trim() === '') {
      return;
    }
    onUpdate(todo.id, editTitle.trim());
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      {isEditing ? (
        <input
          type="text"
          className="todo-edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      ) : (
        <span
          className="todo-text"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      <div className="todo-actions">
        {!isEditing && (
          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
            title="Edit todo"
          >
            ✏️
          </button>
        )}
        <button
          className="delete-btn"
          onClick={() => onDelete(todo.id)}
          title="Delete todo"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;

