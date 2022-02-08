import React from 'react';

const InputBox = ({register, value}) => {
    return (
        <div>
            <input {...register('rightAnswer')} value={value} name='rightAnswer' type="radio"/>
            <input {...register('answerSecond')} id='answerSecond' type="text"/>
        </div>
    );
};

export default InputBox;