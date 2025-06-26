import { Dispatch, SetStateAction, useEffect, useState, JSX } from "react";
import ErrorTile from "./error";
import { generateUnsecureHash } from '../lib/extras';

export default function ErrorContainer() {

    const [errorList, setErrorList]: [{ [paramName: string]: string }, Dispatch<SetStateAction<{ [paramName: string]: string }>>] = useState<{ [paramName: string]: string }>({});

    let errorMessages: { [paramName: string]: string } = {};

    /**
     * This is the method attached to the ``handleError`` event listener
     * @param event The event object
     */
    const errorListener = (event: CustomEventInit<string>) => {
        const hash = generateUnsecureHash();
        setErrorList(prev => {
            if (Object.keys(prev).length >= 3) return prev;
            return { [hash]: errorMessages[event.detail ? event.detail : "default"], ...prev };
        });
    }

    /**
     * A method to pass on to a child to remove an item from the state.
     * @param id The id to remove
     */
    const deleteError = (id: string) => {
        setErrorList(prev => { 
            const { [id]: _, ...newObj } = prev; 
            return newObj; 
        });
    }

    useEffect(() => {
        // Adds custom event listener to the window to listen for any and all dispatched events for this.
        window.addEventListener("handleError", errorListener);
        // Fetch the error msgs from a json file.
        fetch("./lib/errorMsgs.json").then(res => res.json()).then(res => errorMessages = res);
        return () => {
            window.removeEventListener("handleError", errorListener);
        }
    }, []);

    return (
        <div id="error-container" className="absolute top-0 right-0 mt-[30px] mr-[30px] z-[100]">
            {Object.keys(errorList).map((id, index) => { 
                if (index >= 0 && index <= 2) {
                    return <ErrorTile 
                        key={id} 
                        errorMsg={errorList[id]} 
                        id={id} 
                        deleteError={deleteError}
                    />;
                }
            })}
        </div>
    );
}