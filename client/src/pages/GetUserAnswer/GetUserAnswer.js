import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import './GetUserAnswer.css'
import AnswerCard from "../../components/AnswerCard/AnswerCard.js";
import TestCard from "../../components/TestCard/TestCard.js";

const GetUserAnswer = () => {
    const {name} = useParams()
    const [getTests, setGetTests] = useState([])
    const [getUserAnswers, setUserGetAnswers] = useState([])
    const [change, toggleChange] = useState(true)
    const [results, setResults] = useState([])


    useEffect(() => {
        axios(`/api/test/get-test/${name}`)
            .then(({data}) => {
                setGetTests(data)
            })
            .catch(e => console.log(e))
    }, [name])


    const getAnswer = (e, question) => {
        const truthAnswer = getUserAnswers.filter(it => it.id !== question.id)
        const userAnswer = {
            question: question.question,
            id: question.id,
            userAnswer: e.target.value
        }
        setUserGetAnswers([...truthAnswer, userAnswer])
    }

    const addToPost = () => {
        if (getUserAnswers.length === getTests.length) {
            axios.post(`/api/test/check-test/${name}`, getUserAnswers)
                .then(({data}) => {
                    setResults(data.result)
                })
                .catch(e => console.log(e))
            alert("ОК!")
            toggleChange(!change)
        } else {
            alert('Нужно отметить все!')
        }

    }

    return (
        <div className='container'>
            {
                change
                    ? getTests.map(quest => {
                        return (
                            <TestCard key={quest} getAnswer={getAnswer} quest={quest} />
                        )
                    })
                    : results?.map(ans => {
                        return (
                            <AnswerCard key={ans.id} ans={ans} />
                        )
                    })
            }
            <div className='py-5'>
                <button hidden={!change} className='answer-btn' onClick={addToPost}>Завершить</button>
            </div>

        </div>
    );
}

export default GetUserAnswer;