import React from 'react';
import { useState } from 'react';
import { signupUser } from './services/fetch-utils';

export default function AuthPage({ setUser }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  async function handleSubmit(e) {
    e.preventDefault();
    const user = await signupUser(email, password, username);
    setUser(user);
  }


  function handleSignInClick() {  

  }

  return (

    <div className='auth'>
      <form
        onSubmit={handleSubmit}
      >
        <label>
          Email: 
          <input 
            type='email'
            onChange={(e)=> setEmail(e.target.value)}
            name='email'
            required
          ></input>
        </label>
        <label>
          Username:
          <input
            onChange={(e)=> setUsername(e.target.value)}
            name='username'
          ></input>
        </label>
        <label>
          Password:
          <input
            onChange={(e)=> setPassword(e.target.value)}
            type='password'
            name='password'
          ></input>
        </label>
        <button>Sign Up</button>
        <button
          onClick={handleSignInClick}
        >Already a user? Sign In...</button>
      </form>
    </div>
  );
}
