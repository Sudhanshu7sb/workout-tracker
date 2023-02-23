import React, { useEffect } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
    const { workouts, dispatch } = useWorkoutContext();
    const { user } = useAuthContext();



    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts",{
                headers:{
                    "Authorization" : `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: "SET_WORKOUTS", payload: json })
            }
        }
        if (user) {
            fetchWorkouts();
        }
    }, [dispatch])

    return (
        <div className='home'>
            <div className='workouts'>
                {workouts && workouts.map((workout) => (
                    <React.Fragment key={workout._id}>
                        <WorkoutDetails workout={workout} />

                    </React.Fragment>
                )
                )}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home