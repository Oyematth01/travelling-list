import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import { signUp, signIn } from "./login";

export default function App() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
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

    if (confirmed) setItems([]);
  }

  function handleSignUp(username, password) {
    const result = signUp(username, password);
    if (result === "User signed up successfully") {
      setUser({ username });
      setError("");
    } else {
      setError(result);
    }
  }

  function handleSignIn(username, password) {
    const result = signIn(username, password);
    if (result === "User signed in successfully") {
      setUser({ username });
      setError("");
    } else {
      setError(result);
    }
  }

  return (
    <div className="app">
      <Logo />
      {!user ? (
        <div className="auth">
          <h2>Sign Up</h2>
          <AuthForm onSubmit={handleSignUp} />
          <h2>Sign In</h2>
          <AuthForm onSubmit={handleSignIn} />
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <>
          <Form onAddItems={handleAddItems} />
          <PackingList
            items={items}
            onDeleteItem={handleDeleteItem}
            onToggleItem={handleToggleItem}
            onClearList={handleClearList}
          />
          <Stats items={items} />
        </>
      )}
    </div>
  );
}

function AuthForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(username, password);
  }

  return (
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
  );
}