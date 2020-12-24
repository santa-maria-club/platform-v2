# CannAID Platform

CannAID is a platform that allows designing irrigation systems specially for indoor and outdoor growing.

### Prerequisites 📋

This is a list of tools you'll need to run the platform in your local enviroment.

- npm
- node
- nx

## Getting started 🚀

In order to run the application locally you have to clone the repository and run:

```bash
npm ci
nx run-many --all --target=serve --parallel
```

This starts an express server on port 3333.

## Running Tests ⚙️

Go to workspace folder and run:

```bash
nx run-many --all --target=test --parallel
```

## Built with 🛠️

- [Nx](http://www.dropwizard.io/1.0.2/docs/) - Workspace manager and CLI extension
- [NestJs](https://maven.apache.org/) - Backend framework

## Versioning 📌

We use [SemVer](http://semver.org/) for versioning. If you're looking for a list of,
every [tag in this repository](https://github.com/CannAID/platform/tags).

## Author ✒️

- **Daniel Marin** - [danmt](https://github.com/danmt)

## License 📄

This project is under MIT License - Look at this file [LICENSE.md](LICENSE.md) for more details.
