## 1. What is the difference between var, let, and const?

1. **var** is the old way to declare variables in JavaScript. It can be redeclared and updated.
2. **let** is a modern variable. It can be updated but cannot be redeclared in the same block.
3. **const** is used for variables that should not change. It cannot be updated or redeclared.

---

## 2. What is the spread operator (...)?

1. The spread operator `...` is used to copy or expand arrays and objects.
2. It helps combine or clone data easily.

Example:

```
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];
```

---

## 3. What is the difference between map(), filter(), and forEach()?

1. **map()** creates a new array by applying a function to every element.
2. **filter()** creates a new array with elements that match a condition.
3. **forEach()** runs a function for each element but does not return a new array.

---

## 4. What is an arrow function?

1. An arrow function is a short way to write functions in JavaScript.
2. It uses the `=>` symbol.

Example:

```
const add = (a, b) => a + b;
```

---

## 5. What are template literals?

1. Template literals are used to create strings easily.
2. They use backticks `` ` ` `` instead of quotes.
3. Variables can be added inside a string using `${}`.

Example:

```
const name = "Rahim";
const message = `Hello ${name}`;
```
