import SectionTitle from "@/components/SectionTitle"
import React from "react"
import { HiSpeakerphone } from "react-icons/hi"

const Announcement = () => {
    return (
        <div>
            <SectionTitle title="Announcement"></SectionTitle>
            <div className="my-10">
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
                        technology to arts, science to pop culture, and everything in between. Whether you are seeking advice,
                        sharing experiences, or simply exploring new perspectives, our forum is your virtual agora. Come,
                        participate, and let us enrich each others lives through meaningful conversations!
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Announcement
