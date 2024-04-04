import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "./components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BellIcon } from "@radix-ui/react-icons";
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
    <div className="grid w-screen h-screen justify-center">
      <div>
        <div className="">
          <h1>TODO LIST</h1>
          <Button className="" onClick={handleDeleteClick} variant={"outline"}>
            Usuń
          </Button>
        </div>
        <Card>
          <CardContent className="grid gap-4">
            <CardTitle className="mt-4 ml-2 ">Zadania</CardTitle>
            <div className="flex items-center space-x-4 rounded-md border p-2">
              <BellIcon />
              <p className="text-sm font-medium ml-1 pr-6">
                Twoje zadania na dziś
              </p>
            </div>

            <ul>
              {todos.map((todo) => (
                <li
                  className="flex items-center space-x-4 rounded-md border p-4 mt-1"
                  key={todo.id}
                  onClick={() => handleToggle(todo.id)}
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    cursor:"pointer"

                  }}
                >
                  {todo.text} - {formatDate(new Date(todo.id))}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <div
          style={{
            maxWidth: "500px",
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
          }}
        >
          <div className="grid w-full gap-2 mt-5">
            <Textarea
              placeholder="Dodaj do listy"
              className="max-h-2"
              onChange={(e) => setInput(e.currentTarget.value)}
              value={input}
            />
            <Button onClick={handleClick} variant={"outline"}>
              Dodaj
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
