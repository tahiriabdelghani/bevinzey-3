
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData, setUserData, switchLoginStatus } from "../redux/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setMessage } from "../redux/message";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";


function GoogleAuth() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const getUserData = async (response) => {
        setLoading(true)
        await axios
            .get(
                "https://plankton-app-q74hx.ondigitalocean.app/users/find/" + response?.data[1]
            )
            .then((res) => {
                dispatch(setUserData(res.data));
                dispatch(switchLoginStatus());
                navigate("/pricing");
            })
            .catch((error) => {
                dispatch(
                    setMessage(
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                    )
                );
            });
        setLoading(false)
    }

    return (
        <div className="App">
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}

            >
                <GoogleLogin
                    useOneTap={true}
                    onSuccess={async (credentialResponse) => {
                        console.log(credentialResponse);

                        await axios.post(
                            "https://plankton-app-q74hx.ondigitalocean.app/auth/thirdparty/google",
                            {
                                // pass the token as part of the req body
                                token: credentialResponse.credential,
                            }
                        ).then((response) => {
                            // console.log("response?.data[1] : " + )
                            getUserData(response)

                        }).catch((error) => {
                            dispatch(setMessage(error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                                error.message ||
                                error.toString())
                        })

                    }}
                    onError={() => {
                        alert("Login Failed");
                    }}
                />
            </GoogleOAuthProvider>
            {loading && (
                <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
                    <ColorRing
                        visible={true}
                        height="100"
                        width="100"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                    />
                </div>
            )}
        </div>
    );
}

export default GoogleAuth;