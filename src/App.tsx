import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), done: false }]);
    setInput("");
  };

  const toggle = (id: number) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: number) =>
    setTodos(todos.filter((t) => t.id !== id));

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Todo App</h1>
      {todos.length > 0 && (
        <p style={{ color: "#888", fontSize: "0.85rem" }}>{remaining} remaining</p>
      )}
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="What needs to be done?"
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button onClick={addTodo} style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}>
          Add
        </button>
      </div>
      <ul style={{ paddingLeft: 0, listStyle: "none", marginTop: "1rem" }}>
        {todos.map((t) => (
          <li key={t.id} style={{ marginBottom: "0.5rem" }}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span style={{ textDecoration: t.done ? "line-through" : "none", marginLeft: "0.5rem" }}>
              {t.text}
            </span>
            <button onClick={() => remove(t.id)} style={{ marginLeft: "0.5rem" }}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
