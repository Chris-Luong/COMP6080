# COMP6080

## Ass 1

---

- Static HTML/CSS for 4 tasks?

## Ass 2

---

- Vanilla Javascript to recreate Slack
- Used Bootstrap components from CDN using a style and a script tag

## Ass 3

---

- React to recreate AirBnb
- Used Material UI components from npm package

## Tutorials

All tutorial exercises from the term including HTML, CSS, JS, Node, React, a11y, UI and component testing and more.

---

### **_AJAX js-async-promise-to-await_**

- Changes promise.then into asyc/await function

```Javascript
fetch()
    .then(data => data.json())
    .then(data => do something with data)
    .catch(err => error handling)

```

becomes

```Javascript
try {
    const res = await fetch();
    const data = await res.json();
    do something with data
} catch (error) {
    error handling
}
```

- Added a 500ms delay to the fetches after user input with setTimeout, clearTimeout within a useEffect function that contains the fetch

### **_AJAX async-promises-all_**

- Promise.all:

```Javascript
function {
    Promise.all(fetchCompanyRepos)
    .then(companies => forEach(company) => do something);
}
```

- Using async/await instead of .then() for above with some more details from code:

```Javascript
function {
    const companies = await Promise.all([fetchRepos("microsoft"), fetchRepos("google"), fetchRepos("apple")]);
    companies.forEach(company) => {company.forEach(repo) => console.log(repo)}
}
```

- Resolve/reject:
  - Promise.all will reject if any fetch fails
  - Use promise.allSettled to return an array of fulfilled/rejected items so you can use some of the from the promise

```Javascript
function {
    const companies = await Promise.all(microsoftRepos, fakeRepos);
    companies.forEach(company) => {company.forEach(repo) => console.log(repo)}
}
// Will throw error response as promise rejects
```

- Promise.allSettled:
  - Same as using promise.all, but to use fetch results, you will need to see if data.status === 'fulfilled'
  - Else you can log the error message with data.reason

```Javascript
function {
    const companies = await Promise.allSettled(microsoftRepos, fakeRepos);
    companies.forEach(company) => {
        if (company.status === "fulfilled") {
            company.value.forEach(repo => console.log(repo));
        } else {
            console.log(company.reason);
        }
    }
}
// Will print microsoft repos and show error for fakeRepos
```

### **_ASYNC js-ajax-recusive-fetch_**

- Solution shows how to use Promise.all with map() instead of calling fetch in a for loop
- Recursive fetch is shown in ASYNC async-nested-promises
