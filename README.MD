# MakeAuth
## Базовая авторизация и аутентификация
 



##### MakeAuth- имеет возможность по роутам регистрировать пользователя, логиниться, а у пользователя с ролью ADMIN есть возможность просматривать список зарегистрированных пользователей. Пользователи храняться в базе данных MongoDb  

---

POST порты:
- http://localhost:5000/auth/registration - Порт для регистрации
- http://localhost:5000/auth/login - Порт для входа, после успешного входа, выдается токен

В теле запроса должен быть JSON, например:
```sh
{
    "username": "user",
    "password": "user123"
}
```
GET порты:

- http://localhost:5000/auth/check - Роут только для зарегестрированных пользователей
- http://localhost:5000/auth/users - Роут только для ADMIN 

(В заголовке Authorization должна быть строка Bearer и токен, который был получен после входа по порту http://localhost:5000/auth/login)

```sh
Authorization: Bearer eyJhbGciOiJIUzI1NiIsI225cCI6IkpXVCJ9.eyJpZ321NGM5M2VhZTA2YTkzMzA2NmUzYjFkNCIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJBRE1JTiJasdYXQiOjE2OTk2MTU2ODgsImV4cCI6MTY5OTc4ODQ4OH0.3Ni1e-M184zvhxawHVHr5lDvSZJ-r3TSd5IJ6WLVxDA
```
---
Для начала работы с проектом, установить все зависимости и стартануть проект
```sh
npm run start
```