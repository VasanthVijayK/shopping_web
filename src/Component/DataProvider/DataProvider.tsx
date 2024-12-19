import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import {auth} from "../../FireBase/fire_base"
interface ContextType {
  UserData: Record<string, any>;
  state: Item[];
  setState: React.Dispatch<React.SetStateAction<Item[]>>;
  Notifi:boolean;
   setNotifi:React.Dispatch<React.SetStateAction<boolean>>;
   message:string;
    setMessage:React.Dispatch<React.SetStateAction<string>>;
    Refresh:boolean;
     setRefresh:React.Dispatch<React.SetStateAction<boolean>>;
     cartCount:number;
     setCartCount:React.Dispatch<React.SetStateAction<number>>;
}

const ContextProvider = createContext<ContextType | null>(null);
type Protected = {
  children: React.ReactNode;
};
interface Item {
  id: number;
  name: string;
}
type UserData = {
  [key: string]: any;
};

export function DataProvider({ children }: Protected) {
  const [state, setState] = useState<Item[]>([]);
  const [Notifi, setNotifi] = useState<boolean>(false);
  const [Refresh, setRefresh] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [cartCount, setCartCount] = useState<number>(0);
  const [UserData,setUserData] = useState<UserData>({})
  /////////////////////////////////////////////////////////////
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    return () => {
      unsubscribe(); 
    };
  }, []);
  async function initializeUser(user: User | null){
    console.log("USER",user)
    if(user){
      setUserData({...user});
    
    }else{
      setUserData({});
   
    }
  }
  /////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////LogOut////////////////////////////////////////
  const LogOut = () => {
    localStorage.clear();
    window.location.replace("/SignIn");
  };

  ////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ContextProvider.Provider
        value={{
          cartCount, setCartCount,
          UserData,
          state,
          setState,Notifi, setNotifi,message, setMessage,Refresh, setRefresh
        }}
      >
        {children}
      </ContextProvider.Provider>
    </>
  );
}

export function AllDataProvider() {
  const context = useContext(ContextProvider);

  if (!context) {
    throw new Error("useContext must be used within a DataProvider");
  }

  return context;
}
