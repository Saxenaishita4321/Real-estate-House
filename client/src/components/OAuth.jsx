import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Sign in with Google popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send user data to backend
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate user with backend');
      }

      const data = await response.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.error('Could not sign in with Google:', error.message);
      alert('Google sign-in failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 w-full"
    >
      Continue with Google
    </button>
  );
}
