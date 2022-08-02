import React, { useState } from "react";
import "./index.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./models/todo";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination || source === destination) return;

        let todo: Todo;
        if (source.droppableId === "incompleteTodos") {
            todo = todos[source.index];
        }
        else {
            todo = completedTodos[source.index];
        }
        if (todo.isDone) {
            // shift to incomplete todos
            setCompletedTodos(completedTodos.filter((t) => t.id !== todo.id));
            setTodos([...todos, todo]);
        } else {
            // add to completed todo and remove from incomplete list
            setTodos(todos.filter((t) => t.id !== todo.id));
            setCompletedTodos([...completedTodos, todo]);
        }
        todo.isDone = !todo.isDone;
        // console.log(todos);
        // console.log(completedTodos);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
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
        </DragDropContext>
    );
};
export default App;
