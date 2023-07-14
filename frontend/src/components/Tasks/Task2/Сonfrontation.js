import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectTasks,
    getEnties,
    newEntry
} from '../../../reducers/taskSlice';

export default function Сonfrontation() {
    const tasks = useSelector(selectTasks);
    const [show_form, set_show_form] = useState(false);
    const [situation, set_situation] = useState('');
    const [beliefs, set_beliefs] = useState('');
    const [excuses, set_excuses] = useState('');
    const [excuses_сhecking, set_excuses_сhecking] = useState('');
    const [necessary_actions, set_necessary_actions] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEnties('task2'));
    }, [dispatch]);

    const new_event = useCallback(e => {
        e.preventDefault();
        if (situation && beliefs && excuses && excuses_сhecking && necessary_actions) {
            dispatch(newEntry({ situation, beliefs, excuses, excuses_сhecking, necessary_actions }, 'task2'))
        }
    })

    return (
        <div className='container'>
            <div className="mt-5 p-5 mb-4 rounded bg-light" >
                <div className="col-md-8 px-0">
                    <h1 className="col-9 display-4 fst-italic">Изменение шаблонов поведения в свою пользу</h1>
                    <div className="lead my-3">
                        Данное упражнение заключается в том, чтобы изменить свое реагирование во время неблагоприятных для тебя событий.
                    </div>
                    <div className="lead my-3">
                        Для начала отметь одно событие, которое тебя всякий раз заставляет злиться, выходить из себя и т.п. Это может быть ситуация, люди, обстоятельства на работе.
                        Добавь ниже краткое описание ситуции и то, как ты бы хотела себя вести в них. Так ты всегда будешь ее видеть на этой странице и отмечать прогресс.
                        Проработав так одну ситуацию, можешь приступать к следующей. Ты можешь так же работать над несколькими ситуациями в одно время, но лучше не ставить для себя слишком много задач.
                    </div>
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
                                placeholder="Пример: Коллега постоянно отвлекает на работе, не давая сосредоточиться." />
                        </div>
                        <br />
                        <div className="col-12">
                            <label for="address2" class="form-label">Описание неразумных верований, оправдывающих деструктивную реакцию <span className="text-muted"></span></label>
                            <textarea
                                required={true}
                                type="text"
                                value={beliefs}
                                onChange={e => set_beliefs(e.target.value)}
                                className="form-control"
                                placeholder="Пример: Всех людей надо выслушивать, иначе проявишь бестактность." />
                        </div>
                        <br />
                        <div className="col-12">
                            <label for="address2" class="form-label">Возможные оправдания ситуации<span className="text-muted"></span></label>
                            <textarea
                                required={true}
                                type="text"
                                value={excuses}
                                onChange={e => set_excuses(e.target.value)}
                                className="form-control"
                                placeholder="Пример: У коллеги сейчас сложности в семье, он чувствует себя одиноким, если я не выслушаю его, он вконец разочаруется в людях." />
                        </div>
                        <br />
                        <div className="col-12">
                            <label for="address2" class="form-label">Ответь: действительно ли существенны оправдания ситуации?<span className="text-muted"></span></label>
                            <textarea
                                required={true}
                                type="text"
                                value={excuses_сhecking}
                                onChange={e => set_excuses_сhecking(e.target.value)}
                                className="form-control"
                                placeholder="Пример: У меня может быть страх, что коллега со мной больше не заговорит." />
                        </div>
                        <br />
                        <div className="col-12">
                            <label for="address2" class="form-label">Описание действия по борьбе с привычкой <span className="text-muted"></span></label>
                            <textarea
                                required={true}
                                type="text"
                                value={necessary_actions}
                                onChange={e => set_necessary_actions(e.target.value)}
                                className="form-control"
                                placeholder="Пример: Лучше мягко сообщить, что сейчас тебе нужно выполнить задачу вовремя. Попросить рассказать чуть позже на обеденном перерыве, например." />
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
                        <th scope="col">Описание события</th>
                        <th scope="col">Верования, которые являются причиной моих неоправданных чувств и поведения</th>
                        <th scope="col">Оправдание события</th>
                        <th scope="col">Проверка оправдания события</th>
                        <th scope="col">Действия по борьбе с верованиями и привычками</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((item, j) => (
                        <tr key={j}>
                            <th scope="row">{j + 1}</th>
                            <th scope="row">{item.situation}</th>
                            <th scope="row">{item.beliefs}</th>
                            <th scope="row">{item.excuses}</th>
                            <th scope="row">{item.excuses_сhecking}</th>
                            <th scope="row">{item.necessary_actions}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}