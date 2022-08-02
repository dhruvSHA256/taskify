import React, { useState } from "react";
import "./index.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./models/todo";

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

    const handleAdd = (e: React.FormEvent): void => {
        e.preventDefault();
        if (todo) {
            setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
            setTodo("");
        }
    };


    return (
        <div className="App">
            <span className="heading">Taskify</span>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
            <TodoList
                todos={todos}
                completedTodos={completedTodos}
                setTodos={setTodos}
                setCompletedTodos={setCompletedTodos}
            />
        </div>
    );
};
export default App;
