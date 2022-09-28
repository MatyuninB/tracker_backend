# Tracker

## Локальный запуск приложения

---

(Примеры для Mac OS)

1. Установить mkcert.
   `brew install mkcert`

2. Создать файлы сертификата. Создайте папку **cert** в корне проекта и переместите туда файлы key.pem и cert.pem.
   `mkcert -key-file key.pem -cert-file cert.pem “tracker.ru”`

3. Измените файл hosts. Добавьте строку "127.0.0.1 tracker.ru".
   `sudo nano /private/etc/hosts`

---

## Swagger

`https://tracker.ru:3000/api`

Для начала переходим в браузере по `https://tracker.ru:3000/auth/google`, авторизуемся через гугл и далее
после редиректа копируем токен из строки адреса.
`https://tracker.ru:8080/?token=eyJhbG......`
Этот токен потом используем в swagger.
