import { Todo } from "../models/todo";
import "../index.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

interface SingleTodoProp {
    index: number;
    todo: Todo;
    todos: Todo[];
    completedTodos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({
    index,
    todo,
    todos,
    completedTodos,
    setTodos,
    setCompletedTodos,
}: SingleTodoProp) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, seteditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDone = (todo: Todo): void => {
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
    };

    const handleDelete = (id: number): void => {
        todo.isDone
            ? setCompletedTodos(completedTodos.filter((t) => t.id !== id))
            : setTodos(todos.filter((t) => t.id !== id));
    };

    const handleEdit = (e: React.FormEvent, todo: Todo) => {
        e.preventDefault();
        !todo.isDone ? setTodos(
            todos.map((t) => (t.id === todo.id ? { ...t, todo: editTodo } : t))
        ) : setCompletedTodos(
            completedTodos.map((t) => (t.id === todo.id ? { ...t, todo: editTodo } : t))
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
                    onSubmit={(e) => handleEdit(e, todo)}
                    className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
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
                                if (!edit) setEdit(!edit);
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
            )}
        </Draggable>
    );
};

export default SingleTodo;
