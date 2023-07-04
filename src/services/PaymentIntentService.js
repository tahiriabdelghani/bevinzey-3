import axios from "axios"

export const createPaymentIntent = ({planInfo} ) => {

    return axios.post('https://api.bevinzey.com/payment/subscription/initial', 
    {
        "plan": planInfo.plan,
        "frequency": planInfo.frequency,
        "email": planInfo.email
    })
}