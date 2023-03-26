import axios from "axios"

export const createPaymentIntent = ({planInfo} ) => {

    return axios.post('https://plankton-app-q74hx.ondigitalocean.app/payment/subscription/initial', 
    {
        "plan": planInfo.plan,
        "frequency": planInfo.frequency,
        "email": planInfo.email
    })
}