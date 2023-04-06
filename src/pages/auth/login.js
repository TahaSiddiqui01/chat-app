import { useState } from 'react';
import styles from '../../styles/LoginPage.module.css'

function login() {


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // your login logic here
  };

  return (
    <><div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Login</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div></>
  )
}

export default login