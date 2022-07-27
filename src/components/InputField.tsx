import "../index.css";
import React, { useRef } from "react";

interface InputFieldProps {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    todo,
    setTodo,
    handleAdd,
}: InputFieldProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form className="input" onSubmit={(e) => {
            handleAdd(e)
            inputRef.current?.blur();
        }}>
            <input
                ref={inputRef}
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                type="input"
                placeholder="Enter a Task"
                className="input__box"
            />
            <button className="input_submit" type="submit">
                Go
            </button>
        </form>
    );
};

export default InputField;
