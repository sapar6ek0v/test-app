import React from 'react';

const TestCard = ({quest, getAnswer}) => {
    return (
        <>
            <div className='answer-card' >
                <div className='fw-bold mb-2'>
                    {quest.question}
                </div>
                <div className='d-flex flex-column'>
                    {
                        quest.answers?.map((answer, idx) => {
                            return (
                                <div className='d-flex align-items-center mb-1' key={idx}>
                                    <input onChange={(e) => getAnswer(e, quest)}
                                           value={answer}
                                           type='radio'
                                           name={quest._id}
                                    />
                                    <label className='px-2'>{answer}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default TestCard;