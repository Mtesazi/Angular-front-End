# Angular Front-End (Employee CRUD)

This is the Angular front-end for the Employee CRUD application.

Backend repository:
- https://github.com/Mtesazi/ems-back-end.git

The app runs against a backend API server (Spring Boot) via Angular proxy.

## Tech Stack

- Angular 15.2.x
- TypeScript 4.9.x
- Bootstrap 5

## Prerequisites

- Node.js 18.x (recommended for this project version set)
- npm 9+

## Install

```bash
npm install
```

## Run With Backend

Backend expectation:
- API base: `http://localhost:8080/api`
- Employee endpoint: `http://localhost:8080/api/employees`
- Proxy route from Angular: `/api`

Backend quick start (from your backend repository):

```bash
git clone https://github.com/Mtesazi/ems-back-end.git
cd ems-back-end
mvn clean install
mvn spring-boot:run
```

Note:
- If your backend code is under a nested folder such as `ems-back-end-ems`, run Maven commands from that folder.
- Ensure your database settings in backend `application.properties` are configured and the backend starts on port `8080`.

Frontend command:

```bash
npm start
```

This uses `ng serve --proxy-config proxy.config.json` and serves the app at:
- `http://localhost:4200`

If backend is not running, API calls will fail with `ECONNREFUSED` in the dev server proxy logs.

## Environment Notes

- Development config: `src/environments/environment.ts`
	- `apiUrl: '/api'`
- Production config: `src/environments/environment.prod.ts`
	- `apiUrl: 'http://localhost:8080/api'`

## Build

```bash
npm run build
```

## Test

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

## Troubleshooting

- Dependency resolution error (`ERESOLVE`):
	- Ensure Angular packages are aligned to 15.2.10+ patch line in `package.json`.
- Proxy error to backend (`ECONNREFUSED`):
	- Start backend on port `8080`, or update `proxy.config.json` target.
- First CLI prompt about autocompletion:
	- You can safely answer `n`.

## Useful Scripts

- `npm start` - run dev server with proxy
- `npm run build` - production build
- `npm test` - unit tests (Karma)
