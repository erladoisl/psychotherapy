import Select from 'react-select'
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import {
    selectThanks,
    selectThanksLoading,
    selectThanksError,
    getThanks,
    newThanks
} from '../../reducers/thanksSlice';
import {
    selectEmotions,
    getEmotions
} from '../../reducers/emotionSlice';

function Thanks() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getThanks());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getEmotions(true));
    }, [dispatch]);

    const bd_color = {
        positive: { 1: '#A9F2B1', 2: '#94D49B', 3: '#89C490', 4: '#80B886', 5: '#72A377', 6: '#6B9970', 7: '#65916A', 8: '#577D5B', 9: '#527556', 10: '#47664B' },
        negative: { 1: '#FFCDCE', 2: '#F2C2C4', 3: '#E0B4B5', 4: '#D4A9AB', 5: '#C49D9F', 6: '#BD9798', 7: '#AD8B8C', 8: '#9E7E80', 9: '#8F7273', 10: '#826869' }
    }

    const thanks = useSelector(selectThanks);
    const thanksLoading = useSelector(selectThanksLoading);
    const thanksError = useSelector(selectThanksError);
    const emotions = useSelector(selectEmotions);
    const [show_thanks_form, set_show_thanks_form] = useState(false);
    const [thanks_description, set_thanks_description] = useState('');
    const [thanks_emotions, set_thanks_emotions] = useState([]);

    const new_thanks = useCallback(e => {
        e.preventDefault();
        dispatch(newThanks(thanks_description, thanks_emotions));
        set_thanks_description('');
        set_show_thanks_form(false);
        set_thanks_emotions([]);
    });

    const set_thanks_emotions_level = (value, index) => {
        let new_thanks_emotions = thanks_emotions
        new_thanks_emotions[index] = { ...new_thanks_emotions[index], 'level': value };
        set_thanks_emotions(new_thanks_emotions);
    }

    return (
        <div className='container'>
            <div className="mt-5 p-5 mb-4 rounded bg-light" >
                <div className="col-md-8 px-0">
                    <h1 className="col-9 display-4 fst-italic">Начни свой день с благодарности</h1>
                    <p className="lead my-3">Попробуй расположиться в удобной позе. Сейчас важно успокоить свое дыхание и направить внимание на текущий момент.</p>
                    <p className="lead my-3">А теперь вспомни и добавь ниже 3-5  кратких описаний недавних ситуаций, что вызвали у тебя положительные чувства, за которые ты испытываешь благодарность.</p>
                    <a className="btn btn-outline-secondary" onClick={() => set_show_thanks_form(true)}>Добавить</a>
                </div>
            </div>
            {show_thanks_form && (
                <form className="card p-2" onSubmit={new_thanks}>
                    <h4 className="ms-3 mb-3">Новое воспоминание</h4>
                    <div className="input-group mb-2">
                        <input
                            type="textarea"
                            className="form-control"
                            placeholder="Опиши его"
                            value={thanks_description}
                            onChange={e => set_thanks_description(e.target.value)}
                        />
                        <button type="submit" className="btn btn-secondary">Сохранить</button>
                    </div>
                    <br />
                    <div className="">
                        <label htmlFor="thanks_emotions" className="form-label ms-1">
                            Добавь несколько замеченных эмоций для фиксации внимания на полезном:
                        </label>
                        <Select
                            closeMenuOnSelect={false}
                            defaultValue={thanks_emotions}
                            placeholder='Выбери эмоции из списка...'
                            isMulti
                            onChange={((event) => { set_thanks_emotions(event) })}
                            options={emotions}>
                        </Select>
                    </div>
                    <br />
                    {thanks_emotions.length !== 0 && (
                        <div className="input-group mb-2">
                            <label htmlFor="thanks_emotions_level" className="form-labell ms-1">
                                Отметь, насколько сильным было выражение эмоций:
                            </label>
                            {thanks_emotions.map((emotion, index) => (
                                <div key={index} className="input-group mb-2">
                                    <label htmlFor="emotions_level" className="mx-2 form-labell ms-1">
                                        {emotion.label.toUpperCase()}
                                    </label>
                                    <input type="range" min="1" max="10" value={emotion?.level} onChange={(e) => set_thanks_emotions_level(e.target.value, index)} />
                                </div>
                            ))}
                        </div>
                    )}
                </form>
            )}
            <div className='album py-5'>
                <div className='container p-0'>
                    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                        {thanksLoading ? (
                            <Spinner animation="grow" />
                        ) : (
                            thanks.map((item, j) => (
                                <div key={j} className='col p-0'>
                                    <div className='bg-light rounded m-1'>
                                        <div className='p-2 text-center'>
                                            {item?.description}
                                        </div>
                                        <div className='p-2'>
                                            {item.emotions.length !== 0 && item.emotions.map((emotion, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    className={`border-success btn m-1 rounded-pill ${emotion.level > 5 ? 'text-light' : ''}`}
                                                    style={{ 
                                                        backgroundColor: bd_color['positive'][emotion.level],
                                                        font: 'inherit',
                                                    }}
                                                >
                                                    {emotion.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )))}
                    </div>
                </div>
            </div>

            {thanksError && (
                <p className="mt-3" style={{ color: 'red' }}>
                    {thanksError}
                </p>
            )}
        </div>
    );
}

export default Thanks;