import React, { useContext } from "react";
import UserContext from "../store/UserContext";
import UsersDate from "../components/UsersDate";

const ListDates = ({ month }) => {
  return (
    <div className="date-list">
      {month.map((item, index) => (
        <div className="date-list-item" key={index}>
          <p className="date-month">{item[0].month}</p>
          <UsersDate users={item} />
        </div>
      ))}
    </div>
  );
};

const Birthdays = item => {
  const { usersByDate } = useContext(UserContext).state;
  return (
    <div className="date-container">
      <h2 className="sub-title">Birthday</h2>
      {usersByDate.length ? (
        <ListDates month={usersByDate} />
      ) : (
        <p className="users-notfound">No selected employees</p>
      )}
    </div>
  );
};

export default Birthdays;
