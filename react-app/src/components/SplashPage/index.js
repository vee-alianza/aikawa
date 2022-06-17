import './index.css';

const SplashPage = () => {
    return (
        <div className='splashpage__container'>
            <button
                type='submit'
                className='login__btn'
                id='splash-login__btn'
            >
                Log In
            </button>
            <button
                type='submit'
                className='signup__btn'
                id='splash-signup__btn'
            >
                Sign Up
            </button>
        </div>
    )
}

export default SplashPage;
