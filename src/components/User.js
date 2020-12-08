import React, { useContext } from "react";
import UserContext from "../store/UserContext";

const User = ({ id, lastName, firstName }) => {
  const context = useContext(UserContext),
  { state, updateDate } = context,
  { ids } = state;
  return (
    <div className="user">
      <input
        type="checkbox"
        className="user-input"
        onChange={() => updateDate(id)}
        checked={ids.includes(id)}
      />
      <p className="user-name">
        {lastName} {firstName}
      </p>
    </div>
  );
};

export default User;
