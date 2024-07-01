import { Button } from 'flowbite-react';
import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup , getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = getAuth(app);          // we are adding app otherwise firebase will not know who is requesting

    const handleGoogleClick = async() => {                  // bcz we have to wait for the response from the google

        const provider = new GoogleAuthProvider();

        provider.setCustomParameters({ prompt : 'select_account' });      // it will never sign in you automatically , it will always ask for the gmail account

        try {
            const resultsFromGoogle = await signInWithPopup(auth , provider);
            // console.log(resultsFromGoogle);

            const res = await fetch('/api/auth/google', {
                method : 'POST',
                headers : { 'Content-Type' : 'application/json' },
                body : JSON.stringify({
                    name : resultsFromGoogle.user.displayName,                 // we only want to send these informations to the backend not all infos which we get from the google
                    email : resultsFromGoogle.user.email,
                    googlePhotoUrl : resultsFromGoogle.user.photoURL,
                })
            })

            const data = await res.json();
            if(res.ok)
                {
                    dispatch(signInSuccess(data));
                    navigate('/');
                }

        } catch (error) {
            console.log(error);
        }

    }


  return (
    <Button type='button' gradientDuoTone='pinkToOrange'outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2' />
        Continue with Google
    </Button>
  )
}
