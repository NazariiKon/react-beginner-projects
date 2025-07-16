import React from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setInvites] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    fetch("https://dummyjson.com/users?limit=4")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.users);
      })
      .catch((err) => {
        console.log(err);
        alert("The error while download users");
      })
      .finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  return (
    <div className="App">
      {success ? (
        <Success setSuccess={setSuccess} count={invites.length} />
      ) : (
        <Users
          onClickInvite={onClickInvite}
          invites={invites}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          isLoading={isLoading}
          items={users}
          setSuccess={setSuccess}
        />
      )}
    </div>
  );
}

export default App;
