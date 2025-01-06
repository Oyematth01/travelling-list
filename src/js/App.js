import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import SignUp from "./Signup";
import SignIn from "./Signin";
import axios from "axios";

export default function App() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/items/${user._id}`).then((response) => {
        setItems(response.data);
      });
    }
  }, [user]);

  function handleAddItems(item) {
    axios.post("http://localhost:5000/items", { ...item, userId: user._id }).then((response) => {
      setItems((items) => [...items, response.data]);
    }).catch((error) => {
      console.error("Error adding item:", error);
    });
  }

  function handleDeleteItem(id) {
    axios.delete(`http://localhost:5000/items/${id}`).then(() => {
      setItems((items) => items.filter((item) => item.id !== id));
    }).catch((error) => {
      console.error("Error deleting item:", error);
    });
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) {
      axios.delete(`http://localhost:5000/items/${user._id}`).then(() => {
        setItems([]);
      }).catch((error) => {
        console.error("Error clearing list:", error);
      });
    }
  }

  function handleSignUp(username, password) {
    axios.post("http://localhost:5000/signup", { username, password })
      .then((response) => {
        setUser({ username });
        setError("");
        navigate("/signin");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }

  function handleSignIn(username, password) {
    axios.post("http://localhost:5000/signin", { username, password })
      .then((response) => {
        setUser({ username });
        setError("");
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }

  function handleLogout() {
    setUser(null);
    navigate("/signin");
  }

  return (
    <div className="app">
      <Logo />
      <Routes>
        <Route path="/signup" element={<SignUp onSubmit={handleSignUp} error={error} />} />
        <Route path="/signin" element={<SignIn onSubmit={handleSignIn} error={error} />} />
        <Route path="/" element={
          user ? (
            <>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
              <Form onAddItems={handleAddItems} />
              <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
              />
              <button className="clear-button" onClick={handleClearList}>Clear List</button>
              <Stats items={items} />
            </>
          ) : (
            <SignIn onSubmit={handleSignIn} error={error} />
          )
        } />
      </Routes>
    </div>
  );
}
