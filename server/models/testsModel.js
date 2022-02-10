import mongoose from "mongoose";

const {Schema, model} = mongoose

const question = new Schema({
    question : {
        type: String,
        required: true
    },
    answers : [String],
    rightAnswer: {
        type: String,
        required: true
    },
    points: {
        type : Number,
        default : 2
    }
})

const myTest = new Schema({
    testName: {
        type: String,
        required: true,
        unique: true
    },
    test: [
        question
    ]
}, {versionKey: false, timestamps: true})

export default model('tests', myTest)