//import { useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import  {Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from '../../hooks/store';
import { useUserActions } from '../../hooks/useUserActions';
import  axios  from 'axios';




const LOGIN_URL = "http://localhost:8080/auth/log-in";

export function Login() {

    const user = useAppSelector((state) => state.users);

    const { usernameToUser, passwordToUser, accessTokenByUser, loadRolesByUser, setIsLogin } = useUserActions();

    const navigate = useNavigate();

    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [errMsg, setErrMsg] = useState("");

    

    useEffect(() => {
        setErrMsg("");
    }, [user]);

   

    const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        usernameToUser(event.target.value);

    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        passwordToUser(event.target.value);
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({
                    username: user.username,
                    password: user.password
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
                
            );

            console.log(JSON.stringify(response?.data));
            accessTokenByUser(response?.data.jwt);
            setIsLogin(response?.data.status);
            usernameToUser(response?.data?.username);
            loadRolesByUser(response?.data?.roles);
            window.localStorage.setItem('user_access_token', JSON.stringify(response?.data));
                       

            navigate(from, { replace: true });


        } catch (error) {
            if (error instanceof Error) {
                setErrMsg(error.message);
            } else {
                setErrMsg("Login failed");
            }

            errRef.current?.focus();
        }
    }

    return user.status ? <Navigate to='/' replace/> :  (

        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
            <p ref={errRef} >{errMsg}</p>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="./src/assets/logo_fich.svg?color=indigo&shade=600" alt="Logo Fich" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900" htmlFor="username">Usuario:</label>
                        <div>
                            <input 
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="false"
                                onChange={handleChangeUsername}
                                value={user?.username}
                                placeholder="&#xf007; username"
                            />
                        </div>

                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm/6 font-medium text-gray-900" htmlFor="password">Password:</label>

                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                           
                        </div>
                        <div className="mt-2">
                        <input  
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                                type="password"
                                id="password"
                                ref={passwordRef}
                                onChange={handleChangePassword}
                                value={user.password}
                                placeholder="&#xf023; password"
                                required
                            />
                        </div>

                    </div>


                    <button
                       className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
                    >Sign In</button>
                </form>
            </div>

        </div>
    )

}
