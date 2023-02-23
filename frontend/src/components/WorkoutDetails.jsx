import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

function WorkoutDetails({ workout }) {

  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleDelete = async (e) => {

    if (!user) return;

    const response = await fetch("/api/workouts/" + workout._id, {
      method: 'DELETE',
      headers: {

        "Authorization": `Bearer ${user.token}`
      }

    })

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }

  }


  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Reps :</strong>{workout.reps}</p>
      <p><strong>Load (kg) :</strong> {workout.load}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span onClick={handleDelete}><FaTrashAlt /></span>
    </div>
  )
}

export default WorkoutDetails