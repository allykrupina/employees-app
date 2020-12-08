const UsersDate = ({ users }) => {
  return (
    <ul className="date-users">
      {users.map(item => (
        <li className="date-users-item" key={item.id}>
          <p className="date-user-name">
            {item.lastName} {item.firstName}
          </p>
          <p className="date-user-birthday">{item.date}</p>
        </li>
      ))}
    </ul>
  );
};

export default UsersDate;
