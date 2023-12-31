import { useState } from 'react';
import post from '../../axios/post';
import PropTypes from 'prop-types';

const Register = ({ setToken }) => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await post('auth/register', {
        first,
        last,
        email,
        password,
      });
      setToken(response.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="register">
      <form>
        <h2>Register</h2>
        <label>First name</label>
        <input
          type="text"
          name="first"
          id="first"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
        <label>Last name</label>
        <input
          type="text"
          name="last"
          id="last"
          value={last}
          onChange={(e) => setLast(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button onClick={handleRegister}>Submit</button>
    </section>
  );
};

Register.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Register;
