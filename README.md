# Dev-config
Tool designed to facilitate the setup of development configurations. It includes configurations for commonly used tools like Prettier, ESLint, and TS-Config, which can be time-consuming to configure manually. 

# Usage 

```bash
npx @lgauthier1-packages/dev-config@lastest
```

# Roadmap

- [X] FEAT: Copy a simple JSON config for prettier, eslint, and gitignore.
- [X] TECH: Enable eslint and prettier for this repository.
- [X] FEAT: Publish this repository to npm for easy use with npx.
- [X] TECH: Set up a CI/CD pipeline to automatically bump and publish to npm.
- [ ] FEAT: Update package.json dependencies & script
- [ ] FEAT: Option to enable conventionnal-commit commit hook
- [ ] FEAT: Option to enable prettier & eslint pre-commit hook
- [ ] TECH: Write Tests and run test
- [ ] ...

# C.I.C.D.
Package deployment is automated based on events on the main branch:

- When a pull request is made to the main branch (or commit), an autobump is triggered (see .github/workflows/xxxxx.yml) that updates the version of the package.json and pushes a tag.
- When a new tag is pushed to the main branch, a package is pushed to the npm registry "lgauthier1-packages".


ℹ️   SETUP: 

Some settings are required to enable the C.I.C.D:
- Add npm `NPM_TOKEN` in https://github.com/{GITHUB_USER}/{YOUR_REPO}/settings/secrets/actions
- Add `Read and write permission` in Workflow permissions section https://github.com/{GITHUB_USER}/{YOUR_REPO}/settings/actions

# Inspiration

- [https://github.com/benawad/tsconfig.json](Benawad https://youtu.be/0xjfkl9nODQ)
