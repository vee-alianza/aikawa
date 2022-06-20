import { NavLink, useHistory } from 'react-router-dom';
import Footer from '../About/Footer';
import './index.css';

const SplashPage = () => {
    const history = useHistory();
    return (
        <>
            <div className='splashpage__container'>
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
                <div className='splash__image-display-1'>
                    <div className='splash__title'>
                        <h1> Shop the AIKAWA Marketplace</h1>
                        <p>Explore the latest trends with affordable prices that's out of this world! </p>
                        <div className='splash__image-display-2'>
                            <img
                                src='https://user-images.githubusercontent.com/92604480/174228274-836e2066-4afc-49d2-b664-3f3619a34f7c.png'
                                alt='robots'
                            />
                        </div>
                        <button className='splash__login__btn'>
                            <NavLink to='/login' exact={true} activeClassName='active'>
                                Go Shopping!
                            </NavLink>
                        </button>
                    </div>
                    <div className='splash__image-display-3'>
                        <h2>A constellation of inspiration for your home</h2>
                        <p>Find home accessories for every room, every style and every season!</p>
                        <img
                            src='https://user-images.githubusercontent.com/92604480/174228927-2b36931d-d007-422a-a230-1f268baac63d.png'
                            alt='buildings'
                        />
                    </div>
                    <div className='splash__image-display-4'>
                        <img src='https://user-images.githubusercontent.com/92604480/174525601-31f5e18f-e0ac-40a8-99d4-630c6c55e15a.png' alt='instructions' />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default SplashPage;
