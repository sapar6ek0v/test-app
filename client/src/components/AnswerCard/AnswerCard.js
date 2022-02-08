import React from 'react';

const AnswerCard = ({ans}) => {
    return (
        <>
            <div className='answer-card'>
                <p className='fw-bold mb-1'>{ans.question}</p>
                <div className='mb-1'><span className='fw-bold'>Points : </span>{ans.points}</div>
                <div className='fw-bold mb-1'>Answers :</div>
                <div className='border w-50 p-3 mb-2'>
                    {
                        ans.answers.map((it, idx) => {
                            return (
                                <div key={idx}>
                                    {it}
                                </div>
                            )
                        })
                    }
                </div>
                <div><span className='fw-bold'>Right answer : </span>{ans.rightAnswer}</div>
            </div>
        </>
    );
};

export default AnswerCard;