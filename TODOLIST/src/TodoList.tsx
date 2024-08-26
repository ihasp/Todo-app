import React, { useEffect, useState } from "react";
import "./TodoList.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BellIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

const formatDate = (date: Date) => {
  return date.toLocaleString();
};

const filterOldTodos = (todoList: Item[]): Item[] => {
  const currentTime = Date.now();
  return todoList.filter((todo) => currentTime - todo.id < 24 * 60 * 60 * 1000);
};

//main
export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const parsedTodos: Item[] = JSON.parse(storedTodos);
      return filterOldTodos(parsedTodos);
    }
    return [];
  });

  const [input, setInput] = useState<string>("");
  const [showAlert, setShowAlert] = useState(true);

  //pozycja menu typu zadania na ekranie
  const [typeMenuPosition, setPosition] = React.useState("bottom");

  //update localstorage przy zmianie todo
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [showAlert]);

  /// HANDLE

  //handler dodania przyciskiem do listy
  const handleClick = () => {
    const newTodo: Item = { id: Date.now(), text: input, completed: false };
    if (newTodo.text !== "") {
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };
  //handler przekreslania
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
  //handler usuwania z listy "usun wykonane"
  const handleDeleteClick = () => {
    const filteredTodos = todos.filter((todo) => !todo.completed);
    setTodos(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  };

  return (
    <div className="maindiv grid grid-cols-1 md:grid-cols-4 grid-auto-rows w-screen h-screen justify-center">
      {/* glowny div */}
      {/* alert wyswietlany zaraz po uruchomieniu aplikacji */}
      {showAlert && (
        <Alert
          className="absolute max-w-fit bottom-5"
          style={{ marginLeft: "40rem" }}
        >
          {/* ciagle potrzebuje zmian */}
          <Info />
          <AlertTitle>Aplikacja uruchomiona/refresh</AlertTitle>
          <AlertDescription>Strona odświeżona</AlertDescription>
        </Alert>
      )}

      {/* Karta nr 1 */}
      <Card className="h-fit transparent-bg m-3 rounded-md">
        {/*brak flexu nie jest winą typu czy tych stylów /\ \/*/}
        <Card className="m-3 rounded-md">
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
                  <p className="mr-2">typ</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Card>
      {/* Karta nr 2 */}
      <Card className="h-fit card m-3 p-3 rounded-md transparent-bg">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <TooltipContent>
                <p>Wpisz swoje zadanie</p>
              </TooltipContent>
              <Textarea
                placeholder="Dodaj do listy"
                className="min-w-full min-h-28 mb-1"
                onChange={(e) => setInput(e.currentTarget.value)}
                value={input}
              />
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        {/* Przycisk typ zadania */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full mt-2">
              Wybierz typ zadania
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
              <Input id="input-category" placeholder="Wpisz typ zadania" />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={typeMenuPosition}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="">Dzień</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Przycisk dodania zadania */}
        <Button
          className="w-full mt-2"
          onClick={handleClick}
          variant={"outline"}
        >
          Dodaj
        </Button>
      </Card>
    </div>
  );
};
