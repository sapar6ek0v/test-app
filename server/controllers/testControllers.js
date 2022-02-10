import Test from '../models/testsModel.js'


export const testGet = (req, res) => {
    const {category} = req.params

    Test.findOne({testName:category}).exec((err, data) => {
        if (err) return res.status(404).json({message: "Error", err})

        if(!data) return res.status(400).json({message: "Not found test", err})


        const withoutRightAnswer = data.test.map(it => {
            const quest = {...it.toObject()}
            delete quest.rightAnswer
            return quest
        })

        res.json(withoutRightAnswer)
    })

}

export const getAllTest = (req, res) => {


    Test.find({}).exec((err, data) => {
        if (err) return res.status(404).json({message: "Error", err})

        const tests = data.map(it => it.testName)

        res.json(tests)
    })
}


export const testPost = (req, res) => {
    const {category} = req.params

    const newTest = new Test({
        testName: category,
        test: req.body
    })

    newTest.save((err, data) => {
        if (err) return res.status(404).json({message: "Error", err})

        res.json({message: "Ok", data})
    })

}


export const checkPost = (req, res) => {
    const {category} = req.params
    // const {username} = req.query
    const userAnswers = req.body
    let totalPoints = 0


    Test.findOne({testName:category}).exec((err, data) => {
        if (err) return res.status(404).json({message: "Error", err})

        if(!data) return res.status(400).json({message: "Not found test", err})

        const result = data.test.map(it => {
            const quest = {...it.toObject()}
            const currentQuestion = userAnswers.find(it => String(it._id) === String(it._id))
            quest.result = quest.rightAnswer === currentQuestion.userAnswer
            if (quest.result) {
                totalPoints += quest.points
            }
            return quest
        })

        const response = {
            totalPoints,
            result
        }

        res.json(response)
    })

}