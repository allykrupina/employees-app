import React, { useContext } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import ListUsers from "./ListUsers";
import Birthdays from "./Birthdays";
import UserContext from "../store/UserContext";

const Wrapper = () => {
  const { status } = useContext(UserContext).state;
  if (status === "loader") return <Loader />;
  if (status === "error") return <Error />;
  return (
    <>
      <ListUsers />
      <Birthdays />
    </>
  );
};

export default Wrapper;
