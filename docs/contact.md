# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers:

- Authorization: token

Request Body :

```json
{
  "first_name": "Roihan",
  "last_name": "Sori",
  "email": "roihan12@gmail.com",
  "phone": "+6285423399446"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Roihan",
    "last_name": "Sori",
    "email": "roihan12@gmail.com",
    "phone": "+6285423399446"
  }
}
```

Response Body Error:

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers:

- Authorization: token

Request Body :

```json
{
  "first_name": "Roihan",
  "last_name": "Sori",
  "email": "roihan12@gmail.com",
  "phone": "+6285423399446"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Roihan",
    "last_name": "Sori",
    "email": "roihan12@gmail.com",
    "phone": "+6285423399446"
  }
}
```

Response Body Error:

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers:

- Authorization: token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Roihan",
    "last_name": "Sori",
    "email": "roihan12@gmail.com",
    "phone": "+6285423399446"
  }
}
```

Response Body Error:

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers:

- Authorization: token

Query Params :

- name: Search by first name or last name, using like, optional
- email: Search by email , using like, optional
- phone: Search by phone, using like, optional
- page: number of page defaults 1
- size: size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Roihan",
      "last_name": "Sori",
      "email": "roihan12@gmail.com",
      "phone": "+6285423399446"
    },
    {
      "id": 2,
      "first_name": "Thomas",
      "last_name": "Muller",
      "email": "thomas@gmail.com",
      "phone": "+3485423399446"
    }
  ],

  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error:


## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers:

- Authorization: token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error:

```json
{
  "errors": "Contact is not found"
}
```
