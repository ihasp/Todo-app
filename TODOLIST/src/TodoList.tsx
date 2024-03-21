import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  //update localstorage przy zmianie todo
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [input, setInput] = useState<string>("");

  //handler do przekreślenia
  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  //handler dodania przyciskiem
  const handleClick = () => {
    const newTodo: Item = { id: Date.now(), text: input, completed: false };
    if (newTodo.text !== "") {
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };
  //handler usuwania todo
   const handleDeleteClick = () => {
     const filteredTodos = todos.filter((todo) => !todo.completed);
     setTodos(filteredTodos);
     localStorage.setItem("todos", JSON.stringify(filteredTodos));
   };

     const formatDate = (date: Date) => {
       return date.toLocaleString();
     };

  return (
    <div className="main-container">
      <div>
        <div className="col" style={{display:"flex", justifyContent:"center", flexDirection:"row"}}>
          <h1>TODO LIST</h1>
          <button className="btn btn-danger" style={{marginLeft:"10px", maxHeight:"37.6px", display:"block", marginTop:"7px"}}
                  onClick={handleDeleteClick}>Usuń</button>
        </div>
        <ul className="card">
          {todos.map((todo) => (
            <li
              className=""
              key={todo.id}
              onClick={() => handleToggle(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none" 
              }}
            >
              {todo.text} - {formatDate(new Date(todo.id))}
            </li>
          ))}
        </ul>

        <div
          style={{
            maxWidth: "500px",
            marginTop: "20px",
            marginBottom: "10px",
            display: "flex",
          }}
        >
          <input
            type="text"   
            placeholder="Dodaj do listy"
            className="form-control"
            onChange={(e) => setInput(e.currentTarget.value)}
            value={input}
          />
          <button
            onClick={handleClick}
            className="btn btn-primary"
            style={{ marginLeft: "5px" }}
          >
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
};
