# Games API doc

## Model

### Game
|      Field      |  Type   | required |       Constraints        |
| --------------- | ------- | -------- | ------------------------ |
| id              | String  | *        | Unique and generated     |
| name            | String  | *        | Length [1, 25]           |
| type            | String  | *        | [Available types]()      |
| allowNicknames  | Boolean | *        |                          |
| maxParticipants | Number  | *        | Between [2, 100]         |
| createdAt       | String  | *        | Generated                |
| updatedAt       | String  | *        | Generated on each change |

### Game Type
|      Type      | Default Players |                                                  Description                                                  |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------- |
| WouldYouRather | 2               | Round based game where every player is given a choice between two things and you must choose which you prefer |

## Api

### Create a game
```
curl -X POST http://localhost:3000/games \
  -H "content-type: application/json" \
  -d '{
    "name": "Boss boys",
    "type": "WouldYouRather",
    "allowNicknames": true
  }'
```

#### Example Response
```
{
  "id": "d7ed1546-df93-4e1b-ab19-5054006dc056",
  "type": "WouldYouRather",
  "name": "Boss boys",
  "allowNicknames": true,
  "maxParticipants": 5,
  "createdAt": "2021-03-02T08:35:02.050Z",
  "updatedAt": "2021-03-02T08:35:02.050Z"
}
```

#### Required Fields
|     Field      |                              Description                              |
| -------------- | --------------------------------------------------------------------- |
| type           | The type of game which will determine the rules and available actions |
| allowNicknames | Let people pick their own names or randomly assigned one              |

#### Optional Fields
|      Field      |                               Description                               |
| --------------- | ----------------------------------------------------------------------- |
| maxParticipants | Set the maximum allowed number of participants, default depends on type |
| name            | Name of the game for the session or a random one will be used           |


#### Errors

| HTTP CODE |      MESSAGE      |
| --------- | ----------------- |
| 400       | BAD_REQUEST       |
| 403       | UNKNOWN_GAME_TYPE |


<br>  
<br>  

### Get a Game by id
```
curl -X GET http://localhost:6800/games/d7ed1546-df93-4e1b-ab19-5054006dc056
```

#### Example Response
```
{
  "id": "d7ed1546-df93-4e1b-ab19-5054006dc056",
  "type": "WouldYouRather",
  "name": "Boss boys",
  "allowNicknames": true,
  "maxParticipants": 5,
  "createdAt": "2021-03-02T08:35:02.050Z",
  "updatedAt": "2021-03-02T08:35:02.050Z"
}
```

#### Required Paramaters
| Paramaters |            Description            |
| ---------- | --------------------------------- |
| id         | The unique identifier of the game |

<br>  
<br>  