import React, { useContext } from "react";
import UserContext from "../store/UserContext";
import User from "../components/User";

const AlphabetBlock = ({ users }) => (
  <div className="users-list">
    {Object.keys(users).map(key => (
      <div className="users-list-item" key={key}>
        <p className="users-list-letter">{key}</p>
        {users[key].length ? (
          users[key].map(item => <User key={item.id} {...item} />)
        ) : (
          <p>-</p>
        )}
      </div>
    ))}
  </div>
);

const ListUsers = () => {
  const context = useContext(UserContext),
    { state, clearAll } = context,
    { usersByAlphabet, ids } = state;

  return (
    <div className="users-container">
      <div className="users-container-top">
        <h2 className="sub-title">Employees list</h2>
        {ids.length ? (
          <p className="button-clear-all" onClick={() => clearAll()}>
            Clear all
          </p>
        ) : null}
      </div>
      {usersByAlphabet && <AlphabetBlock users={usersByAlphabet} />}
    </div>
  );
};

export default ListUsers;
