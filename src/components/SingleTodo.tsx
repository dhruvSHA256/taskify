import { Todo } from "../models/todo";
import "../index.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

interface SingleTodoProp {
    todo: Todo;
    todos: Todo[];
    completedTodos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, completedTodos, setTodos, setCompletedTodos }: SingleTodoProp) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, seteditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDone = (todo: Todo): void => {
        if (todo.isDone) {
            // shift to incomplete todos
            setCompletedTodos(completedTodos.filter(t => t.id !== todo.id));
            setTodos([...todos, todo]);
        }
        else {
            // add to completed todo and remove from incomplete list
            setTodos(todos.filter(t => t.id !== todo.id));
            setCompletedTodos([...completedTodos, todo]);
        }
        todo.isDone = !todo.isDone;
        // console.log(todos);
        // console.log(completedTodos);
    };

    const handleDelete = (id: number): void => {
        (todo.isDone) ?
            setCompletedTodos(completedTodos.filter((t) => t.id !== id)) :
            setTodos(todos.filter((t) => t.id !== id));
    };
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <form
            onSubmit={(e) => handleEdit(e, todo.id)}
            className={`todos__single`}
        >
            {edit ? (
                <input
                    ref={inputRef}
                    className="todos__single--text"
                    value={editTodo}
                    onChange={(e) => {
                        seteditTodo(e.target.value);
                    }}
                />
            ) : todo.isDone ? (
                <s className="todos__single--text">{todo.todo}</s>
            ) : (
                <span className="todos__single--text">{todo.todo}</span>
            )}

            <div>
                <span
                    className="icon"
                    onClick={() => {
                        if (!edit && !todo.isDone) setEdit(!edit);
                    }}
                >
                    <AiFillEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(todo.id)}>
                    <AiFillDelete />
                </span>
                <span className="icon" onClick={() => handleDone(todo)}>
                    <MdDone />
                </span>
            </div>
        </form>
    );
};

export default SingleTodo;
