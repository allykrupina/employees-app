import React, { Component } from "react";
import axios from "axios";

const UserContext = React.createContext();

class UserProvider extends Component {
  state = {
    ids: [],
    users: [],
    usersByDate: {},
    usersByAlphabet: {},
    status: "loader"
  };

  sortByAlphabet = data => {
    const alphabetArray = [...Array(26).keys()].map(i =>
      String.fromCharCode(i + 97)
    );
    const filterArray = alphabetArray.reduce((obj, key) => {
      const currentArray = data.filter(
        item => item.lastName.toLowerCase().charAt(0) === key
      );
      return { ...obj, [key]: currentArray };
    }, {});

    this.setState(
      {
        users: data,
        status: "ready",
        usersByAlphabet: filterArray
      },
      () => this.getStorageIds()
    );
  };

  sortByDate = () => {
    const { ids, users } = this.state,
      usersArray = ids.map(item => users.find(obj => obj.id === item)),
      monthsArray = Array.from(Array(12), () => []);

    for (let item of usersArray) {
      const date = new Date(item.dob),
        month = date.toLocaleString("default", { month: "long" }),
        dateString = `${date.getDate()} ${month}, ${date.getFullYear()} year`,
        currentIndex = date.getMonth() + 1;
      item.date = dateString;
      item.currentIndex = currentIndex;
      item.month = month;
      monthsArray[currentIndex - 1].push(item);
    }
    this.setState({
      usersByDate: monthsArray.filter(el => el.length)
    });
  };

  updateDate = id => {
    const { ids } = this.state;
    const index = ids.indexOf(id);
    const idsArray =
      index !== -1 ? ids.filter(item => item !== id) : ids.concat(id);
    localStorage.setItem("ids", idsArray);
    this.setState(
      {
        ids: idsArray
      },
      () => {
        this.sortByDate();
      }
    );
  };

  getUsers = () => {
    axios({
      method: "get",
      url: "https://yalantis-react-school-api.yalantis.com/api/task0/users"
    })
      .then(({ data }) => {
        data.length ? this.sortByAlphabet(data) : this.handleError();
      })
      .catch(error => this.handleError());
  };

  getStorageIds = () => {
    const storageIds = localStorage.getItem("ids");
    if (storageIds) {
      this.setState(
        {
          ids: storageIds.split(",")
        },
        () => this.sortByDate()
      );
    }
  };

  clearAll = () => {
    localStorage.removeItem("ids");
    this.setState({ ids: [], usersByDate: [] });
  };

  handleError = () => this.setState({ status: "error" });

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { children } = this.props;
    return (
      <UserContext.Provider value={{ ...this }}>
        {children}
      </UserContext.Provider>
    );
  }
}

export { UserProvider };

export default UserContext;
