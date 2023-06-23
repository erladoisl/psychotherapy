function Home() {
    const content = [
        {'theme': 'Благодарность',
         'descriptions': [
            'Самый простой старт улучшить свою модель поведения - это замечать положительные эмоции, такие как: доброта, благодарность, любовь.',
            'Назовем этот процесс медитацией любящей доброты. Наибольший эффект от этой медитации достигается при регулярной практике.'
        ]},
        {'theme': 'Неоправданные чувства и поведение',
         'descriptions': [
            'Если вы не хотите, чтобы окружающие играли на ваших нервах, выполните несколько упражнений на самопознание, поведение и управление эмоциями.',
            'Воспользуйтесь ими, чтобы определить, когда ваши эмоции оправданны, а когда нет; разумны ли ваши верования, порождающие эмоции.'
        ]},
    ]
    return (
        <main>
            {content.map((item, index) => {
                return (
                    <div key={index} class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                        <div class="col-md-6 p-lg-5 mx-auto my-5">
                            <h1 class="display-5 fw-normal">{item.theme}</h1>
                            {item.descriptions.map((description, index) => {
                                return (
                                    <p key={index} class="lead fw-normal">{description}</p>
                            
                                )
                            })}
                            <a class="btn btn-outline-secondary" href="/thanks">Начать сейчас</a>
                        </div>
                        <div class="product-device shadow-sm d-none d-md-block"></div>
                        <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                    </div>
            )})}
        </main>
    );
}

export default Home;