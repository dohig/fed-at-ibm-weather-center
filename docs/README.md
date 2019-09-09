### Welcome to this FED@IBM workshop!

Today we’re going to work with the [hooks API](https://reactjs.org/docs/hooks-intro.html) released in [`React v16.8`](https://reactjs.org/blog/2019/02/06/react-v16.8.0). We’ll take a project built using the previous `React v16.7` release and leverage hooks to improve our code in terms of clarity, reusability and verbosity.

In our refactored codebase we’ll make use of the following hooks:

- [useState](https://reactjs.org/docs/hooks-reference.html#usestate)
- [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)
- [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)
- [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)
- [custom hooks](https://reactjs.org/docs/hooks-custom.html)

Although this isn’t the full range of hooks released in `v16.8`, hopefully you can take enough away from today to use in your existing and future projects built with React - and the rest you can explore for yourself!

From a UI perspective we’ll see no change in how our app looks "before hooks" and "after hooks". However our codebase and developer experience will certainly improve as a result. Perhaps not noticably on a project this size but at scale, with bigger products, larger development teams and quicker release cycles (as we experience at IBM) - the cleaner, clearer, and more reusable nature of hooks can have a real benefits day-to-day.

---

## Outline

Did you know there are now 21 local FED Branches at IBM?! And they’re spread right across the globe - that's an amazing achievement! I thought it would be cool to visualize that geographically in the application for this workshop.

SO, INTRODUCING… the **FED@IBM Weather Center** 🌦

A simple app built using the Carbon Design System, for showing the weather info at each of our branches.

**Features include**:

- Displays the current weather info for each branch
- Displays today’s forecast for each branch
- Allows users to toggle temperature scale based on their preference (C°/F°)

[Open application](http://fed-at-ibm-weather-center.mybluemix.net/) 💻

### Code: As-is vs To-be

The as-is application built using `React v16.7` makes use of several popular React features (below). Although popular (and still very much relevant) within React, these concepts can at times be confusing to understand and verbose in terms of the amount of code needed to implement. Hooks will allow us to refactor these concepts to be clearer to read and easier understand.

| Feature                                                                  | `v16.7`: As-is                          | `v16.8`: To-be                                                         |
| ------------------------------------------------------------------------ | --------------------------------------- | ---------------------------------------------------------------------- |
| [State management](https://reactjs.org/docs/state-and-lifecycle)         | `this.state`, `this.setState()`         | [useState](https://reactjs.org/docs/hooks-reference.html#usestate)     |
| [Lifecycle methods](https://reactjs.org/docs/glossary#lifecycle-methods) | componentDidMount, componentDidUpdate   | [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)   |
| [Context API consumption](https://reactjs.org/docs/context)              | `Component.contextType`, `this.context` | [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) |
| [Render prop components](https://reactjs.org/docs/render-props)          | See below                               | [Custom hook](https://reactjs.org/docs/hooks-custom.html)              |

```
// Render prop component
<GetUser>
{
 ({ user, loading }) => loading ? 'Loading user...' : `Hello ${user.name}!`
}
</GetUser>
```

---

## Fork and clone

This GitHub repository contains the code that we will be refactoring in today's workshop. At the root directory, you'll see 2 folders: `before-hooks` and `after-hooks`.

We will be working out of `before-hooks`, `after-hooks` is what our finished code should _roughly_ look like.
Feel free to use it as reference though!

### Fork

To begin, fork this repo to your GitHub account.

### Clone

Go to your forked repository, copy the SSH or HTTPS URL and in your terminal run the two commands to get the repository in your local file system and enter that directory.

```bash
$ git clone [your fork SSH/HTTPS]
$ cd fed-at-ibm-weather-center
```

### Add upstream remote

Add a remote called `upstream` so we can eventually submit a pull request once you have completed this tutorial step.

```bash
$ git remote add upstream git@github.com:ShayMurnin/fed-at-ibm-weather-center.git
```

Or, if you prefer to use HTTPS instead of SSH with your remotes:

```bash
$ git remote add https://github.com/ShayMurnin/fed-at-ibm-weather-center.git
```

Verify that your forked repository remotes are correct:

```bash
$ git remote -v
```

Your terminal should output something like this:

```bash
origin	[your forked repo] (fetch)
origin	[your forked repo] (push)
upstream	git@github.com:ShayMurnin/fed-at-ibm-weather-center.git (fetch)
upstream	git@github.com:ShayMurnin/fed-at-ibm-weather-center.git (push)
```

---

## Build and start

We've got the repository forked to your GitHub account, cloned down to your machine. Let's get the app up and running! Navigate into the `before-hooks` folder with:

```bash
$ cd before-hooks
```

Then install the React app's dependencies with:

```bash
$ yarn
```

After the dependencies are installed, you can start the app with:

```bash
$ yarn start
```

The app should (eventually) open up in your default browser window.

Now is a good time to take a look and familiarize yourself with the codebase. Take a look at the [React docs](https://reactjs.org/docs/getting-started) if there's anything that you're not familiar with or need a refresher. And feel free to ask questions.

**Let's get started!**

---

## Upgrade to React v16.8.0

You'll notice in the UI shell of our app, it tells us the version of React that the app is using. At this stage you should still be seeing it rendered as `React v16.7.0`!

To enter into the world of hooks however, we must first update to `v16.8.0`. Just update the version numbers of the `react` and `react-dom` in the `dependencies` object of `package.json`:

```json
...
"react": "16.8.0",
"react-dom": "16.8.0",
...
```

Then run:

```bash
$ yarn && yarn start
```

In the UI shell, you should now see `React v16.8.0`... and you're good to start using hooks!

---

## Refactor our Context.Provider

I think a good place to start for our refactor is our Context.Provider class in `context/TemperatureScaleContext.js`.

> This is a nice low hanging fruit, as we can change the implementation here - while not affecting the consuming components, as React allows us to mix and match implementations. Components are only concerned about themselves in terms of state, props, context etc. How they're being created up/down the tree has no effect on their consumption within other components. One of the benefits of React's backwards compatibility! This is definitely something to consider if you work on a React project that perhaps has a lot of "legacy" Class components that would benefit from refactoring to make use of hooks. Backwards compatibility allows your team to gradually make that switch.

We don't actually need to change are instantiation of our Context object. This is still how context is created.

```javascript
const TemperatureScaleContext = createContext();
```

We can however start by converting `TemperatureScaleProvider` from a Class component to a Function component.

```javascript
const TemperatureScaleProvider = ({ children }) => {
  ...
};
```

Next we can replace the `state` object that is used for instantiating state in Class components. Using the `useState` hook we can create our local Functional component state with the original default state of `'C'`, at the same time receiving it's mutation function that components consuming this state (as context) will call when updating the state anywhere within the app:

```javascript
const [scale, setScale] = useState("C");
```

> Don't forgot to import your hooks from `react`. Or use directly, e.g. `React.useState()`.

The contents of the render method can be moved up into the main Functional component and references made to `this` can be removed as so:

```javascript
...
const value = {
  scale: scale,
  updateScale: setScale,
};

return (
  <TemperatureScaleContext.Provider value={value}>
    {children}
  </TemperatureScaleContext.Provider>
);
```

The app should be back to running normally and the toggle functionality should be working as it was previously.

### Bonus points: useReducer

For our current use case, `useState` is a good fit for managing our temperature scales as we are only toggling between two (°C and °F). But how about in future when we might like to introduce a dropdown with more temperature scale such as Kelvin (K). For this scenario, we could use the [`useReducer`](<(https://reactjs.org/docs/hooks-reference.html#usereducer)>) hook.

> We're over-engineering here but I think it's nice to include for those who maybe haven't used the reducer pattern. Certainly took a while for me to grasp!

Those of you that have used Redux, will be familiar the reducer pattern of updating state. `useReducer` works pretty similar to `useState` except it passes back a dispatch function (instead of a setter). A dispatch function takes an `action` object as a parameter. An action generally has a `type`. `action.type` is used as the expression comparison in a `switch` statement. If the `case` is matched, state will be updated to the value that is returned from that `case`;

The syntax is as follows: `const [state, dispatch] = useReducer(reducer, initialState);`

To use in our `Context.Provider`, let's first create our reducer function. It takes two arguments: `state` - the current state, and `action` - the action that will dictate how to update state. Outside of our function component declare the reducer function with a switch statement:

```javascript
function reducer(state, action) {
  switch (action.type) {
    case "C":
      return action.type;
    case "F":
      return action.type;
    /*
      TODO: We could improve the app by adding a dropdown instead of a
      toggle button so that multiple temperature scales could be selected
    case 'K':
      return action.type;
    */
    default:
      throw new Error();
  }
}
```

Then simply replace your `useState` line with:

```javascript
const [scale, dispatch] = useReducer(reducer, "C");
```

And update `value`:

```javascript
const value = {
  scale: scale,
  dispatch,
};
```

Finally, we will update where `setScale` was being used in `/src/components/Nav.js` (line 26) to make use of the dispatch function. We simply pass it object with `type` as so:

```javascript
this.context.dispatch({ type: this.context.scale === "C" ? "F" : "C" });
```

---

## Consuming context with useContext

While we have our `Nav` component open, let's update the way we're actually consuming the context in this component.

First it needs to be converted from a class component to a function component:

```javascript
const Nav = () => {
  ...
};
```

Now instead of using using `this.context.scale` and `this.context.dispatch`, as well as defining our `Nav.contextType` - we can simply do:

```javascript
const { scale, dispatch } = useContext(TemperatureScaleContext);
```

We can now just refer to these variables anywhere in our component! No binding of functions, no `this.context`. So much cleaner.

See if you can refactor it from here. Take a look at the `after-hooks` project if you need help!

---

## Change up WeatherCard component

If you take a look at the `WeatherCard` class component - we're using state and context. Let's put in practice what we've learnt about `useState` and `useContext` to change the class component to a functional component.

Again, let's define the function:

```javascript
const WeatherCard = ({ location }) => {
  ...
};
```

Move over the state object to `useState`:

```javascript
const [refetch, setRefetch] = useState(false);
```

Consume our context as we have done previously:

```javascript
const { scale } = useContext(TemperatureScaleContext);
```

> Notice we're not deconstructing `dispatch` from the context value as we aren't using it in this component! And remember to remove `WeatherCard.contextType = TemperatureScaleContext;`.

Next, just move what's in the `render` function of the class component and also replace any references to `this.state/props/context` over to use their new values.

> We're still using a render prop component. We'll update this to a custom hook in the next section. But again, we're seeing the backwards compatibility of hooks. All the previous functional component patterns are 100% fine to use with hooks, see don't feel the need to update everything at once in you apps.

---

## Let's build our own custom hook

### Prepare our WeatherCard component

In the `renderCard` function of `WeatherCard`, we make use of render props passed down from `WeatherApi`. The syntax for this can be confusing and verbose. These render prop functions can get very messy. We're making use of reusable stateful logic, but we can only access it in JSX. By refactoring this into a custom hook called `useWeatherApi`, we can access the logic anywhere in the function. We will just define it at the top of the function as we have been doing with our other hooks:

```javascript
const { data, loading, error } = useWeatherApi(location, refetch);
```

Now remove the code below our `WeatherApi` render prop component and function - but keep what's inside the function:

```javascript
<WeatherApi location={location} refetch={refetch}>
  {({ data, loading, error }) => (
    // keep JSX inside the function for next step
  )}
</WeatherApi>
```

And just wrap what was inside the function in curly braces:

```javascript
{
  // JSX that was inside the function
}
```

> This block of code was consuming `data`, `loading` and `error` from the render prop function - but we have now deconstructed these from our custom hook in the first step. Of course the hook hasn't been made so the app won't run yet. But we'll get there!

### Create our hooks folder

It's general practice (at least on my team) to keep the reusable custom hooks for our product in `src/hooks`.

So go ahead and create that folder, along with a `useWeatherApi.js` file inside of it.

Scaffold `useWeatherApi.js` with:

```javascript
import { useState, useEffect } from "react";

export default ({ coords }, refetch) => {
  ...
  return { data, loading, error };
};
```

> NOTE: We don't need to import React from 'react', only { ...hooks } as we are just passing back values - no JSX. Neat!

### Replicate WeatherApi logic

Now all we basically have to do is replicate the logic in `src/components/WeatherApi`. Let's start with the state. We're well used to doing this by now:

```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
```

We actually get the app back up and running, all be it in a loading state. If we briefly go back to `WeatherCard` and replace the import for (the now unused) `WeatherApi` render prop component to:

```javascript
import useWeatherApi from "../../hooks/useWeatherApi";
```

> NOTE: We're seeing it in loading state because we're returning `loading` from `useWeatherApi` - which is initialized as `true`. For fun, if you initialize `error` as `true` you'll see the error states for our `WeatherCard` component. Remember to switch it back for the next steps though!

### Now for useEffect

So the last thing to do is replicate these functions:

```javascript
componentDidMount() {
  this.fetchWeatherData();
}

componentDidUpdate(prevProps) {
  if (
    prevProps.location.coords !== this.props.location.coords ||
    prevProps.refetch !== this.props.refetch
  ) {
    this.fetchWeatherData();
  }
}
```

The `useEffect` hook combines these two class component lifecycle methods.

Reminder `useEffect` takes two params, it looks like this:

```javascript
useEffect(callback, dependancy_array);
```

> Dependency array: An array of variables. Anytime the component is updated (ie. state, props, context changes), `useEffect` will check each one of these variables. If any have changed then the `callback` function passed to `useEffect` will fire. If none have changed, then `callback` won't be fired. The dependency array may be 1) omitted, 2) be empty, or 3) have one or multiple variables. Each of these have different consequences:
>
> 1. If we omit the array, the `callback` function will be fired on anytime the component updates. Essentially `componentDidUpdate` with no comparison of `prevProps` or `prevState`.
> 2. If we pass an empty array (i.e. `[]`), the `callback` function will only be fired upon mounting of the component. Essentially `componentDidMount`.
> 3. If we pass an array with one or more variables**\*** - the `callback` function will be fired upon mounting of the component - but also fired anytime one of the variables in the array changes. Essentially `componentDidMount` plus `componentDidUpdate` _with_ comparison of `prevProps` and `prevState`. Perfect for our use case!
>
> \*Make sure all variables are from the component scope (e.g. props, state, context)

So it looks like option 3 suits are needs. Start by scaffolding your useEffect:

```javascript
useEffect(() => {
  ...
}, [ // Fire callback when what variables change? ]);
```

Fill the dependency array with the variables from `componentDidUpdate` in the old `WeatherAPI` component:

```
[coords, refetch]
```

Now copy the `fetchWeatherData` into the `useEffect` callback and replace the references to `this.state/props` to their function component variables. Then simply call it as we did in `componentDidMount` and `componentDidUpdate`:

```javascript
useEffect(() => {
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_PROXY}https://api.darksky.net/forecast/${process.env.REACT_APP_API_KEY}/${coords}`
      );
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };
  fetchWeatherData();
}, [coords, refetch]);
```

And that's it! Everything should be up and running for you. If you're having issues - just refer to the `after-hooks` project for guidance.

---

## Challenge: Extend the app

If you guys have time now, don't be afraid to play around with the app. Try to add features or extend it's current feature set. It certainly can be easily improved!

Some ideas:

- Add dropdown to select other other temperature scales
- Add location detection using `navigator.geolocation` so we initialize as °F when location is in a country that uses that scale (I think only the US)
- Add localStorage feature so if api has been fetched in the last ~5 mins, then it fetches from localStorage instead (really easy!)

---

## Wrapping up

I hope this was a nice intro to hooks for those of you that have not used the API yet. And hopefully those with hooks experience can take away something from it too. We really only touched the surface, I didn't want to go too in depth as it can get complex under the hood!

If you guys have any ideas for a future FED@IBM Dublin workshop, just let myself, Deri, Jimmy or Simon know!

GRMA,

Shay ✌️

---

> Email: shay.murnin@ibm.com
>
> Slack: @shay
