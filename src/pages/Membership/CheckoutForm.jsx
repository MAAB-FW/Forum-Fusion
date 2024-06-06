import { Button } from "@/components/ui/button"
import useAuth from "@/hooks/useAuth"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const CheckoutForm = ({ paymentFee }) => {
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState("")
    const axiosSecure = useAxiosSecure()
    const location = useLocation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {
        axiosSecure
            .post("/createPaymentIntent", { price: paymentFee })
            .then((res) => {
                setClientSecret(res.data.clientSecret)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [axiosSecure, paymentFee])

    const { mutate } = useMutation({
        mutationKey: ["badge"],
        mutationFn: () => {
            axiosSecure
                .patch(`/badge/${user.email}`)
                .then((res) => {
                    console.log(res.data)
                    toast.success("Congrats! You are now in Membership!")
                })
                .catch((e) => {
                    console.log(e)
                    toast.error("Something went wrong!")
                })
        },
        onSuccess: async () => {
            // Todo: don't work
            await queryClient.invalidateQueries(["myProfile"])
            navigate(location.state?.from?.pathname || "/")
        },
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        })

        if (error) {
            console.log("[error]", error)
        } else {
            console.log("[PaymentMethod]", paymentMethod)
        }

        const { paymentIntent, error: cardError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "anonymous",
                    email: user?.email || "anonymous",
                },
            },
        })
        if (cardError) {
            console.log("card Error")
        } else {
            console.log("payment intent", paymentIntent)
            if (paymentIntent.status === "succeeded") {
                mutate()
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className="mt-10 w-full">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <Button type="submit" disabled={!stripe || !clientSecret} className="my-5 w-full">
                Pay
            </Button>
        </form>
    )
}

export default CheckoutForm

CheckoutForm.propTypes = {
    paymentFee: PropTypes.number,
}
