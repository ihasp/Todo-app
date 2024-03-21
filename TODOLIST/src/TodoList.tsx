import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css"

interface item{
    id: number;
    text: string;
    completed: boolean;
}

export const TodoList: React.FC = () => {
   const [todos, setTodos] = useState<item[]>([
       /* {id:1, text: "test1", completed: false},
        {id:2, text: "test2", completed: false}
        */
    ])
    
    const [input, setInput] = useState<string>("");


    const handleToggle = (id:number) => {
        setTodos(
            todos.map((todo) => {
                if(todo.id === id){
                    return {...todo, completed: !todo.completed};
                }
                return todo;
            })
        )
    }

    const handleClick = () =>{
        const newTodo: item = {id: Date.now(), text:input, completed:false}
        if (newTodo.text !== ""){
            setTodos([...todos, newTodo]);
            setInput("");
        }

    }

    return (
      <div className="main-container">
        <div>
          <h1 style={{marginLeft:'30px'}}>TODO LIST</h1>
          <ul>
            {todos.map((todo)=>(
                <li key={todo.id} onClick={()=> handleToggle(todo.id)}
                  style={{textDecoration: todo.completed ? "line-through" : "none"}}>{todo.text}</li>
            ))}
          </ul>


          <div style={{maxWidth:'500px', marginTop: '20px', marginBottom:'10px', display: 'flex' }}>
            <input  
              type="text"
              placeholder="Dodaj do listy"
              className="form-control"
              onChange={(e)=>setInput(e.currentTarget.value)}
              value={input}
            />
          <button onClick={handleClick} className="btn btn-primary" style={{marginLeft:'5px'}}>Dodaj</button>
           </div>
        </div>
      </div>
    );
}