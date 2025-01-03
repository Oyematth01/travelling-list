import { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import axios from "axios";

export default function App() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get(`/items/${user._id}`).then((response) => {
        setItems(response.data);
      });
    }
  }, [user]);

  function handleAddItems(item) {
    axios.post("/items", { ...item, userId: user._id }).then((response) => {
      setItems((items) => [...items, response.data]);
    });
  }

  function handleDeleteItem(id) {
    axios.delete(`/items/${id}`).then(() => {
      setItems((items) => items.filter((item) => item._id !== id));
    });
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item._id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) {
      axios.delete(`/items/${user._id}`).then(() => {
        setItems([]);
      });
    }
  }

  function handleSignUp(username, password) {
    axios.post("/signup", { username, password }).then((response) => {
      setUser({ username });
      setError("");
      navigate("/signin");
    }).catch((error) => {
      setError(error.response.data);
    });
  }

  function handleSignIn(username, password) {
    axios.post("/signin", { username, password }).then((response) => {
      setUser({ username });
      setError("");
      navigate("/");
    }).catch((error) => {
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
                onClearList={handleClearList}
              />
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

function SignUp({ onSubmit, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(username, password);
  }

  return (
    <div className="auth">
      <h2>Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Already signed up? <Link to="/signin">Login</Link></p>
    </div>
  );
}

function SignIn({ onSubmit, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(username, password);
  }

  return (
    <div className="auth">
      <h2>Sign In</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}