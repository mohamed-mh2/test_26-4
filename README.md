# Mythical Pets 🐾

A simple CRUD web app to manage a list of mythical pets. Built with vanilla HTML, CSS, and JavaScript using a REST API (MockAPI).

---

## Features

- View all pets fetched from the API on page load
- Add a new pet with name, type, color, and description
- Delete a pet with confirmation prompt

---

## Files

| File | Description |
|---|---|
| `test.html` | Page structure and layout |
| `test.css` | Styles |
| `test.js` | All logic — fetch, render, POST, DELETE |

---

## How It Works

### GET
On page load, `renderData()` sends a GET request to the API and renders each pet as a card in the list.

```js
const response = await fetch(Api);
const data = await response.json();
data.forEach(item => { /* build card */ });
```

### POST
When the form is submitted, the pet object is sent as JSON. On success the form resets and `renderData()` re-fetches the updated list.

```js
await fetch(Api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
});
```

### DELETE
Each card's delete button holds the pet's `id`. On click, a DELETE request is sent and the card is removed from the DOM if successful.

```js
await fetch(`${Api}/${item.id}`, { method: "DELETE" });
```

---

## API

Using [MockAPI](https://mockapi.io) for a free hosted REST endpoint.

**Base URL:** `https://69ea51dc15c7e2d51269ad63.mockapi.io/pets`

| Method | Endpoint | Action |
|---|---|---|
| GET | `/pets` | Fetch all pets |
| POST | `/pets` | Add a new pet |
| DELETE | `/pets/:id` | Delete a pet by ID |

---

## Pet Object

```json
{
  "id": "1",
  "name": "Ember",
  "type": "Dragon 🐉",
  "color": "Red",
  "description": "Breathes fire and loves naps"
}
```

---

## Run Locally

No build step needed. Just open `test.html` in a browser.

```bash
open test.html
```

Or use a local server like VS Code Live Server.
