function Home() {
    const content = [
        {
            'theme': 'Благодарность',
            'descriptions': [
                'Самый простой старт улучшить свою модель поведения - это замечать положительные эмоции, такие как: доброта, благодарность, любовь.',
                'Назовем этот процесс медитацией любящей доброты. Наибольший эффект от этой медитации достигается при регулярной практике.'
            ],
            'url': '/thanks'
        },
        {
            'theme': 'Неоправданные чувства и поведение',
            'descriptions': [
                'Если ты не хочешь, чтобы окружающие играли на твоих нервах, выполни несколько упражнений на самопознание, поведение и управление эмоциями.',
                'Воспользуйся ими, чтобы определить, когда твои эмоции оправданны, а когда нет; разумны ли твои верования, порождающие эмоции.'
            ],
            'url': '/task1'
        },
    ]
    return (
        <main>
            {content.map((item, index) => {
                return (
                    <div key={index} className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                        <div className="col-md-6 p-lg-5 mx-auto my-5">
                            <h1 className="display-5 fw-normal">{item.theme}</h1>
                            {item.descriptions.map((description, index) => {
                                return (
                                    <p key={index} className="lead fw-normal">{description}</p>

                                )
                            })}
                            <a className="btn btn-outline-secondary" href={item['url']}>Начать сейчас</a>
                        </div>
                        <div className="product-device shadow-sm d-none d-md-block"></div>
                        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                    </div>
                )
            })}
        </main>
    );
}

export default Home;