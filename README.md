# partygames-app
## Deploying the Application

```bash
sam build && sam deploy samconfig.toml
```

You can find your API Gateway Endpoint URL in the output values displayed after deployment.
default is `https://fevdh0f1ii.execute-api.ap-southeast-2.amazonaws.com/prod`

## Testing Locally

first run docker-compose up to run dynamoDb
```bash
docker-compose up
```

then run ./init.sh to create all required tables
```bash
./init.sh
```

Then run feature tests

```bash
yarn test
```

## Running Locally

The SAM CLI allows for local commands to mock an api gateway. However, that is slow and does not work well with layers so I have structured the code without respect to .aws-sam where the code is run from. `sam local start-api` won't work.
Instead, write feature tests which run much faster inside the **tests** directory.

## Directory Structure

```markdown
.
├── docker-compose.yml
├── docs
│   └── games.md
├── init.sh
├── jest-dynamodb-config.js
├── jest.config.js
├── package-lock.json
├── package.json
├── samconfig.toml
├── src
│   ├── _layers
│   │   └── common
│   │       ├── dbClient.js
│   │       ├── models
│   │       │   ├── Game.js
│   │       │   └── User.js
│   │       ├── package-lock.json
│   │       ├── package.json
│   │       └── tables
│   │           ├── gamesTable.js
│   │           └── usersTable.js
│   ├── game
│   │   ├── app.js
│   │   ├── handlers
│   │   │   ├── createGame.js
│   │   │   └── getGame.js
│   │   ├── layerDeps.js
│   │   └── package.json
│   └── user
│       ├── app.js
│       ├── handlers
│       │   ├── createUser.js
│       │   └── getUser.js
│       ├── layerDeps.js
│       └── package.json
├── template.yaml
├── tests
│   ├── __tests__
│   │   ├── gameFunction.test.js
│   │   └── userFunction.test.js
│   └── utils
│       ├── generateEvent.js
│       └── steps.js
└── README.md
```