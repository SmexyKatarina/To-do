'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Todo from './components/Todo';
import ErrorContainer from "./components/ErrorContainer";
import CustomInput, { CUSTOM_INPUT_DEFAULT_OPTIONS } from "./components/CustomInput";
import { text } from "stream/consumers";
import { generateUnsecureHash } from "./lib/extras";


export default function HomePage() {

	const [todoTitle, setTodoTitle] = useState<string>("");
	const [todoDescription, setTodoDescription] = useState<string>("");
	const [todos, setTodos] : [{[id: string]: { title: string, description: string, timeCreated: number }}, Dispatch<SetStateAction<{[index: string]: { title: string, description: string, timeCreated: number }}>>] = useState({});

	let error = "";

	const createTodo = () => {
		if (todoDescription.length === 0 && todoTitle.length === 0) {
			error = "todo.missing.both";
		} else if (todoTitle.length === 0) {
			error = "todo.missing.title";
		} else if (todoDescription.length === 0) {
			error = "todo.missing.description";
		}
		if (error) {
			const errorEvent = new CustomEvent("handleError", { detail: error })
			window.dispatchEvent(errorEvent);
			return;
		}
		const id: string = generateUnsecureHash();
		setTodos(prev => { 
			const newTodos = { ...prev, [id]: { title: todoTitle, description: todoDescription, timeCreated: Date.now() }}; 
			localStorage.setItem("todos", JSON.stringify(newTodos));
			return newTodos;
		});
		
	}

	const deleteTodo = (id: string) => {
		setTodos(prev => { const { [id]: _, ...newObj } = prev; localStorage.setItem("todos", JSON.stringify(newObj)); return newObj; })
	}

	useEffect(() => {
		let todos;
		if (todos = localStorage.getItem("todos")) {
			setTodos(JSON.parse(todos));
		}
	}, []);

	return (
		<div className="flex flex-col items-center">
			<ErrorContainer />
			<div id="new-todo" className="flex flex-col items-center p-[20px] w-[60%] [&>*]:m-[10px]">
				<h1>Create a todo</h1>				
				<CustomInput inputType={"text"} stateStorage={[todoTitle, setTodoTitle]} options={{ ...CUSTOM_INPUT_DEFAULT_OPTIONS, placeholder: "Title for todo; ex: Shopping list, Chores, etc.", inputStyle: { width: "100%"}, maxLength: 50 }} />
				<CustomInput inputType={"textarea"} stateStorage={[todoDescription, setTodoDescription]} options={{ ...CUSTOM_INPUT_DEFAULT_OPTIONS, placeholder: "A list for the items, the chores, etc.", inputStyle: { width: "100%", minHeight: "200px", paddingBottom: "20px !important", overflow: "hidden"}, maxLength: 1000 }} />
				<button className="input-base-styles w-[40%]" onClick={() => createTodo()}>Create Todo</button>
			</div>
			<div className="separator w-[80%]"></div>
			<div id="todos" className="flex flex-col  items-center w-full">
				<h1 className="text-[1.5rem] ">Todos</h1>
				<div id="todos-list" className="flex flex-row justify-center flex-wrap w-[90%]">
					{Object.keys(todos).map((id) => {
						return <Todo key={id} id={id} todoInfo={todos[id]} deleteTodo={deleteTodo}/>;
					})}
				</div>
			</div>
		</div>
	);
}
