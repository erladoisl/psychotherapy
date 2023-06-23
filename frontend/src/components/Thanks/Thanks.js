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

function Thanks() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getThanks());
    }, [dispatch]);

    const thanks = useSelector(selectThanks);
    const thanksLoading = useSelector(selectThanksLoading);
    const thanksError = useSelector(selectThanksError);
    const [show_thanks_form, set_show_thanks_form] = useState(false);
    const [thanks_description, set_thanks_description] = useState('');

    const new_thanks = useCallback(e => {
        e.preventDefault();
        dispatch(newThanks(thanks_description));
        set_thanks_description('');
        set_show_thanks_form(false);
    });

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
                    <div className="input-group">
                        <input
                            type="textarea"
                            className="form-control"
                            placeholder="Опиши ситуацию"
                            value={thanks_description}
                            onChange={e => set_thanks_description(e.target.value)}
                        />
                        <button type="submit" className="btn btn-secondary">Добавить</button>
                    </div>
                </form>
            )}
            {thanksLoading ? (
                <Spinner animation="grow" />
            ) : (
                thanks.map((item, index) => (
                    <div key={item?.uuid} className='container'>
                        {item?.description}
                    </div>
                )
                ))}

            {thanksError && (
                <p className="mt-3" style={{ color: 'red' }}>
                    {thanksError}
                </p>
            )}
        </div>
    );
}

export default Thanks;