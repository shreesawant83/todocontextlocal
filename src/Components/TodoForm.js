import { useState } from "react";
import {useTodo} from "../Context/Content"

function TodoForm() {
    const {addTodo} = useTodo();
    const [todo , Settodo] = useState("");
    const add =(e)=>{
        e.preventDefault();
        if(!todo){
            return
        }else{
            addTodo({todo, completed:false});
            Settodo("");
        }
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            value={todo}
            onChange={(e)=> Settodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

