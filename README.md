# ReactForces Backend

ReactForces is a Chrome extension for Codeforces that allows users to rate a problem through an emoji. This project provides the backend API for the extension.

## Installation

To install the project, follow these steps:

1. Clone the repository: `git clone https://github.com/kprasant35/ReactForces-Backend.git`
2. Install dependencies: `npm install`

## API Endpoints

The following API endpoints are available:

### GET /api/v1/problems

This endpoint returns the current emoji count of a problem.

##### Request

```
GET /api/v1/problems?problemId=<problemId> HTTP/1.1
Host: localhost:3000
```

**Note:** problemId = contestId + Problem Name

##### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
    "problemId": "1821+Timber",
    "reactions": [1, 2, 3] // denoting boring, nice and amazing emoji count
}
```

### PATCH /api/v1/problems

This endpoint updates the current emoji count of a problem.

##### Request

```
PATCH /api/v1/problems HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
    "problemId": "1821+Timber",
    "previousEmoji": "boring",
    "currentEmoji": "nice"
}
```

##### Response

```
HTTP/1.1 200 OK
Content-Type: application/json
{
    "problemId": "1821+Timber",
    "reactions": [0, 3, 3] // denoting boring, nice and amazing emoji count
}
```

### GET /api/v1/users

This endpoint returns the current emoji rating of a user for a particular problem.

##### Request

```
GET /api/v1/users?problemId=<problemId>&userId=<userId> HTTP/1.1
Host: localhost:3000
```

##### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
    "problemId": "1821+Timber",
    "userId": "123",
    "emoji": "nice"
}
```

### PATCH /api/v1/users

This endpoint updates the current emoji rating of a user for a particular problem.

##### Request

```
PATCH /api/v1/users HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
    "problemId": "1821+Timber",
    "userId": "abc123",
    "currentEmoji": "amazing"
}
```

##### Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
    "problemId": "1821+Timber",
    "userId": "abc123"
    "emoji": "amazing"
}
```
