import React from "react"
import logo from "/F.Fusion.png"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
    return (
        <div className="bg-gray-900 mx-auto">
            <footer className="w-[85%] max-w-7xl mx-auto text-white py-8">
                <div className=" mx-auto flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 lg:w-auto mb-8 md:mb-0">
                        <img src={logo} className="h-9 object-cover bg-white rounded-full" alt="Logo" />
                        <h4 className="text-lg md:text-2xl font-bold mb-4">Forum Fusion</h4>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-auto mb-8 md:mb-0">
                        <h4 className="text-lg font-bold mb-4">Contact Us</h4>
                        <p className="text-sm">Email: info@ForumFusion.com</p>
                        <p className="text-sm">Phone: +1 (123) 456-7890</p>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-auto">
                        <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                        <div className="flex">
                            <a href="" className="mr-4">
                                <FaFacebook className="text-white" />
                            </a>
                            <a href="" className="mr-4">
                                <FaTwitter className="text-white" />
                            </a>
                            <a href="">
                                <FaInstagram className="text-white" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
            <h4 className="py-4 text-sm md:text-base text-center text-white">© 2024 ForumFusion. All rights reserved.</h4>
        </div>
    )
}

export default Footer
