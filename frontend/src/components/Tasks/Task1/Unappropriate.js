import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectTasks,
    getEnties,
    newEntry
} from '../../../reducers/taskSlice';

export default function Unappropriate() {
    const tasks = useSelector(selectTasks);
    const [show_form, set_show_form] = useState(false);
    const [situation, set_situation] = useState('');
    const [feelings_actions, set_feelings_actions] = useState('');
    const [desired_feelings_actions, set_desired_feelings_actions] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEnties('task1'));
    }, [dispatch]);

    const new_event = (e) => {
        e.preventDefault();
        if (situation && feelings_actions && desired_feelings_actions) {
            dispatch(newEntry({ situation, feelings_actions, desired_feelings_actions }, 'task1'))
        }
    }

    return (
        <div className='container'>
            <div className="mt-5 p-5 mb-4 rounded bg-light" >
                <div className="col-md-8 px-0">
                    <h1 className="col-9 display-4 fst-italic">Осознание неоправданных чувств и поведения</h1>
                    <div className="lead my-3">Наблюдай за собой и определяй, когда ты бурно реагируешь или расстраиваешься или ты испытываешь:
                        <ul>
                            <li>чрезмерное волнение или беспокойство</li>
                            <li>сильный гнев или обиду</li>
                            <li>глубокое уныние или чрезмерное чувство вины</li>
                            <li>чрезмерное волнение</li>
                        </ul>
                    </div>
                    <p className="lead my-3">В помощь тебе будет данное упражнение, в котором тебе нужно добавлять записи в таблицу, которая находится ниже.</p>
                    <a className="btn btn-outline-secondary" onClick={() => set_show_form(true)}>Добавить</a>
                </div>

            </div>
            {show_form && (
                <form className="card p-2" onSubmit={new_event}>
                    <h4 className="ms-3 mb-3">Новая запись</h4>
                    <div className="row g-3">
                        <div className="col-12">
                            <label for="address2" class="form-label">Описание ситуации <span className="text-muted"></span></label>
                            <textarea
                                required={true}
                                type="text"
                                value={situation}
                                onChange={e => set_situation(e.target.value)}
                                className="form-control"
                                placeholder="Пример: Начал работу над важным отчетом..." />
                        </div>
                        <br />
                        <div className="col-12">
                            <label for="address2" class="form-label">Описание чувств и поведения <span className="text-muted"></span></label>
                            <textarea
                                required={true}
                                type="text"
                                value={feelings_actions}
                                onChange={e => set_feelings_actions(e.target.value)}
                                className="form-control"
                                placeholder="Пример: Вялость - поиск других более или менее важных дел..." />
                        </div>
                        <br />
                        <div className="col-12">
                            <label for="address2" class="form-label">Описание чувств и поведения, которые привели бы к нужному для тебя исходу <span className="text-muted"></span></label>
                            <textarea
                                required={true}
                                type="text"
                                value={desired_feelings_actions}
                                onChange={e => set_desired_feelings_actions(e.target.value)}
                                className="form-control"
                                placeholder="Пример: Отложил работу над крупным проектом и начал работать над тем, что по силам сейчас..." />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-secondary w-100 btn-lg">Сохранить</button>
                        </div>
                    </div>
                </form>
            )}
            <hr className='my-5' />
            <h3 className='text-center'>Мои записи:</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Неоправданные чувства и поведение</th>
                        <th scope="col">События, вызвавшие их</th>
                        <th scope="col">Оправданные чувства и поведение</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((item, j) => (
                        <tr key={j}>
                            <th scope="row">{j + 1}</th>
                            <th scope="row">{item.feelings_actions}</th>
                            <th scope="row">{item.situation}</th>
                            <th scope="row">{item.desired_feelings_actions}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}