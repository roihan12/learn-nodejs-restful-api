# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers:

- Authorization: token

Request Body :

```json
{
  "street": "Jl.Jendral Sudirman",
  "city": "Jakarta Selatan",
  "province": "Jakarta",
  "country": "Indonesia",
  "postal_code": "133034"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jl.Jendral Sudirman",
    "city": "Jakarta Selatan",
    "province": "Jakarta",
    "country": "Indonesia",
    "postal_code": "133034"
  }
}
```

Response Body Error:

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:id

Headers:

- Authorization: token

Request Body :

```json
{
  "street": "Jl.Jendral Sudirman updated",
  "city": "Jakarta Selatan",
  "province": "Jakarta",
  "country": "Indonesia",
  "postal_code": "133034"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jl.Jendral Sudirman updated",
    "city": "Jakarta Selatan",
    "province": "Jakarta",
    "country": "Indonesia",
    "postal_code": "133034"
  }
}
```

Response Body Error:

```json
{
  "errors": "Country is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/addresses/:id

Headers:

- Authorization: token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jl.Jendral Sudirman updated",
    "city": "Jakarta Selatan",
    "province": "Jakarta",
    "country": "Indonesia",
    "postal_code": "133034"
  }
}
```

Response Body Error:

```json
{
  "errors": "Address is not found"
}
```

## List Address API

Endpoint : GET /api/contacts/:contactId/addresses

Headers:

- Authorization: token

Response Body Success :

```json
{
  "data": [
   {
    "id": 1,
    "street": "Jl. Gatot Subroto",
    "city": "Jakarta Selatan",
    "province": "Jakarta",
    "country": "Indonesia",
    "postal_code": "133034"
  }
   {
    "id": 2,
    "street": "Jl.Jendral Sudirman updated",
    "city": "Jakarta Selatan",
    "province": "Jakarta",
    "country": "Indonesia",
    "postal_code": "133034"
  }
  ]
}
```

Response Body Error:

```json
{
  "errors": "Contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:id

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
  "errors": "Address is not found"
}
```
