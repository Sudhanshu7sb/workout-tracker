import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout = () => {

    const { dispatch } = useAuthContext();
    const {dispatch:workoutsDispatch} = useWorkoutContext();

    const logout = () => {
        // remove user from localStorage 

        localStorage.removeItem("user");

        // dispatch user as null in AuthContext

        dispatch({ type: "LOGOUT" });
        workoutsDispatch({type:'SET_WORKOUTS',payload:null})

    }

    return { logout }
}