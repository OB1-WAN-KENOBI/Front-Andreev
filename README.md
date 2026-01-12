Демо

[https://ob1-wan-kenobi.github.io/Front-Andreev/](https://ob1-wan-kenobi.github.io/Front-Andreev/)


## Структура проекта

```
src/
├── components/
│   ├── common/
│   │   ├── LoadingSkeleton.tsx    # Скелетон для загрузки
│   │   └── LoadingSkeleton.css
│   ├── Header/
│   │   ├── Header.tsx             # Шапка сайта
│   │   ├── Navigation.tsx         # Desktop навигация
│   │   ├── MobileMenu.tsx         # Мобильное меню
│   │   └── *.css
│   ├── Icons/
│   │   ├── ArrowIcon.tsx          # SVG иконка стрелки
│   │   ├── LogotypeIcon.tsx       # SVG логотип
│   │   └── SearchIcon.tsx         # SVG иконка поиска
│   ├── Modal/
│   │   ├── Modal.tsx              # Модальное окно
│   │   └── Modal.css
│   ├── PostGrid/
│   │   ├── PostCard.tsx           # Карточка поста
│   │   ├── PostGrid.tsx           # Сетка постов
│   │   └── *.css
│   └── SearchBar/
│       ├── SearchBar.tsx          # Строка поиска
│       └── SearchBar.css
├── hooks/
│   ├── usePosts.ts                # Хук для загрузки постов
│   └── useSearch.ts               # Хук для поиска
├── services/
│   └── api.ts                     # API слой для запросов
├── types.ts                       # TypeScript типы
├── App.tsx                        # Главный компонент
├── main.tsx                       # Точка входа
└── index.css                      # Глобальные стили
```

