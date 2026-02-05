const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Метод квадратов Декарта онлайн",
      "url": "https://square.pragmatsoft.com/",
      "applicationCategory": "DecisionSupportApplication",
      "operatingSystem": "Any",
      "description": "Онлайн-инструмент для принятия решений с использованием метода квадратов Декарта.",
      "inLanguage": "ru",
    },
    {
      "@type": "HowTo",
      "name": "Как принять решение методом квадратов Декарта",
      "description": "Пошаговое применение метода квадратов Декарта для анализа решений.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Сформулировать решение",
          "text": "Определите действие или выбор, который нужно оценить."
        },
        {
          "@type": "HowToStep",
          "name": "Заполнить 4 квадрата",
          "text": "Ответьте на вопросы: что будет и чего не будет, если сделать или не сделать."
        },
        {
          "@type": "HowToStep",
          "name": "Сравнить последствия",
          "text": "Оцените риски, выгоды и упущенные возможности."
        }
      ]
    }
  ],
};

export default function JsonLD() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
