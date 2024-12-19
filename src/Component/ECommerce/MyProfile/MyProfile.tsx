import { useEffect, useState } from "react"
import { getUserDataByUID } from "../../../FireBase/Auth"
import { AllDataProvider } from "../../DataProvider/DataProvider"

const MyProfile = () => {
    const {setMessage,setNotifi,UserData} = AllDataProvider()
    let [profileData,setProfileData] = useState({})
    useEffect(() => {
        const fetchUserData = async (): Promise<void> => {
          try {
          let ans =   await getUserDataByUID(UserData.uid);
          setProfileData({...ans})
          } catch (err: unknown) {
            if (err instanceof Error) {
              setMessage(err.message);
              setNotifi(true);
            }
          }
        };
      
        fetchUserData();
      }, [UserData.uid]);
      
  return (
    <div>MyProfile</div>
  )
}

export default MyProfile