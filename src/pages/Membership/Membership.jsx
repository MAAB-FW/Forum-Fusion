import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import { FcOk } from "react-icons/fc"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "@/hooks/useAxiosSecure"
import useAuth from "@/hooks/useAuth"
import SmallLoading from "@/components/SmallLoading"

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)

const Membership = () => {
    const paymentFee = 20
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data, isFetching, refetch } = useQuery({
        queryKey: ["myProfile"],
        queryFn: async () => {
            const res = await axiosSecure(`/myProfile/${user.email}`)
            console.log(res.data)
            return res.data
        },
        initialData: [],
    })

    if (isFetching) return <SmallLoading />

    return (
        <div className="flex items-center justify-center py-20">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                {data.badge === "gold" ? (
                    <>
                        <div className="mb-6 text-center">
                            <h1 className="text-lg md:text-2xl font-semibold text-green-500">Congratulation!</h1>
                            <p className="text-sm md:text-base mt-2 text-gray-500 flex flex-wrap justify-center gap-1">
                                You are a{" "}
                                <span className="bg-[#ffd700] flex items-center justify-center gap-1 w-32 text-black rounded-2xl px-1">
                                    <FcOk />
                                    Gold Badge
                                </span>{" "}
                                Member.
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mb-6 text-center">
                            <h1 className="text-lg md:text-2xl font-semibold">Membership Payment</h1>
                            <p className="text-sm md:text-base mt-2 text-gray-500 flex flex-wrap justify-center gap-1">
                                Became a{" "}
                                <span className="bg-[#ffd700] flex items-center justify-center gap-1 w-32 text-black rounded-2xl px-1">
                                    <FcOk />
                                    Gold Badge
                                </span>{" "}
                                Member
                            </p>
                            <div className="my-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Amount to Pay: <span className="text-pink-600">{paymentFee}$</span>
                                </label>
                            </div>
                        </div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm paymentFee={paymentFee} refetch={refetch}></CheckoutForm>
                        </Elements>
                    </>
                )}

                {/* <form onSubmit={handlePayment}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                            Card Number
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            // value={cardNumber}
                            // onChange={(e) => setCardNumber(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 mr-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                id="expiryDate"
                                // value={expiryDate}
                                // onChange={(e) => setExpiryDate(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="MM/YY"
                                required
                            />
                        </div>
                        <div className="w-1/2 ml-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvc">
                                CVC
                            </label>
                            <input
                                type="text"
                                id="cvc"
                                // value={cvc}
                                // onChange={(e) => setCvc(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Amount to Pay: <span className="text-pink-600">{"20"}$</span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Pay Now
                    </button>
                </form> */}
            </div>
        </div>
    )
}

export default Membership
