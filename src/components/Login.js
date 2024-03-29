import { useEffect, useState, useContext } from "react"
import { loginAPI } from "../services/UserService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [icon, setIcon] = useState(false)
    const [loading, setLoading] = useState(false)

    const { loginContext } = useContext(UserContext)

    const handleGoBack = () => {
        navigate("/")
    }

    useEffect(() => {
        if(localStorage.getItem('token')) { 
            navigate("/")
        }
    }, [])

    const handleLogin = async () => {
        if(!email || !password) {
            toast.error("Email and password is required") 
            return;
        }
        setLoading(true)
        let res = await loginAPI(email.trim(), password)
        if(res && res.token) {
            loginContext(email, res.token)
            navigate("/")
        } else {
            if(res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoading(false)
    }

    const handlePressEnter = (e) => {
        if(e && e.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <>
            <div className="login-container col-lg-6 d-flex flex-column col-sm-4 ">
                <div title="title">
                    <h3>Login</h3>
                </div>
                <div className="d-flex flex-column">
                    <div className="my-2">
                        <strong>
                        Email or Username
                        </strong>
                    </div>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email or Username" />
                    <div className=" input-password">

                    <input type={icon === true ? "text" : "password"} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" className="my-2"
                    onKeyDown = {(e) => handlePressEnter(e)}
                    />
                    <i className={icon === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIcon(!icon)}
                    ></i>
                    </div>
                    <button
                    onClick={handleLogin}
                    className="btn btn-success">
                    <i className={loading && "fa-solid fa-sync fa-spin"}></i>
                    &nbsp;Log in</button>
                </div>
                <div>
                    <p className="goback" onClick={handleGoBack}>Go back</p>
                </div>
            </div>
        </>
    )
}

export default Login