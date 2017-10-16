![cf](https://i.imgur.com/7v5ASc8.png) Lab 08: Vanilla REST API
======

## Server Endpoints
### `/api/simple-resource-name`
* `POST` request
 * pass data as stringifed JSON in the body of a **POST** request to create a new resource
* `GET` request
 * pass `?id=<uuid>` as a query string parameter to retrieve a specific resource (as JSON)
 * generic GET will return all notes.
* `DELETE` request
 * pass `?id=<uuid>` in the query string to **DELETE** a specific resource
 * this should return a 200 status code with the body of the deleted resource.
* `PATCH` request
  * pass `?id=<uuid>` in the query string to **PATCH** a specific resource.
  * will return 404 if there isnt note corresponding to the ID.
* `PUT` request
  * pass `?id=<uuid>` in the query string to **PUT** a note at a specific id.
  * will return 400 if no ID is provided.
