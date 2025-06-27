import { useEffect } from "react";

export default function ErrorTile({ errorMsg, id, deleteError } : { errorMsg: string, id: string, deleteError: any }) {

    useEffect(() => {
        const timeout = setTimeout(() => {
            deleteError(id);
        }, 4000);

        return () => {
            clearTimeout(timeout)
        }
    }, []);

    return (
        <div className={`flex flex-col items-center opacity-0 animate-(--animation-fadeinout) min-w-[300px] border border-black bg-[#380a0a] p-[10px] mb-[20px] min-h-[50px]`}>
            <div className="text-[1.2rem]">Error!</div>
            <div className="text-[0.7rem]">{errorMsg}</div>
        </div>
    );
}