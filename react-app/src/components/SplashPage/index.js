import { useHistory } from 'react-router-dom';
import Footer from '../About/Footer';
import './index.css';

const SplashPage = () => {
    const history = useHistory();
    return (
        <div className='splashpage__container'>
            <div className='splashpage__top'>
                <img src='https://user-images.githubusercontent.com/92604480/176759065-3a3c62d0-c240-4721-ae19-9da798df7e60.png' alt='' />
                <div className='splash-btn__container'>
                    <button
                        className='splash-login__btn'
                        onClick={() => history.push('/login')}
                    >
                        Log In
                    </button>
                    <button
                        className='splash-signup__btn'
                        onClick={() => history.push('/sign-up')}
                    >
                        Sign Up
                    </button>
                </div>
                <div className='splash__image-display-1'>
                    <div className='splash__title'>
                        <h1> Shop the AIKAWA Marketplace</h1>
                        <p>Explore the latest trends with affordable prices that's out of this world! </p>
                    </div>
                    <div className='splash__image-display-3'>
                        <h2>A constellation of inspiration for your home</h2>
                        <p>Find home accessories for every room, every style and every season!</p>
                    </div>
                    <button
                        className='splash-shopping__btn'
                        onClick={() => history.push('/products')}
                    >
                        Go Shopping!
                    </button>
                </div>
            </div>
            <div className='splashpage__bottom'>
                <Footer />
            </div>
        </div>
    )
}

export default SplashPage;
