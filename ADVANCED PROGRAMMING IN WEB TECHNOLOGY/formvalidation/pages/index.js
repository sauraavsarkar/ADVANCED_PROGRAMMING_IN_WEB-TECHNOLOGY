import { useState } from 'react';

 
export default function registrationform() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
 
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
 
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
 
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
 
  const handleAgreeTermsChange = () => {
    setAgreeTerms(!agreeTerms);
  };

 
  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();


    // Perform form validation
    if (!name ||username || email || !password || !confirmPassword || !agreeTerms|| !profilePicture) {
      setError('All fields are required');
    } else if (!isValidname(name)) {
      setError('Name are required');
    } else if (!isValidusername(username)) {
      setError('Username are required');
    } else if (!isValidEmail(email)) {
      setError('Invalid email address');
    } else if (!isValidPassword(password)) {
      setError('Password must be strong (8 characters, letters, numbers, and special characters)');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else if (!agreeTerms) {
      setError('You must agree to the terms and conditions');
    } else if (!isValidProfilePicture(profilePicture)) {
      setError('Please upload a valid image file for the profile picture');
    } else {
      console.log({ name , username, email, password, profilePicture });
      setEmail('');
      setName('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setProfilePicture(null);
      setAgreeTerms(false);
      setError('');
    }
  };
 
  const isValidEmail = (email) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };
 
  const isValidPassword = (password) => {
    // Regular expression for a strong password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };
 
  const isValidProfilePicture = (profilePicture) => {
    // Check if the file is an image
    return profilePicture && profilePicture.type.startsWith('image/');
  };
 
  return (
<>

<h1>Sign Up</h1>
<form onSubmit={handleSubmit}>
<div>
<label>Name</label>
<input
            type="text"
            name="name"
            value={name}
            onChange={handleChangeName}
          />
</div>
<div>
<label>Username</label>
<input
            type="text"
            name="username"
            value={username}
            onChange={handleChangeUsername}
          />
</div>
<div>
<label>Email</label>
<input
              type="email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
            />
</div>
<div>
<label>Password</label>
<input
              type="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
            />
</div>
<div>
<label>Confirm Password</label>
<input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
            />
</div>

<div>
<label>Profile Picture</label>
<input
              type="file"
              accept="image/*"
              name="profilePicture"
              onChange={handleProfilePictureChange}
            />
</div>

<div>
<label>
<input
                type="checkbox"
                name="agreeTerms"
                checked={agreeTerms}
                onChange={handleAgreeTermsChange}
              />
              I agree to the terms and conditions
</label>
</div>
          {error && <p>{error}</p>}
<button type="submit">Sign Up</button>
</form>
</>
  );
}