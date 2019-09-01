Welcome to this FED@IBM workshop!

Today we’re going to work with the hooks API released in React v16.8. We’ll take a project built using the previous React v16.7 release and leverage hooks to improve our code in terms of cleanliness, reusability and verbosity.

While from a visual sense we’ll see no change in our app, however our developer experience (DX) will certainly improve as a result. Perhaps not noticably on a project this size but at scale, with bigger products, larger development teams and quicker release schedules - these kind of features can have a massive bearing on day to day DX.

In our converted codebase we’ll make use of the following hooks:
- useState
- useEffect
- useContext
- useReducer

Although this isn’t the full range of hooks released in v16.8, hopefully you can take enough away from today to use in your existing and future projects built with React - and the rest you can explore for yourself!


Outline
----
Did you know there are now 13 FED@IBM Branches?! And they’re spread right across the globe - from California to India! I thought it would be cool to visualize that geographic disparity in application for this workshop.

INTRODUCING… FED@IBM Weather Center

A simple app for showing the weather info for each of our branches

**Features**:
- Displays the current weather info for each branch
- Displays today’s forecast for each branch
- Allows users to toggle temperature scale based on their preference (C°/F°)
