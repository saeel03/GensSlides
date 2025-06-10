import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './styles/Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({ fullName: 'Loading...', email: 'Loading...' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getDatabase();
        const snapshot = await get(ref(db, `users/${user.uid}`));
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          setUserData({ fullName: 'Unknown User', email: user.email });
        }
        setLoading(false);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Sign out error:', error);
    });
  };

  const initials = userData.fullName
    ? userData.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-pic">
          <img
            src="./assets/default-dp.png"
            alt="Profile"
            onError={(e) => (e.target.style.display = 'none')}
          />
          <div className="initials-overlay">{initials}</div>
        </div>
        <h2>{userData.fullName}</h2>
        <p>{userData.email}</p>

        <button className="edit-btn" onClick={() => alert('Upload feature coming soon!')}>
          Edit Profile
        </button>

        <button onClick={handleSignOut} className="signout-btn">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
