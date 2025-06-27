import '../css/todo.css'

export default function Todo({ id, todoInfo, deleteTodo } : { id: string, todoInfo: { title: string, description: string, timeCreated: number }, deleteTodo: (id: string) => void }) {

    return (
        <div className="todo-container">
            <div className="delete-todo leading-none" onClick={() => { deleteTodo(id); }}>X</div>
            <h1 className="text-[1.7rem] truncate">{todoInfo.title}</h1>
            <p className="text-[0.8rem] max-w-full overflow-hidden text-ellipsis">{todoInfo.description}</p>
            <p className="text-[0.55rem] text-gray-700 absolute bottom-0 right-0 p-[5px]">(Created at: {new Date(todoInfo.timeCreated).toUTCString()})</p>
        </div>
    );
}