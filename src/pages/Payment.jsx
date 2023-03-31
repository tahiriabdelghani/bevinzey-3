import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useSlider } from "react-use";
import { useSelector } from "react-redux";

const stripePromise = loadStripe("pk_live_51LV2p7D4I2Sn1lmvhUMWGOc4XszaFs8CcsemnwXRGZvfEPxw7sqUn5gyzxxGAdAzpvIkUWYgxaCCZ7Ru4FAk1KeU00FqLPvzUY")

function Payment() {
    // const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const { clientsecret } = useSelector((state) => state.auth)
    // console.log(clientsecret)

    // useEffect(() => {
    //     fetch("/config").then(async (r) => {
    //         const { publishableKey } = await r.json();
    //         setStripePromise(loadStripe(publishableKey));
    //     });
    // }, []);

    // useEffect(() => {
    //     fetch("https://plankton-app-q74hx.ondigitalocean.app/payment/subscription/initial", {
    //         method: "POST",
    //         body: JSON.stringify(
    //             clientSecret
    //         ),
    //     }).then(async (result) => {
    //         var { clientSecret } = await result.json();
    //         setClientSecret(clientSecret);
    //     });
    // }, []);

    const options = {
        // passing the client secret obtained from the server
        clientSecret: `${clientsecret.clientsecret}`,
    };

    return (
        <div className="flex justify-center items-center flex-col ">
            <h1 className="mt-16 text-2xl text-center mb-8 font-medium">Complete Your Purchase Now with Secure Stripe Checkout</h1>
            {clientsecret?.clientsecret && stripePromise && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}

export default Payment;
