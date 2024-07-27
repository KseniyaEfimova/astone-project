# The Star Wars Characters App

> запуск приложения

```sh
npm i
```
```sh
npm run dev
```
## Функционал приложения
---

- Регистрация и авторизация пользователей
- Главная страница со списком персонажей вселенной Star Wars
- Просмотр детальной информации о персонаже
- Поиск персонажей по имени с выпадающими подсказками
- История поиска для авторизованных пользователей
- Избранные персонажи для авторизованных пользователей

## Реализованные требования:
---
> 1 уровень (обязательный - необходимый минимум):

- [x] Реализованы Требования к функциональности

- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используется localStorage

- [x] Функциональные компоненты c хуками

- [x] Есть разделение на [умные](src/Pages/Search/Search.tsx) и [глупые](src/Components/Search-bar/Search-input.tsx) компоненты

- [x] Есть рендеринг [списков](src/Pages/Characters/Characters-list.tsx)

- [x] Реализована хотя бы одна [форма](src/Components/Authentication-form/auth-form.tsx)

- [x] Есть применение [Контекст API](src/Authentication/Auth-context.tsx)

- [x] Есть применение [предохранителя](src/App.tsx)

- [x] Есть кастомные хуки [useLocalStorage](src/Authentication/use-locale-storage.ts) [useFavorites](src/Pages/Favorites/useFavorites.ts) [useSearchLogic](src/Components/Search-bar/use-search-logic.ts) [useAuth](src/Authentication/Auth-context.tsx)

- [x] Пара компонентов использует PropTypes [FilmInfo](src/Components/Char-card/Film-info.tsx) и [PlanetInfo](src/Components/Char-card/Planet-info.tsx)

- [x] Используется [useDebounce](src/Components/Search-bar/use-search-logic.ts)

- [x] Есть применение [lazy](src/router/router.tsx) + [Suspense](src/App.tsx)

- [x] Используется [Modern Redux with Redux Toolkit](src/store/store.ts) 

- [x] Используются [слайсы](src/slices)

- [x] Есть кастомная мидлвара [favoritesMiddleware](src/middleware/favorites-middleware.ts) и [searchHistoryMiddleware](src/middleware/search-middleware.ts)

- [x] Используется [RTK Query](src/slices/api-slice.ts)

- [x] Используется [Transforming Responses](src/slices/api-slice.ts)

 > 2 уровень (необязательный):

- [x] Использование TypeScript
