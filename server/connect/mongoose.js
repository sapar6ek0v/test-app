import mongoose from "mongoose";

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Connect'))
        .catch((e) => console.log('Not Connect', e))
}

export default dbConnect