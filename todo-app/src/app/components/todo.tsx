import '../css/todo.css'

export default function Todo({ title, description } : { title: string, description: string }) {

    return (
        <div className="todo-container">
            <div className="delete-todo leading-none">X</div>
            <h1 className="text-[1.7rem] truncate">{title}</h1>
            <p className="text-[0.8rem] max-w-full overflow-hidden text-ellipsis">{description}</p>
        </div>
    );
}