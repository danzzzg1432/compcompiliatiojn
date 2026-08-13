# API Design Sample

The following is an example of how you could express the API definition in
Markdown format. Your design will be hand-marked, and so as long as we can
understand it, we are happy.

## POST /books

Given a book's details, add it to the library.

If a book with a matching title and author is already present, the `copies` and
`copiesAvailable` attributes are incremented, and the existing book's ID is
returned.

If no matching book is present, a new `bookId` is generated, the new book is
stored in the system, then the generated `bookId` is returned.

### Header

```
SESSION: a complex and secure session token
```

### Body

```json
{
  "title": "Running Microsoft Windows NT Server 4.0",
  "authors": [
    "Charlie Russel"
  ]
}
```

### 200

```json
{
  "bookId": 1234
}
```

### 400

Error object:
* `INVALID_TITLE` Book title is empty, or greater than 100 characters in length.
* `INVALID_AUTHOR` Book author array is empty.

### 401

Error object:
* `UNAUTHORISED` Session is empty or invalid (does not refer to valid logged-in
  student or librarian session)

### 403

Error object:
* `FORBIDDEN` Session corresponds to a user whose role is not `LIBRARIAN`

## Careful!

Don't add your definitions here! This file is not collected for marking! Go over
to `design.md` and write them there instead.
