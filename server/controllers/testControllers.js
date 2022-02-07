import {readFile, writeFile, stat, readdir} from 'fs/promises'
import {nanoid} from "nanoid";
import {json} from "express";


export const testGet = (req, res) => {
    const {category} = req.params

    readFile(`./server/data/${category}.json`, 'utf-8')
        .then(data => {
            const test = JSON.parse(data)
            test.map(it => delete it.rigthAnswer  )

            res.json(test)
        })
        .catch(e => res.json({message: e}))
}

export const getAllTest = (req, res) => {

    readdir('./server/data')
        .then(data => {
            const category = data
                .filter(it => it !== 'user-points.json')
                .map(it => it.replace(/\.json$/, ''))

            res.json(category)
        })
        .catch(e => res.json({message: e}))
}


export const testPost = (req, res) => {
    const {category} = req.params


    stat(`./server/data/${category}.json`)
        .then(() => res.json({message: 'Choose anther name'}))
        .catch(() => {
            const test = req.body.map(it => ({...it, id: nanoid(10)}))

            writeFile(`./server/data/${category}.json`, JSON.stringify(test), 'utf-8')
                .then(() => res.json({message:'Yes'}))
                .catch((e) => {
                    res.json({message:e})
                })
        })
}



export const checkPost = (req, res) => {
    const {category} = req.params
    const {username} = req.query
    const userAnswers = req.body
    let totalPoints = 0

    readFile(`./server/data/${category}.json`)
        .then(data => {
            const result = JSON.parse(data).map(quest => {
                const currentQuestion = userAnswers.find(it => it.id === quest.id)
                quest.result = quest.rightAnswer === currentQuestion.userAnswer
                if (quest.result) {
                    totalPoints += quest.points
                }
                return quest
            })
            console.log(req.body)

            const response = {
                totalPoints,
                result
            }
            console.log(totalPoints)

            res.json(response)

            readFile(`./server/data/user-points.json`)
                .then(data => {
                    const userPoints = JSON.parse(data)
                    userPoints.push({
                        id: nanoid(10),
                        username,
                        totalPoints,
                        category : category
                    })

                    writeFile('./server/data/user-points.json', JSON.stringify(userPoints), 'utf-8')
                        // .then(() => res.json(userPoints))
                        // .then((e) => res.json({message: e}))
                })
        })
        .catch(e => res.json({message: e}))
}