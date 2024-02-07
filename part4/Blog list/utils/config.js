require('dotenv').config()

const PORT = process.env.PORT
const MongoDB_URI = process.env.MONGOBD_URL

module.exports = {
    PORT,
    MongoDB_URI
}