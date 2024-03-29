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
      <div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
      );
};
export default Profile
