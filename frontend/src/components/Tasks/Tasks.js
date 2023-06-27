export default function Tasks() {
    const tasks = [{ name: 'Осознание неоправданных чувств и поведения', url: '/task1', descritpion: 'Если ты не хочешь, чтобы окружающие играли на твоих нервах, выполни несколько упражнений на самопознание, поведение и управление эмоциями.' }];
    return (
        <div className='container'>
            <div className="mt-5 p-5 mb-4 rounded bg-light" >
                <h3>Упражнения</h3>

                {tasks.map(task => (
                    <div className="col-md-8 px-0">
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