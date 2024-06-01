import axios from "axios"

export const ImageUpload = async (image) => {
    const formData = new FormData()
    formData.append("image", image)
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, formData)
    return res.data.data.display_url
}
