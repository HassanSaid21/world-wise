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

  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, wrong } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setPassword(""); // Clear the password field
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  {
    if (isLoading) return <Spinner />;
  }
  return (
    <>
      <main className={styles.login}>
        <PageNav />
        {wrong && <h2 className={styles.error}>{wrong}</h2>}
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
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
