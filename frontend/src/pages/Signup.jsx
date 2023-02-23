import React, { useState } from 'react';
import { useSignup } from "../hooks/useSignup";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Signup</h3>

            <label >Email :</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label >Password :</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button disabled={isLoading}>Signup</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup