import { Todo } from "../models/todo";
import "../index.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

interface SingleTodoProp {
    todo: Todo;
    todos: Todo[];
    index: number;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos, index }: SingleTodoProp) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, seteditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDone = (id: number): void => {
        setTodos(todos.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t)));
    };
    const handleDelete = (id: number): void => {
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
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (

                <form
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
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
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </form>

            )}
        </Draggable>
    );
};

export default SingleTodo;
