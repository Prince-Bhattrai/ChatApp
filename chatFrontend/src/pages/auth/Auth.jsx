import React, { useState } from 'react'
import "./Auth.css"
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const [signUp, setSignUp] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate  = useNavigate()

    const submitHandler = async(e)=>{
        e.preventDefault()
        if(signUp){
            if(!name || !email || !password){
                return toast.error("Please fill all fields")
            }
        }
        if(!signUp){
            if(!email || !password){
                return toast.error("Please fill all fields")
            }
        }
        try {
            if(signUp){
                const signupRespose = await axios.post(`${import.meta.env.VITE_SERVER_URL}/v1/api/user/signup`, {name, email, password})
                console.log(signupRespose.data)
                if(signupRespose.data.success){
                    toast.success(signupRespose.data.message)
                    setSignUp(false)
                }
                return;
            }
            if(!signUp){
                const loginResponse = await axios.post(`${import.meta.env.VITE_SERVER_URL}/v1/api/user/login`, {email, password})
                console.log(loginResponse.data)
                if(loginResponse.data.success){
                    toast.success(loginResponse.data.message)
                    localStorage.setItem("token", loginResponse.data.token)
                    setName("")
                    setEmail("")
                    setPassword("")
                    window.location.href = "/"                }
                return;
            }
        } catch (error) {
            console.log(error)
            return toast.error(error?.response.data.message)
        }
    }
    return (
        <div className='auth'>
            <h1>{signUp ? "Sign Up" : "Log In"}</h1>
            <form action="" onSubmit={submitHandler}>
                {signUp && (
                    <fieldset>
                        
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id='name' />
                        <label className={name.length !== 0?"fill":""} htmlFor="name">Your name</label>
                    </fieldset>
                )}
                <fieldset>
                    
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id='email' />
                    <label className={email.length !== 0?"fill":""} htmlFor="email">Email address</label>
                </fieldset>
                <fieldset>
                    
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id='password' />
                    <label className={password.length !== 0?"fill":""} htmlFor="password">Password</label>
                </fieldset>
                {!loading &&(
                    <button>{signUp?"Create":"Log in"}</button>
                )}
            </form>
            {signUp?<p>Already have account? <b onClick={()=>setSignUp(!signUp)}>Log in</b></p>:<p>Do not have account? <b onClick={()=>setSignUp(!signUp)}>sign up.</b></p>}            
        </div>
    )
}

export default Auth