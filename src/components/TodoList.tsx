import React from "react";
import "../index.css";
import { Todo } from "../models/todo";
import SingleTodo from "./SingleTodo";

interface TodoListProps {
    todos: Todo[];
    completedTodos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<TodoListProps> = ({
    todos,
    completedTodos,
    setTodos,
    setCompletedTodos,
}: TodoListProps) => {
    return (
         <div className="container">
            <div className={`todos`} >
                <span className="todos__heading">Active Tasks</span>
                {todos?.map((todo) => (
                    <SingleTodo
                        todos={todos}
                        completedTodos={completedTodos}
                        todo={todo}
                        key={todo.id}
                        setTodos={setTodos}
                        setCompletedTodos={setCompletedTodos}
                    />
                ))}
            </div>
            <div className={`todos`} >
                <span className="todos__heading">Completed Tasks</span>
                {completedTodos?.map((todo) => (
                    <SingleTodo
                        todos={todos}
                        completedTodos={completedTodos}
                        todo={todo}
                        key={todo.id}
                        setTodos={setTodos}
                        setCompletedTodos={setCompletedTodos}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
