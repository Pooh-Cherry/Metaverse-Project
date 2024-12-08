- [figma](https://www.figma.com/design/9DTukAvapyVa0CGf4BDCbA/AI-Email?node-id=267-4839&node-type=frame&t=O0MZA6vwWzpdICnP-0)
- [github](https://github.com/Pooh-Cherry/Metaverse-Project)

## Necessary APIs

### For Customers

<details open>
  <summary>
    login
  </summary>

method: `get`

request:

```
name: String
```

response:

```js
user: {
  id: Number,
  name: String,
  avatar: String
},
admin: {
  id: Number,
  name: String,
  avatar: String
},
messages: [
  {
    room: String,
    id: Number,
    text: String,
    from: {
      id: Number,
      name: String,
      avatar: String
    },
    to: {
      id: Number,
      name: String,
      avatar: String
    },
    attachments: Array,
    created_at: Datetime,
    updated_at: Datetime,
    status: Enum["read", "unreaad"],
  }
]
```

</details>

### For Admin

<details>
  <summary>
    login
  </summary>

method: `get`

request:

```
name: String
```

response:

```js
user: {
  id: Number,
  name: String,
  avatar: String
},
admin: {
  id: Number,
  name: String,
  avatar: String
},
users: [  //  except admin
  {
    id: Number,
    name: String,
    avatar: String
  }
]
messages: [
  {
    room: String,
    id: Number,
    text: String,
    from: {
      id: Number,
      name: String,
      avatar: String
    },
    to: {
      id: Number,
      name: String,
      avatar: String
    },
    attachments: Array,
    created_at: Datetime,
    updated_at: Datetime,
    status: Enum["read", "unreaad"],
  }
]
```

</details>

### Common

- file upload
