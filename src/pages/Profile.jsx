import React from "react";
import Loader from "../components/Loader";
import { Context} from "../main"
import { useContext } from "react"
import { Navigate } from "react-router-dom";


const Profile = () => {

  const {isAuthenticated, loading, user} = useContext(Context);

  if(!isAuthenticated) return <Navigate to={"/login"} />;

  return loading ? ( <Loader /> 
      ) : (
      <div style="width: 100%;
    height: 100vh;
    text-align: center;
    margin: auto 0;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    margin-top: 50px;">
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
      );
};
export default Profile
