export default function CharCount({ currentLength, maxLength } : { currentLength: number, maxLength: number}) {
    
    return (
        <div className={`absolute bottom-0 right-0 p-[8px] text-[0.7rem] italic ${(currentLength / maxLength) >= 0.8 ? "text-red-900" : "text-gray-700"} ${currentLength > 0 ? "visible" : "invisible"}`}>
            {currentLength} / {maxLength}
        </div>
    );
}