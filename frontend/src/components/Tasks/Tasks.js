export default function Tasks() {
    const tasks = [
        {
            name: 'Осознание неоправданных чувств и поведения',
            url: '/task1',
            descritpion: 'Если ты не хочешь, чтобы окружающие играли на твоих нервах, выполни несколько упражнений на самопознание, поведение и управление эмоциями.'
        },
        {
            name: 'Корректировка поведения с людьми и в ситуациях, которые действуют тебе на нервы',
            url: '/task2',
            descritpion: 'Невозмоно научиться управлять собой в сложных ситуациях, если всегда стараться избегать их. Поэтому тут и есть это упражнение: '
        },
    ];
    return (
        <div className='container'>
            <div className="mt-5 p-5 mb-4 rounded bg-light" >
                <h3>Упражнения</h3>

                {tasks.map((task, i) => (
                    <div key={i} className="col-md-8 px-0 mb-5">
                        <div>
                            {task.descritpion}
                            <a className="link-dark" href={task.url}>
                                {task.name}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}