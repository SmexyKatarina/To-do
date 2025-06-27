import { CSSProperties, Dispatch, SetStateAction, useState } from "react"
import { getHTMLPosition } from "../lib/extras";

export const CUSTOM_INPUT_DEFAULT_OPTIONS = { inputStyle: {}, charCount: { active: false, position: 8 }, maxLength: 50, placeholder: "Type here..." };

export default function CustomInput({ inputType, stateStorage, options = CUSTOM_INPUT_DEFAULT_OPTIONS }: { 
    inputType: 'text' | 'password' | 'email' | 'textarea'
    stateStorage?: [any, Dispatch<SetStateAction<any>>]
    options?: { inputStyle?: CSSProperties, charCount: { active: boolean, position: number }, maxLength: number, placeholder: string }
}) {
    const [value, setValue] = stateStorage || useState<string>("");
    const { inputStyle, maxLength, charCount, placeholder } = options;

    const CharCount = ({ currentLength, maxLength } : { currentLength: number, maxLength: number }) => {
        return (
            <div style={{ ...getHTMLPosition(charCount.position) }} className={`absolute p-[6px] text-[0.7rem] italic ${(currentLength / maxLength) >= 0.8 ? "text-red-900" : "text-gray-700"} ${currentLength > 0 ? "visible" : "invisible"}`}>
                {currentLength} / {maxLength}
            </div>
        );
    }
    
    if (inputType == "textarea")
        return ( 
            <div className="relative w-full">
                <textarea value={value} className={"input-base-styles"} style={inputStyle} maxLength={maxLength} onChange={({ currentTarget }) => { 
                    setValue(currentTarget.value); 
                    currentTarget.style.height = "auto";
					currentTarget.style.height = `${currentTarget.scrollHeight}px`; 
                }}></textarea>
                {!charCount.active ? <CharCount currentLength={value.length} maxLength={maxLength}/> : <></>}
            </div>
        );
    return (
        <div className="relative w-full">
            <input type={inputType} className={"input-base-styles"} style={inputStyle} placeholder={placeholder} maxLength={maxLength} value={value} onChange={({ currentTarget }) => { setValue(currentTarget.value) }}></input>
            {!charCount.active ? <CharCount currentLength={value.length} maxLength={maxLength}/> : <></>}
        </div>
    );
}

