require('dotenv').config()

const PORT = process.env.PORT
const MongoDB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGOBD_URL
module.exports = {
    PORT,
    MongoDB_URI
}