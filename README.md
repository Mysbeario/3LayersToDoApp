# TO DO APP with 3 LAYERS ARCHITECTURE

## Prerequisite

- .Net Core Runtime 3.1
- .Net CORE SDK 3.1
- NodeJS
- Node Package Manager (npm)
- SQLite
- Terminal which supports _Bash_ (ex: Git Bash, Windows Subsystem for Linux, ...)
- Visual Studio Code (optional)

## How-To

### :mega: First thing first

:fire: You **MUST** restore all projects.

> On Visual Studio Code, press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>, type `Restore` and choose `.NET: Restore all project`.

### :hammer: Build

> **Note:** You must stay in the root folder of the repository

```bash
dotnet build ./Web
```

### :car: Run

> **Note:** You must stay in the root folder of the repository

```bash
dotnet run --project ./Web
```

Go to `http://localhost:5000` to open the app.
