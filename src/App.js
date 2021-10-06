import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth'
import initializeAuthentication from './Firebase/firebase.initialize';
import { useState } from 'react';


initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubprovider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({})

  const auth = getAuth();

  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubprovider)
      .then(result => {
        console.log(result.user)
        const { displayName, email, photoURL } = result.user;
        const logginUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(logginUser);
      })
  }

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        console.log(result.user);
        const { displayName, email, photoURL } = result.user;
        const logginUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(logginUser);
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const handleSignOut = () => {
    signOut(auth)
    setUser({})
  }
  return (
    <div className="App">
      {!user.name ?
        <div>
          <button onClick={handleGoogleSignIn}>Sing in Google</button>
          <button onClick={handleGitHubSignIn}>GitHub sign in</button>
        </div> :
        <button onClick={handleSignOut}>Sign Out</button>
      }
      <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <p>This is you</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
