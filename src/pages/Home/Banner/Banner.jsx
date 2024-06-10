import React, { useCallback, useEffect } from "react"
import SinglePost from "../PostContainer/SinglePost"
import PropTypes from "prop-types"
import { CgSpinnerTwo } from "react-icons/cg"

const Banner = ({ text, setText, searchOutput, setSearchOutput, handleSearch, bannerRef, hide, setHide, loading }) => {
    const handleClear = useCallback(() => {
        setHide(true)
        setSearchOutput([])
    }, [setHide, setSearchOutput])

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") {
                handleClear()
            }
        }
        document.addEventListener("keydown", handleKey)
    }, [handleClear])

    return (
        <div className="md:-ml-[8.8%] md:-mr-[8.8%] -ml-[5.5%] -mr-[5.5%] relative overflow-hidden">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path
                        fill="#749bd3"
                        fillOpacity="1"
                        d="M0,192L120,208C240,224,480,256,720,240C960,224,1200,160,1320,128L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
                    ></path>
                </svg>
            </div>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 -mt-24 lg:-mt-56 md:mb-14">
                <div ref={bannerRef} className="relative isolate  px-6 py-20 text-center sm:px-16">
                    <p className="mx-auto max-w-lg text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Did not find post you were looking for?
                    </p>

                    <form onSubmit={handleSearch}>
                        <label
                            className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                            htmlFor="search-bar"
                        >
                            <input
                                id="search-bar"
                                placeholder="Type tagname and click search button..."
                                name="q"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                                required=""
                            />
                            <button
                                type="submit"
                                className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
                            >
                                <div className="flex items-center transition-all opacity-1">
                                    <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">Search</span>
                                </div>
                            </button>
                        </label>
                        <div className="mt-2">
                            Popular Topics:{" "}
                            <span className="*:text-blue-500 *:bg-[#f3ebfe] *:rounded-xl *:px-2 *:my-1">
                                <button type="button" className="">
                                    Helpdesk
                                </button>
                                ,{" "}
                                <button type="button" className="">
                                    Introduction
                                </button>
                                ,{" "}
                                <button type="button" className="">
                                    Payment
                                </button>
                            </span>
                        </div>
                    </form>
                    <div hidden={hide} className="shadow-2xl mt-5 px-4 md:px-12 py-5 rounded-3xl">
                        <div className="flex justify-end">
                            <button
                                onClick={handleClear}
                                className="bg-white flex gap-1 border font-bold border-gray-300 rounded-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:outline-none transition"
                            >
                                <span className="hidden lg:flex">Esc /</span>
                                <span>Clear</span>
                            </button>
                        </div>
                        {loading ? (
                            <CgSpinnerTwo className="animate-spin text-4xl flex items-center justify-center w-full my-8" />
                        ) : searchOutput.length < 1 ? (
                            <div className="my-8 text-xl">
                                <p>Results Empty</p>
                            </div>
                        ) : (
                            searchOutput?.map((post) => <SinglePost key={post._id} post={post}></SinglePost>)
                        )}
                    </div>

                    {/* <div className="mt-10">
                         <div className="notification !w-full !h-full my-4">
                    <div className="notiglow"></div>
                    <div className="notiborderglow"></div>
                    <div className="notititle ">
                        <h1 className="text-2xl text-slate-50 mb-2 flex items-center gap-2">
                            <HiSpeakerphone className="text-xl text-red-500"></HiSpeakerphone>Engage, Discuss, Connect: Welcome to
                            Our Forum Community!
                        </h1>
                        <div className="flex items-center gap-6">
                            <img
                                className="size-10 object-cover rounded-full"
                                src="https://scontent.fdac140-1.fna.fbcdn.net/v/t1.6435-9/102674088_1591432164352632_6113831691829116928_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=VE57oIIHGt0Q7kNvgGYXSJF&_nc_ht=scontent.fdac140-1.fna&oh=00_AYA_v5lBkQZIOSAtTNhkZob4zXpqUZwz3tcSfcE91mN97Q&oe=66838421"
                                alt=""
                            />
                            <h2>Mohammad Aiyub Ali</h2>
                        </div>
                    </div>
                    <div className="notibody !pb-2">
                        Welcome to our vibrant online forum where voices converge, ideas spark, and connections flourish! Join a
                        diverse community of enthusiasts, experts, and learners as we delve into myriad topics ranging from
                        technology to arts, science to pop culture, and everything in between. Whether you're seeking advice,
                        sharing experiences, or simply exploring new perspectives, our forum is your virtual agora. Come,
                        participate, and let's enrich each other's lives through meaningful conversations!
                    </div>
                </div>
                    </div> */}

                    {/* <svg
                        viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                        aria-hidden="true"
                    >
                        <circle
                            cx="512"
                            cy="512"
                            r="512"
                            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                            fillOpacity="0.7"
                        ></circle>
                        <defs>
                            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                                <stop stopColor="#3b82f6"></stop>
                                <stop offset="1" stopColor="#1d4ed8"></stop>
                            </radialGradient>
                        </defs>
                    </svg> */}
                </div>
            </div>
        </div>
    )
}

export default Banner

Banner.propTypes = {
    text: PropTypes.string,
    setText: PropTypes.func,
    searchOutput: PropTypes.array,
    setSearchOutput: PropTypes.func,
    handleSearch: PropTypes.func,
    bannerRef: PropTypes.object,
    hide: PropTypes.bool,
    setHide: PropTypes.func,
    loading: PropTypes.bool,
}
