import { useState } from 'preact/hooks'
import './app.css'
import hatImg from './assets/hat_temp.png'

// firebase imports
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

// hooks imports
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

const app = initializeApp({
  apiKey: "AIzaSyAA0Ii-nIZrHKFRzSp-PdbMh4uBNO5JCu4",
  authDomain: "from-a-hat.firebaseapp.com",
  projectId: "from-a-hat",
  storageBucket: "from-a-hat.appspot.com",
  messagingSenderId: "970433125945",
  appId: "1:970433125945:web:d0696b40833a195a4677e8"
});

const auth = getAuth(app)

function Menubar() {
  return (<div class="flex justify-end mb-5">
    <div class="w-5">
      <div class="w-full h-0.5 bg-white/75 mb-1 rounded-full"></div>
      <div class="w-full h-0.5 bg-white/75 mb-1 rounded-full"></div>
      <div class="w-full h-0.5 bg-white/75 mb-1 rounded-full"></div>
    </div>
  </div>);
}

function Landing({user, signIn}) {
  return(
    <>
      <img src={hatImg} alt="top hat" class="mx-auto my-0" />
      <h1 class="text-6xl font-sans font-semibold text-white text-violet-600">From a Hat</h1>
      <p class="text-gray-300 mt-3 mb-5 font-extralight text-justify">
        Get the party started! Create a custom hat and fill it with topics on your own or with a group.
        Whether you're on a date, at a game night, or breaking the ice with a new group,
        spice it up with topics <span class="font-semibold text-white">"From a Hat"</span>!
      </p>
      <button
        class="bg-violet-600 hover:bg-violet-500 px-5 py-2 w-full font-bold rounded-lg text-white"
        onClick={() => signIn()}>
        GET STARTED
      </button>
    </>
  )
}

function Hat({hat}) {
  return (
    <p>{hat.uid}</p>
  )
}

function HatList() {
  const [values, loading, error] = useCollectionDataOnce(collection(getFirestore(app), 'hats'));

  const createHat = () => {
    console.log('created a new hat')
  }

  return(
    <div>
      {error && <p class="bg-red-600 text-white">Error: {JSON.stringify(error)}</p>}
      {loading && <p>Collection: Loading...</p>}
      {values && (
        values.map(hat => <Hat hat={hat}/>)
      )}
      <div>Hat List</div>
      <button 
        class="bg-violet-600 hover:bg-violet-500 px-5 py-2 mt-5 w-full font-bold rounded-lg text-white"
        onClick={createHat}>
        Create a Hat
      </button>
    </div>
  )
}


export function App() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

  return (
    <div class="p-5">
      <Menubar />
      {user ? <HatList /> : <Landing user={user} signIn={signInWithGoogle} />}
    </div>
  );
}
