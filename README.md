# Решение тестового задания на позицию "Фронтенд разработчик"
- Компания: [Rocket Firm](https://rocketfirm.com/) (Казахстан)
- [Оригинал задания](https://rocketfirm.com/ru/job/+frontend-dev-astana/)

## Создать интерфейс фотостока на основе [Unsplash API](https://unsplash.com/developers)
В интерфейсе должны быть:
- Главная страница со списком
- Поиск
- История поиска на отдельных страницах
- Страница фотографии
- Добавление в избранное

Исходники залить в любой репозиторий git и развернуть результат на
VPS, можно использовать Heroku.

[Требуемый дизайн интерфейса](https://www.figma.com/file/VHHUfQm7sQsziibED8EAa5/Rocket-frontend-test?node-id=151%3A123)
в Фигме

## Дополнительно задание
Реализовать эту же задачу используя [Next.js](https://nextjs.org) для server-side-rendering.

# Реализация
## Предварительные требования
- Для сборки и работы нужен установленный [NodeJS](https://nodejs.org)
версии 14 или более

## Как собрать
- Скачать проект: ```git clone https://github.com/rrramble/Unsplash-API-with-NextJS-example```
- Перейти в папку проекта и запустить: ```npm install```
- Запуск в браузере на локальном компьютере: ```npm run start```
- Открыть ссылку: [http://localhost:3000](http://localhost:3000)
- Открыть фреймворк тестирования Cypress в интерактивном режиме:
```npm run cy```
