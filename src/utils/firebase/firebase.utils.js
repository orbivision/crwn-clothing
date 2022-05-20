import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhB9-cX440RovNmI97k_qPtxgZ-uUjdb0",
  authDomain: "crwn-db-c54e7.firebaseapp.com",
  projectId: "crwn-db-c54e7",
  storageBucket: "crwn-db-c54e7.appspot.com",
  messagingSenderId: "765711518259",
  appId: "1:765711518259:web:7b4ebe7dbe0657549f3146",
  measurementId: "G-1P18JR2MSJ"
};
  
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};