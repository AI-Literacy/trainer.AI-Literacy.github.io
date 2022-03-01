import React, { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import './App.css';
import { PacmanLoader } from 'react-spinners';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    auth.onAuthStateChanged(newUser => {
      if (newUser) {
        if (user === null) {
          setUser(newUser);
          setLoading(false);
        }
      } else {
        signInWithRedirect(auth, provider);
      }
    });
  })

  const addOn = loading 
    ? (
      <div className='fixed w-full h-full flex align-center z-50 bg-black bg-opacity-50'>
        <div className="flex w-full h-full justify-center">
          <div className="flex self-center">
            <PacmanLoader color={'white'} size={100} />
          </div>
        </div>
      </div>
    )
    : null;

  return (
    <>
    { addOn }
    <div className="app flex justify-center h-full align-middle">
      {
        user ? (
          <div className="flex flex-col justify-center h-full align-middle">
            <h1 className="text-3xl font-bold italic h-fit self-center">
              Welcome, {user.displayName}!
            </h1>
            <img 
              src={user.photoURL} 
              alt={user.displayName}
              className="rounded-full h-20 w-20 self-center mt-2"
            />
          </div>
        ) : null
      }
    </div>
    </>
  );
}

export default App;
