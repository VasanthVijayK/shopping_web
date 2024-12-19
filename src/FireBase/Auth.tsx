import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile 
} from "firebase/auth";
import { auth, db } from "./fire_base";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
interface SignupData {
  user_email: string;
  user_name: string;
  mobile_no: string;
  password: string;
}
interface SigninData {
  email: string;

  password: string;
}

export const CreateUser = async (
  data: SignupData
): Promise<{ success: boolean; message: string }> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.user_email,
      data.password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name:data.user_name,
      email:data.user_email ,
      phone: data.mobile_no,
      createdAt: new Date().toISOString(),
    });
 
    return { success: true, message: "Signup successful!" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred." };
  }
};
export const SignInUser = async (data: SigninData) => {
    
  return signInWithEmailAndPassword(auth, data.email, data.password);
};

export const SignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    if (user) {
        const usersRef = collection(db, "users");
        const emailQuery = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(emailQuery);
        if (querySnapshot.empty) {
            await setDoc(doc(db, "users", user.uid), {
                name: user.email,
                email: user.email,
                phone: null,
                createdAt: new Date().toISOString(),
              });
          
              return { success: true, message: "Signup successful!" };
        }else{
            throw new Error("User document already exists with this email");
        }
    }
    
  
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred." };
  }
};
export const  SignOut = async() => {
    localStorage.clear()
  return await signOut(auth);
};
export const getUserDataByUID = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        console.log("User Data:", userDoc.data());
        return userDoc.data();
      } else {
        throw new Error("No such user exists!");
        
      }
    } catch (error: unknown) {
        if (error instanceof Error) {
          return { success: false, message: error.message };
        }
    }
  };
  export const getItemsFromFirestore = async () => {
    try {
      const collectionRef = collection(db, "items");
      const querySnapshot = await getDocs(collectionRef);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Fetched Items:", items);
      return items; 
    } catch (error: unknown) {
      console.error("Error fetching items from Firestore:", error);
      return [];
    }
  };
  export const updateItemField = async (itemId: string, field: string, value: boolean | number |string) => {
    try {
      const itemRef = doc(db, "items", itemId); 
      await updateDoc(itemRef, {
        [field]: value, 
      });
      console.log(`Successfully updated ${field} to ${value} for item with ID: ${itemId}`);
      return { message: `Successfully updated`};
    } catch (error: unknown) {
      console.error(`Error updating ${field} for item with ID: ${itemId}`, error);
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
    }
  };