import React from "react"

const Membership = () => {
    const handlePayment = (e) => {
        e.preventDefault()
    }
    return (
        <div className="min-h-screen flex items-center justify-center 0 p-6">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <div className="mb-6 text-center">
                    <h1 className="text-lg md:text-2xl font-semibold">Membership Payment</h1>
                    <p className="text-sm md:text-base mt-2 text-gray-500">
                        Became a <span className="bg-[#ffd700] text-black rounded-2xl px-1">Gold Badge</span> Member
                    </p>
                </div>
                <form onSubmit={handlePayment}>
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
                </form>
            </div>
        </div>
    )
}

export default Membership
