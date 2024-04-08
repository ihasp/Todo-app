import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "./components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
    <div
      className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 w-screen h-screen justify-center"
      style={{ overflowX: "hidden" }}
    >
      <Card className="m-3 shadow-md row-span-3" style={{ minWidth: "15em" }}>
        <CardContent className="grid gap-2">
          <CardTitle className="mt-4 ml-2 ">Zadania</CardTitle>
          <div className="flex items-center space-x-4 rounded-md border p-2 mt-2">
            <BellIcon />
            <p className="text-sm font-medium ml-1 mb-0 pr-6">
              Twoje zadania na dziś
            </p>
          </div>
          <Button onClick={handleDeleteClick} variant={"outline"}>
            Usuń wykonane
          </Button>
          <ul>
            {todos.map((todo) => (
              <li
                className="flex items-center space-x-4 rounded-md border p-3 mt-2"
                key={todo.id}
                onClick={() => handleToggle(todo.id)}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                <p className="basis-3/4 ml-2">{todo.text}</p>
                <CardDescription>
                  <p className="basis-1/4">{formatDate(new Date(todo.id))}</p>
                </CardDescription>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <div className="m-3">
        <Textarea
          placeholder="Dodaj do listy"
          className="max-h-2"
          onChange={(e) => setInput(e.currentTarget.value)}
          value={input}
        />
        <Button
          className="w-full mt-2"
          onClick={handleClick}
          variant={"outline"}
        >
          Dodaj
        </Button>
      </div>
    </div>
  );
};
