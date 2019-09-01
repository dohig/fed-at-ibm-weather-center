### Welcome to this FED@IBM workshop!

Today we’re going to work with the [hooks API](https://reactjs.org/docs/hooks-intro.html) released in [React v16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0). We’ll take a project built using the previous `React v16.7` release and leverage hooks to improve our code in terms of clarity, reusability and verbosity.

In our converted codebase we’ll make use of the following hooks:
- [useState](https://reactjs.org/docs/hooks-reference.html#usestate)
- [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)
- [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)
- [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)
- [custom hooks](https://reactjs.org/docs/hooks-custom.html)

Although this isn’t the full range of hooks released in `v16.8`, hopefully you can take enough away from today to use in your existing and future projects built with React - and the rest you can explore for yourself!

From a UI perspective we’ll see no change in how our app looks "before hooks" and "after hooks". However our codebase and developer experience will certainly improve as a result. Perhaps not noticably on a project this size but at scale, with bigger products, larger development teams and quicker release cycles - the cleaner, clearer, and more reusable nature of hooks can have a real benefits day-to-day.

## Outline
Did you know there are now 13 FED@IBM Branches?! And they’re spread right across the globe - from California to India! I thought it would be cool to visualize that geographically in the application for this workshop.

INTRODUCING… the **FED@IBM Weather Center** 🌦

A simple app built using the Carbon Design System, for showing the weather info at each of our branches.

**Features include**:
- Displays the current weather info for each branch
- Displays today’s forecast for each branch
- Allows users to toggle temperature scale based on their preference (C°/F°)

[Open application](http://fed-at-ibm-weather-center.mybluemix.net/) 💻

### Code: As-is vs To-be
The as-is application built using `React v16.7` makes use of several popular React features (below). Although popular (and still very much relevant) within React, these concepts can at times be confusing to understand and verbose in terms of the amount of code needed to implement. Hooks will allow us to refactor these concepts to be clearer to read and easier understand.

| Feature                                                                 | Before hooks                          | After hooks  |
| ----------------------------------------------------------------------- |---------------------------------------| ------------|
| [State management](https://reactjs.org/docs/state-and-lifecycle)        | `this.state`, `this.setState()`         | [useState](https://reactjs.org/docs/hooks-reference.html#usestate)     |
| [Lifecycle methods](https://reactjs.org/docs/glossary#lifecycle-methods)| componentDidMount, componentDidUpdate   | [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)   |
| [Context API consumption](https://reactjs.org/docs/context)             | `Component.contextType`, `this.context` | [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) |
| [Render prop components](https://reactjs.org/docs/render-props)         | See below                               | [Custom hook](https://reactjs.org/docs/hooks-custom.html)                     |
   ```
   // Render prop component
   <GetUser>
   {
    ({ user, loading }) => loading ? 'Loading user...' : `Hello ${user.name}!`
   }
   </GetUser>
   ```

**Let's get started!**
