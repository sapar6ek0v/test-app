import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import './GetUserAnswer.css'
import AnswerCard from "../../components/AnswerCard/AnswerCard.js";
import TestCard from "../../components/TestCard/TestCard.js";
import Loader from "../../components/Loader/Loader.js";

const GetUserAnswer = () => {
    const {name} = useParams()
    const [getTests, setGetTests] = useState([])
    const [getUserAnswers, setUserGetAnswers] = useState([])
    const [change, toggleChange] = useState(true)
    const [results, setResults] = useState([])
    const [loader, setLoader] = useState(true)


    useEffect(() => {
        axios(`/api/test/get-test/${name}`)
            .then(({data}) => {
                setGetTests(data)
                setLoader(!loader)
            })
            .catch(e => console.log(e))
    }, [name])


    const getAnswer = (e, question) => {
        const truthAnswer = getUserAnswers.filter(it => it._id !== question._id)
        const userAnswer = {
            question: question.question,
            _id: question._id,
            userAnswer: e.target.value
        }
        setUserGetAnswers([...truthAnswer, userAnswer])
    }

    const addToPost = () => {
        // if (getUserAnswers.length === getTests.length) {
            axios.post(`/api/test/check-test/${name}`, getUserAnswers)
                .then(({data}) => {
                    setResults(data.result)
                })
                .catch(e => console.log(e))
            // alert("ОК!")
            toggleChange(!change)
        // } else {
        //     alert('Нужно отметить все!')
        // }

    }

    if (loader) {
        return <Loader/>
    }

    return (
        <div className='container'>
            {
                change
                    ? getTests.map(quest => {
                        return (
                            <TestCard key={quest._id} getAnswer={getAnswer} quest={quest} />
                        )
                    })
                    : results?.map(ans => {
                        return (
                            <AnswerCard key={ans._id} ans={ans} />
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