import { WorkoutContext } from "../context/workoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext);

    // console.log(context ,"context")
    if(!context){
        throw Error("useWorkoutContext must be used inside a WorkoutContextProvider ")
    }

    return context;
}