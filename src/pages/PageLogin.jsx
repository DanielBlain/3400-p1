import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MovieAppContext } from '../router/AppRouter'
import { appName } from '../config/config'


const PageLogin = () => {

    const navigate = useNavigate()
    const { isStorageUnlocked, setIsStorageUnlocked, state, dispatch } = useContext(MovieAppContext)


    // WARNING: POOR SECURITY CHECKING HERE -- INTENTIONAL, FOR DEMONSTRATION PURPOSES ONLY
    function isInputValid() {
        const username  = document.getElementById('username').value
        const password  = document.getElementById('password').value

        if (username.length < 3)    return {flag: false, failMessage: 'Ensure your username is 3+ alphanumeric characters long'}
        if (password.length < 8)    return {flag: false, failMessage: 'Ensure your password is at least 8 characters long'}

        return {flag: true}
    }


    function handleSubmit(e) {
        e.preventDefault()

        const validatedInput = isInputValid()
        if (validatedInput.flag) {
            dispatch({
                type: 'logIn',
                username: document.getElementById('username').value,
            })
            navigate('/')
        }
        else {
            alert(validatedInput.failMessage)
        }
    }


    // Unlock localStorage. Run once on boot
    useEffect(() => {
        setIsStorageUnlocked(true)
        return (() => {
            setIsStorageUnlocked(false)
        })
    }, [setIsStorageUnlocked])


    return (
        <>
            <h1>{appName}</h1>
            <div className='loginBox'>
                <form action='POST'>
                    <div className='loginInputGroup'>
                        <label>
                            Username
                            <input
                                type='text'
                                id='username'
                                name='username'
                                required
                                minLength='3'
                                autoComplete='username'
                            />
                        </label>
                    </div>
                    
                    <div className='loginInputGroup'>
                        <label>
                            Password
                            <input
                                type='password'
                                id='password'
                                name='password'
                                required
                                minLength='8'
                                autoComplete='new-password webauthn'
                            />
                        </label>
                    </div>
                    
                    <button
                        type='submit'
                        className='loginButton'
                        onClick={ handleSubmit }
                    >
                        Login
                    </button>
                </form>
            </div>        
        </>
    )
}

export default PageLogin