# Tutoring21-2-TodoApp
2021년도 2학기 동반성장 튜터링 - 투두리스트 만들기

## 📝 API
### TodoList 불러오기

| method | uri |
|---|---|
|GET|/todos|

```javascript
{
    response: [
        {
            "id": "string",
            "title": "string",
            "priority": "string",
            "completed": "boolean",
            "created_at": "string",
            "updated_at": "string"
        }
        ...
    ]
}
```

### Todo 불러오기

| method | uri |
|---|---|
|GET|/todos/${id}|

```javascript
{
    response: {
        "id": "string",
        "title": "string",
        "priority": "string",
        "completed": "boolean",
        "created_at": "string",
        "updated_at": "string"
    }
}
```

### Todo 개수 불러오기

| method | uri |
|---|---|
|GET|/todos/count|

```javascript
{
    response: "number"
}
```


### Todo 추가하기

| method | uri |
|---|---|
|POST|/todos|

```javascript
{
    requestBody: {
        "title": "string"
    },
    response: {
        "id": "string",
        "title": "string",
        "priority": "string",
        "completed": "boolean",
        "created_at": "string",
        "updated_at": "string"
    }
}
```

### Todo 수정하기

| method | uri |
|---|---|
|PUT|/todos/${id}|

```javascript
{
    requestBody: {
        "title": "string",
        "priority": "string",
        "completed": "boolean",
        "created_at": "string",
        "updated_at": "string"
    },
    response: {
        "id": "string",
        "title": "string",
        "priority": "string",
        "completed": "boolean",
        "created_at": "string",
        "updated_at": "string"
    }
}
```

### Todo 제거하기

| method | uri |
|---|---|
|DELETE|/todos/${id}|

```javascript
{
    response: {
        "id": "string"
    }
}
```
