import { initializeApp  } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"; 
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
 
const firebaseConfig = {
  apiKey: "AIzaSyDZQQ0Zq7YjzY3Bc6ecJ3snq05NNE7L-58",
  authDomain: "netflix-clone-14090.firebaseapp.com",
  projectId: "netflix-clone-14090",
  storageBucket: "netflix-clone-14090.firebasestorage.app",
  messagingSenderId: "561755701701",
  appId: "1:561755701701:web:731de63bd295f511904bac"
};

 
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email,password)=>{
    try{
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db,"user"), {
        uid:user.uid,
        name,
        authProvider:"local",
        email,
       })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login =async (email,password)=>{
    try {
        await  signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};