import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import './CreateTest.css'
import TestCard from "../../components/TestCard/TestCard.js";

const CreateTest = () => {
    const [createTest, setCreateTest] = useState([])
    const [category, setCategory] = useState('')
    const {register, handleSubmit, reset} = useForm()
    const [test, setTest] = useState([])
    const [change, toggleChange] = useState(true)


    const addTestQuestion = (data) => {
        const answers = Object.keys(data).filter(it => it.startsWith('answer')).map(it => data[it])
        const newQuestion = {
            question: data.question,
            points: +data.points,
            answers: answers,
            rightAnswer: answers[data.rightAnswer]
        }
        setCreateTest([...createTest, newQuestion])
        reset()
    }

    const createNewTest = () => {
        axios.post(`/api/test/add-test/${category}`, createTest)
            .then(({data}) => {
                setTest(data)
                console.log(data)
                toggleChange(!change)
                }
            )
            .catch(e => console.log(e))
    }

    return (
        <div className='container'>
            {
                change
                    ? <>
                        <form onSubmit={handleSubmit(addTestQuestion)}>

                            <div>
                                <p className='fw-bold mb-4'>QUESTION :</p>
                                <input {...register('question')} id='question' type="text" className='question-input'/>
                            </div>


                            <p className='fw-bold mb-4'>ANSWERS :</p>
                            <div className='d-flex flex-wrap mb-3'>
                                <div className='col-6'>
                                    <div className='d-flex align-items-center mb-3'>
                                        <input {...register('rightAnswer')} value={0} name='rightAnswer' type="radio"/>
                                        <input {...register('answerFirst')} id='answerFirst' type="text" className='answer-input'/>
                                    </div>
                                    <div className='d-flex align-items-center mb-3'>
                                        <input {...register('rightAnswer')} value={1} name='rightAnswer' type="radio"/>
                                        <input {...register('answerSecond')} id='answerSecond' type="text" className='answer-input'/>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='d-flex align-items-center mb-3'>
                                        <input {...register('rightAnswer')} value={2} name='rightAnswer' type="radio"/>
                                        <input {...register('answerThrid')} id='answerThrid' type="text" className='answer-input'/>
                                    </div>
                                    <div className='d-flex align-items-center mb-3'>
                                        <input {...register('rightAnswer')} value={3} name='rightAnswer' type="radio"/>
                                        <input {...register('answerFourth')} id='answerFourth' type="text" className='answer-input'/>
                                    </div>
                                </div>
                            </div>


                            <div className='d-flex align-items-center mb-5'>
                                <p className='fw-bold'>POINTS :</p>
                                <input {...register('points')} id='points'  type="number" className='answer-input w-25'/>

                            </div>

                            <button className='create-btn'>Add</button>

                        </form>

                        <div className='py-5'>
                            <p className='fw-bold mb-4'>TEST NAME:</p>
                            <input onChange={(e) => setCategory(e.target.value)} type="text" className='test-input-title'/>
                        </div>
                    </>
                    : <div>
                        {
                            test.map(it => {
                                return (
                                    <TestCard key={it.id} quest={it}/>
                                )
                            })
                        }
                    </div>
            }

            <button hidden={!change} onClick={createNewTest} className='create-btn mx-3'>Create Test</button>
        </div>
    );
};

export default CreateTest;