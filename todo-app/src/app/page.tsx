'use client'

import { Dispatch, SetStateAction, useState } from "react";

import Todo from './components/Todo';
import ErrorContainer from "./components/ErrorContainer";
import CustomInput, { CUSTOM_INPUT_DEFAULT_OPTIONS } from "./components/CustomInput";
import { text } from "stream/consumers";


export default function HomePage() {

	const [todoTitle, setTodoTitle] = useState<string>("");
	const [todoDescription, setTodoDescription] = useState<string>("");
	const [todos, setTodos] : [{[index: number]: { title: string, description: string }}, Dispatch<SetStateAction<{[index: number]: { title: string, description: string}}>>] = useState({});

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
		const index: number = Object.keys(todos).length;
		setTodos(prev => { return { ...prev, [index]: { title: todoTitle, description: todoDescription }}; });
	}

	return (
		<div className="flex flex-col items-center">
			<ErrorContainer />
			<div id="new-todo" className="flex flex-col items-center p-[20px] w-[60%] [&>*]:m-[10px]">
				<h1>Create a todo</h1>				
				<CustomInput inputType={"text"}  options={{ ...CUSTOM_INPUT_DEFAULT_OPTIONS, placeholder: "Title for todo; ex: Shopping list, Chores, etc.", inputStyle: { width: "100%"}, maxLength: 50 }} />
				<CustomInput inputType={"textarea"} stateStorage={[todoDescription, setTodoDescription]} options={{ ...CUSTOM_INPUT_DEFAULT_OPTIONS, inputStyle: { width: "100%", minHeight: "200px", paddingBottom: "20px !important", overflow: "hidden"}, maxLength: 1000 }} />
				<button className="input-base-styles w-[40%]" onClick={() => createTodo()}>Create Todo</button>
			</div>
			<div className="separator w-[80%]"></div>
			<div id="todos" className="flex flex-col  items-center w-full">
				<h1 className="text-[1.5rem] ">Todos</h1>
				<div id="todos-list" className="flex flex-row justify-center flex-wrap w-[90%]">
					{Object.keys(todos).map((_, index) => {
						const { title, description } = todos[index];
						return <Todo key={index} title={title} description={description}/>;
					})}
				</div>
			</div>
		</div>
	);
}
