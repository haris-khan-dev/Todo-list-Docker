import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from backend
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load todos. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      setTodos([...todos, response.data]);
      setError(null);
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add todo. Please try again.');
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !todo.completed
      });
      setTodos(todos.map(t => t.id === id ? response.data : t));
      setError(null);
    } catch (err) {
      console.error('Error toggling todo:', err);
      setError('Failed to update todo. Please try again.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(t => t.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo. Please try again.');
    }
  };

  const updateTodo = async (id, newTitle) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        title: newTitle
      });
      setTodos(todos.map(t => t.id === id ? response.data : t));
      setError(null);
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo. Please try again.');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">📝 My Todo List</h1>
        
        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)} className="close-btn">×</button>
          </div>
        )}

        <TodoForm onAdd={addTodo} />

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        )}

        {!loading && todos.length === 0 && (
          <div className="empty-state">
            <p>No todos yet! Add one above to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

