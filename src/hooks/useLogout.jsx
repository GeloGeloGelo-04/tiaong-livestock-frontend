import axios from "../api/axios";
import useAuth from "./useAuth";
// import useData from "./useData";

const UseLogout = () => {
  const { setAuth } = useAuth();
  // const { setFranchises, setArchivedFranchises, setAvailableMTOP } = useData();

  const logout = async () => {
    setAuth({});
    // setFranchises([]);
    // setArchivedFranchises([]);
    // setAvailableMTOP([]);
    try {
      const response = axios("/logout");
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default UseLogout;
