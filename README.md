# COMP6080

## Exercises

- All tutorial exercises from the term including HTML, CSS, JS, Node, React, a11y, UI and component testing and more.

## Ass 1

- Static HTML/CSS for 4 tasks?

## Ass 2

- Vanilla Javascript to recreate Slack
- Used Bootstrap components from CDN using a style and a script tag

## Ass 3

- React to recreate AirBnb
- Used Material UI components from npm package

## Tutorials

### AJAX js-async-promise-to-await

- Changes promise.then into asyc/await function
- Added a 500ms delay to the fetches after user input with setTimeout

### AJAX async-promises-all

- Promise.all:
  - fucntion: Promise.all(fetches.then(data => do something))
- Using async/await instead of .then() for above:
  - async function: const = await Promise.all(fetches);
  - const.forEach(do something)
- Resolve/reject:
  - Promise.all will reject if any fetch fails
  - Use promise.allSettled to return an array of fulfilled/rejected items so you can use some of the from the promise
- Promise.allSettled:
  - Same as using promise.all, but to use fetch results, you will need to see if data.status === 'fulfilled'
  - Else you can log the error message with data.reason

### ASYNC js-ajax-recusive-fetch

- Check if this solution is similar to Sooria's lab for recursive fetch. This tutorial might just be iterative
