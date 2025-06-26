'use client'

import { Dispatch, SetStateAction, useState } from "react";

import Todo from './components/todo';
import CharCount from "./components/charCount";
import ErrorContainer from "./components/errorContainer";


export default function HomePage() {

	const [todoInput, setTodoInput] = useState({ title: "", description: "" });
	const [todos, setTodos] : [{[index: number]: { title: string, description: string }}, Dispatch<SetStateAction<{[index: number]: { title: string, description: string}}>>] = useState({});

	let error = "";

	const createTodo = () => {
		if (todoInput.description.length === 0 && todoInput.title.length === 0) {
			error = "todo.missing.both";
		} else if (todoInput.title.length === 0) {
			error = "todo.missing.title";
		} else if (todoInput.description.length === 0) {
			error = "todo.missing.description";
		}
		if (error) {
			const errorEvent = new CustomEvent("handleError", { detail: error })
			window.dispatchEvent(errorEvent);
			return;
		}
		const index: number = Object.keys(todos).length;
		setTodos(prev => { return { ...prev, [index]: todoInput}; });
	}

	return (
		<div className="flex flex-col items-center">
			<ErrorContainer />
			<div id="new-todo" className="flex flex-col items-center p-[20px] w-[60%] [&>*]:m-[10px]">
				<h1>Create a todo</h1>
				<div className="relative w-[100%]">
					<CharCount currentLength={todoInput.title.length} maxLength={50}/>
					<input className="input-base-styles w-full" maxLength={50} placeholder="Shopping List, Things to work on, etc..." value={todoInput.title} onChange={({currentTarget}) => setTodoInput({ ...todoInput, title: currentTarget.value})} />
				</div>
				<div className="relative w-[100%]">
					<CharCount currentLength={todoInput.description.length} maxLength={1000}/>
					<textarea className="input-base-styles !pb-[20px] resize-none w-full min-h-[200px] overflow-hidden" maxLength={1000} placeholder="List of items or description" value={todoInput.description} onChange={({currentTarget}) =>{
					setTodoInput({ ...todoInput, description: currentTarget.value});
					currentTarget.style.height = "auto";
					currentTarget.style.height = `${currentTarget.scrollHeight}px`;
					
					}}></textarea>
				</div>
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
