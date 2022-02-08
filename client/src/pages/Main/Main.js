import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import './Main.css'

const Main = () => {
    const [testsCategory, setTestsCategory] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios('/api/test/get-all')
            .then(({data}) => setTestsCategory(data))
            .catch(e => console.log(e))
    }, [])

    const createTest = () => {
      navigate('create-test')
    }

    return (
        <div className='container'>
                <div className='main-ul'>
                    {
                        testsCategory.map(category => {
                            return (
                                <Link to={`/test/${category}`} className='main-link '>
                                   <div className='main-li'>
                                       {category}
                                   </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <button onClick={createTest} type='button' className='main-btn'>Create Test</button>
        </div>
    );
};

export default Main;