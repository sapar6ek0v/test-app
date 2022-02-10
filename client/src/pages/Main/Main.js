import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import './Main.css'
import Loader from "../../components/Loader/Loader.js";

const Main = () => {
    const [testsCategory, setTestsCategory] = useState([])
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axios('/api/test/get-all')
            .then(({data}) => {
                setTestsCategory(data)
                setLoader(!loader)
            })
            .catch(e => console.log(e))
    }, [])

    const createTest = () => {
      navigate('create-test')
    }

    if (loader) {
        return <Loader />
    }

    return (
        <div className='container'>
                <div className='main-ul'>
                    {
                        testsCategory.map((category, idx) => {
                            return (
                                <Link key={idx} to={`/test/${category}`} className='main-link '>
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