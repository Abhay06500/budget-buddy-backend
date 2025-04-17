const cloundinary = require('cloudinary').v2;

const uploadFileToCloudinary = async (file) => {

    cloundinary.config({
        cloud_name:"dtmducwcd",
        api_key:"232947987925749",
        api_secret:"pM01rLoJRygTrwEWZgSvJLK72qE"
    })

    const cloundinaryResponse = await cloundinary.uploader.upload(file.path)
    return cloundinaryResponse;
}
module.exports = {
    uploadFileToCloudinary
}