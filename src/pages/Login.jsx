import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Spinner from "../components/Spinner";

export default function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
   if (!isAuthenticated) setError("Wrong credentials. Please try again.");
    } catch (err) {
      setPassword(""); // Clear the password field
    } finally {
      setIsLoading(false); 
        
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app" , {replace:true});
    }
  }, [isAuthenticated, navigate]);


  {isLoading&& <Spinner/>
  }
  return (
    <>
      <main className={styles.login}>
        <PageNav />
        {error && <h2 className={styles.error}>{error}</h2>}
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}