import Select from 'react-select'
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import {
    selectTasks,
    selectTasksLoading,
    selectTasksError,
    getTasks,
    newTask
} from '../../../reducers/taskSlice';
import {
    selectEmotions,
    getEmotions
} from '../../../reducers/emotionSlice';

export default function Unappropriate() {
    const tasks = useSelector(selectTasks);
    const tasksLoading = useSelector(selectTasksLoading);
    const tasksError = useSelector(selectTasksError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks('task1'));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getEmotions(true));
    }, [dispatch]);

    return (
        <div className='container'>
            <div className="mt-5 p-5 mb-4 rounded bg-light" >
                <div className="col-md-8 px-0">
                    <h1 className="col-9 display-4 fst-italic">Осознание неоправданных чувств и поведения</h1>
                    <p className="lead my-3">Наблюдай за собой и определяй, когда ты бурно реагируешь или расстраиваешься или ты испытываешь:
                        <ul>
                            <li>чрезмерное волнение или беспокойство</li>
                            <li>сильный гнев или обиду</li>
                            <li>глубокое уныние или чрезмерное чувство вины</li>
                            <li>чрезмерное волнение</li>
                        </ul>
                    </p>
                    <p className="lead my-3">В помощь тебе будет данное упражнение, в котором тебе нужно добавлять записи в таблицу, которая находится ниже.</p>
                    <a className="btn btn-outline-secondary" onClick={() => alert('Ожидается переход на нижнюю часть таблицы со строкой ввода новых данных')}>Добавить</a>
                </div>

            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Неоправданные чувства и поведение</th>
                        <th scope="col">События, вызвавшие их</th>
                        <th scope="col">Оправданные чувства и поведение</th>
                    </tr>
                </thead>
                <tbody>
                    {tasksLoading ? (
                        <Spinner animation="grow" />
                    ) : (
                        tasks.map((item, j) => (

                            <tr>
                                <th scope="row">{j + 1}</th>
                                <th scope="row">{item.feelings_actions}</th>
                                <th scope="row">{item.situation}</th>
                                <th scope="row">{item.desired_feelings_actions}</th>
                            </tr>
                        )))}
                </tbody>
            </table>
        </div>
    )
}