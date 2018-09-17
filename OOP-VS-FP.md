# Programming Paradigms

There is a list of potential programming paradigms approaches when coding. It can make
developers very confused. For example:
- Imperative programming
- Declarative programming
- Procedural programming, structured programming
- Functional programming
- Object-oriented programming (OOP)
- Event-driven programming
- Automata-based programming

Learn More: [Comparison of programming paradigms](https://en.wikipedia.org/wiki/Comparison_of_programming_paradigms)

Let's see the 3 main ones related to Javascript that we use in Series5: Procedural programming, OOP and Functional Programming.

## Procedural Programming

Procedural Programming is a form of Structured Programming, itself a form of Imperative Programming.

"Imperative programming is like giving instructions to an idiot." - [Source](http://community.schemewiki.org/?scheme-fortune-cookies)

It is a very linear step by step way of coding: Do this, do that, do this, do that... It specifies a series of instructions that the computer executes in sequence.

The focus is on what steps the computer should take rather than what the computer will do.

So Procedural Programming focuses on the details (i.e. the implementation) of **how** something is done.

```javascript
function calculateAverage(arr) {
  var sum = 0;
  var i=0;
  for(i=0; i<arr.length; i++){
    sum += arr[i];
  }
  return sum / arr.length;
}

var result = calculateAverage([80, 90, 100]); //result contains 90
```

"Imperative programming is a programming paradigm that uses statements that change a program's state." - [Source](https://en.wikipedia.org/wiki/Imperative_programming)

## Functional Programming

Functional programming is a subset of declarative programming:

"Functional Programming is like describing your problem to a mathematician." - [Source](http://community.schemewiki.org/?scheme-fortune-cookies)

A mathematician divides a problem into pieces and provides answers (functions) for each piece.
The final result is the combination (composition) of all those answers.

Functional programming focuses on **what** should be done. And then delegates the "how" to each related function definition.

```javascript
var sum     = function (total, current) { return total + current; }
var total   = function (arr) { return arr.reduce(sum); }
var size    = function (arr) { return arr.length; }
var divide  = function (a, b) { return a / b; }
var average = function (arr) { return divide(total(arr), size(arr)); }
var result  = average([80, 90, 100]); //result contains 90
```

Since we now know that Functional Programming is like solving a math problem, please remember that for a **same input**, the **output** should **always** be **the same**: "When x=2, result=4. ALWAYS!".

"It is a declarative programming paradigm, which means programming is done with expressions or declarations instead of statements." - [Source](https://en.wikipedia.org/wiki/Functional_programming)

A good functional programming involves 3 things:
- Computation as the application of functions
- Statelessness
- Avoiding side effects

### Computation as the application of functions

Functional programming is unique in that functions are values (the technical term for this is that functions are **“first class”**).

You can store functions in variables, return them as value of other functions and pass them in as arguments to other functions. As a result, functional programs produce answers by applying these functions in different ways.

```javascript
//-----Functions as values-----//
var greet   = function(name){ return "hi: "+ name; };
var exclaim = function(statement){ return statement.toUpperCase() + "!"; };
var welcome = function(name){ return greet(exclaim(name)); };
var result  = welcome("John"); // result contains "hi: JOHN!"
```

### Statelessness

Functional programming requires us to write stateless expressions and keep our data immutable.

A state is a snapshot of a program’s current environment: all the variables that have been declared, functions created and what is currently being executed.

#### Bad example
The following code is statefull because a same call to the function would return a different result:

```javascript
var number = 1;
var increment = function() {
  number += 1;
  return number;
};
increment(); //returns 2
increment(); //returns 3
```

#### Good example
The following code is stateless because the increment function does not depend on or modify any external state:

```javascript
var number = 1;
var increment = function(n) {
  n += 1;
  return n;
};
increment(number); //returns 2
increment(number); //returns 2
```

Moreover given the same argument used to call the function, it will always return the same result.

E.g. incrementing 2 should always give 3. The quality of guaranteeing a consistent returned value from a function, making its result consistent and predicable is known as "referential transparency".

### Avoiding side effects

Functional programming promotes the use of “pure functions”: functions that have no side effects.

#### Bad example

The following code does a side effect, which is changing the number value. Each time we call the function, number's value get changed:

```javascript
var number = 2;
var sideEffect = function(n) {
  number = n * 3;
  return number * n;
};
sideEffect(3); //the number value will be set to 9 after that call
```

#### Good example
The following code will not change the original number variable value:

```javascript
var number = 2;
var noSideEffect = function(n) {
  var number = n * 3;
  return number * n;
};
noSideEffect(3); //the number value will still be 2 after that call
```

### Pure functional programming in Javascript

If we wanted to program in a pure functional manner in JavaScript we could set the following rules:
- No assignment i.e. changing the value of something already created with `=` (`var` statements
with `=` are fine)
- No `for` or `while` loops (use recursion instead)
- Freeze all objects and arrays (since modifying an existing object or array would be a stateful
expression)
- Disallow `Date `(since it always produces a new value no matter what the inputs are)
- Disallow `Math.random` (same reason as `Date`)

### Useful FP Techniques
- First class and higher-order functions
- Closures
- Recursion
- Tail call optimisation
- Continuation passing style
- Thunks and trampolines
- Partial application (currying)
- Memoisation
Please report to [detailed article](https://stephen-young.me.uk/2013/01/20/functional-programming-with-javascript.html) for more informations about those functionalities.

Learn More:
- [What is functional, declarative and imperative programming](https://stackoverflow.com/questions/602444/functional-declarative-and-imperative-programming)
- [Functional programming with javascript](https://stephen-young.me.uk/2013/01/20/functional-programming-with-javascript.html)
- [Declarative UI](https://courses.csail.mit.edu/6.831/archive/2008/lectures/L11-declarative-ui/L11-declarative-ui.html)

Note: Reactive programming could be described as an asynchronous functional programming.
Note: We could say HTML is a Declarative UI Language.

## Object Orientated Programming

It is a programming paradigm based on the concept of "objects".

```javascript
var Person = function (firstName) {
  this.firstName = firstName;
};

Person.prototype.sayHello = function() {
  console.log("Hello, I'm " + this.firstName);
};

var person1 = new Person("Alice");
var person2 = new Person("Bob");

// call the Person sayHello method.
person1.sayHello(); // logs "Hello, I'm Alice"
person2.sayHello(); // logs "Hello, I'm Bob"
```

The general concepts of OOP are:
- Encapsulation
- Abstraction
- Polymorphism

### Encapsulation

A technique which involves bundling the data and the methods that use the data together.

An object can forbid external access to chosen properties and methods, so that they can only be called by other methods of same object.

There are three most well-known encapsulation levels:
- **private**: Accessible only from the class itself, not accessible from inheritants.
- **protected**: Accessible from the class itself, inheritants are also allowed to access it.
- **public**: Accessible from anywhere.

Encapsulation helps to support the code, because a programmer always knows, which methods could have been used by the external code, and which can be safely modified or even removed.

"**Modularity** is closely tied with encapsulation; think of modularity as a way of mapping encapsulated abstractions into real, physical modules." - [Source](https://atomicobject.com/resources/oo-programming/encapsulation-modularity)

### Abstraction

"Abstraction is the ability to engage with a concept while safely ignoring some of its details-handling different details at different levels." - [Source](https://books.google.co.uk/books?id=LpVCAwAAQBAJ)

The conjunction of an object's complex inheritance, methods and properties must adequately reflect a reality model.

In real code, you define an abstraction through defining an interface or an abstract class.

### Inheritance

A class can inherit characteristics and capabilities from another class.

The child object automatically gains access to parent’s methods/properties, but it also can have its own methods/properties.

### Polymorphism

Poly means "many" and morphism means "forms". Different classes might define the same method or property.

### Example
The Cat and Dog classes below inherit [**inheritance**] from the Animal abstract class
[**abstraction**], including its private and public properties [**encapsulation**], define the "say"
method in a different way [**polymorphism**].

```javascript
//-----OOP-----//
// Animal is an abstract class
var Animal = function() {
  if (this.constructor === Animal) {
    throw new error("Can't instantiate abstract class!");
  }
}

Animal.prototype.say = function() {
  throw new Error("Abstract method!");
}

// Cat inherits from the Animal abstract class
var Cat = function() {
  Animal.apply(this, arguments);
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.say = function() {
  console.log("meow");
}

// Dog inherits from the Animal abstract class
var Dog = function() {
  Animal.apply(this, arguments);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.say = function() {
  console.log("bark");
}

var cat = new Cat();
var dog = new Dog();

cat.say(); // Outputs: meow
dog.say(); //Outputs: bark
```

Learn More:
- [Introduction to Object Orientated JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects)
- [Object Orientated Programming](http://javascript.info/object-oriented-programming)
- [Object Orientated Programming with Javascript](http://viralpatel.net/blogs/object-oriented-programming-with-javascript/)
- [OOP in Javascript: what you need to know](http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/)

### Tell, Don't Ask

"Object-orientation is about bundling data with the functions that operate on that data." - [Source](https://martinfowler.com/bliki/TellDontAsk.html)

So instead of asking for some values and then perform actions on them, you implement the model to perform the actions for you:

#### Bad example
```javascript
var Account = function (name, currentBalance, maximumAmount) {
  this.name = name;
  this.currentBalance = currentBalance;
  this.maximumAmount = maximumAmount;
};

function debit(amount, account) {
  if (account.currentBalance < amount) {
    throw new Error("Not enough funds");
  } else {
    account.currentBalance -= amount;
  }
}
function credit(amount, account) {
	if (account.currentBalance + amount <= account.maximumAmount) {
  } else {
    throw new Error("Maximum amount reached");
  }
}

////////////////////

var account1 = new Account("Personal Account", 100, 2000);
var account2 = new Account("Extra Account", 10000, 12000);
debit(80, account1);
debit(2000, account2);
credit(150, account1);
credit(1980, account2);
```

#### Good example

The account model should be in charge of doing the debit or credit:

```javascript
var Account = function (name, currentBalance, maximumAmount) {
    this.name = name;
    this.currentBalance = currentBalance;
    this.maximumAmount = maximumAmount;
  }
};

Account.prototype.debit = function (amount) {
  if (this.currentBalance < amount) {
    throw new Error("Not enough funds");
  } else {
    account.currentBalance -= amount;
  }
}
Account.prototype.credit = function (amount) {
	if (this.currentBalance + amount <= this.maximumAmount) {
  } else {
    throw new Error("Maximum amount reached");
  }
}

////////////////////

var account1 = new Account("Personal Account", 100, 2000);
var account2 = new Account("Extra Account", 10000, 12000);
account1.debit(80);
account2.debit(2000);
account1.credit(150);
account2.credit(1980);
```

Note: using if/else is considered a [Code Smell](https://refactoring.guru/refactoring/smells). So the functions themselves could be refactored, but that's a different topic.

## When to use each of them?

Those types can be mixed together. They are not enemies but friends.

Use OOP when you think the model should have the power to work on itself. Obviously an OOP works well for a single object/entity.

For example functional programming can help to perform a task related to a list of objects/entities, while OOP can't because is focusing on single object/entity.

In most of the cases we will use functional programming, especially in services.

Here is a summary of the differences:
<table>
  <tr>
    <th></th>
    <th>Functional</th>
    <th>Object-Orientated</th>
  </tr>
  <tr>
    <td>Unit of composition</td>
    <td>Functions</td>
    <td>Objects (classes)</td>
  </tr>
  <tr>
    <td>Programming style</td>
    <td>Declarative</td>
    <td>Imperative</td>
  </tr>
  <tr>
    <td>Data and behavior</td>
    <td>Loosely coupled into pure, standalone functions</td>
    <td>Tightly coupled in classes with methods</td>
  </tr>
  <tr>
    <td>State management</td>
    <td>Treats objects as immutable values</td>
    <td>Favors mutation of objects via instance methods</td>
  </tr>
  <tr>
    <td>Control flow</td>
    <td>Functions and recursion</td>
    <td>Loops and conditionals</td>
  </tr>
  <tr>
    <td>Threat safety</td>
    <td>Enables concurrent programming</td>
    <td>Difficult to achieve</td>
  </tr>
  <tr>
    <td>Encapsulation</td>
    <td>Not needed because everything is immutable</td>
    <td>needed to protect data integrity</td>
  </tr>
</table>

Learn More:
- [Introduction to functional javascript](https://www.sitepoint.com/introduction-functional-javascript/)
- [What is functional, declarative and imperative programming](http://stackoverflow.com/questions/602444/what-is-functional-declarative-and-imperative-programming)
- [What is the difference between procedural programming and functional programming](http://stackoverflow.com/questions/23277/what-is-the-difference-between-procedural-programming-and-functional-programming)
- [Truly understanding the difference between procedural and functional](http://stackoverflow.com/questions/5226055/truly-understanding-the-difference-between-procedural-and-functional)
- [Whats the difference between imperative, procedural and structured programming](http://programmers.stackexchange.com/questions/117092/whats-the-difference-between-imperative-procedural-and-structured-programm)

Examples
Example1: an OOP that should have been a Functional
Programming

```JavaScript
//*****Turn OOP to Functional Programming*****//
//-----Filtering for odd numbers and multiples of 6-----//
var originalArray = [1, 2, 3, 4, 5, 6, 7, 8];

//Bad - object-orientated approach: using a for-loop to mutate a new array
var filteredArray = [];
for(var i=0; i<originalArray.length; i++) {
  var number = originalArray[i];
  if(number%2 || number%6 === 0) {
    filteredArray.push(number);
  }
}
//filteredArray contains [1, 3, 5, 6, 7]

//Better - using the native Array filter method with a typical anonymous function
var filteredArray = originalArray.filter(function(number) {
  return number%2 || number%6 === 0;
});
//filteredArray contains [1, 3, 5, 6, 7]

//Most functional - using predicates with a filter method
var isOdd = function(number) {
  return number%2;
};
var isDivisibleBySix = function(number) {
  return number%6 === 0;
};
var filteredArray = originalArray.filter(function(number) {
  return isOdd(number) || isDivisibleBySix(number);
});
//filteredArray contains [1, 3, 5, 6, 7]
```

Learn More:
- [Refactoring towards functional programming in javascript](http://rebootjeff.github.io/blog/2015/06/14/refactoring-towards-functional-programming-in-javascript/)
- [4 tips when migrating from Object Oriented Programming to Functional Programming](https://www.belatrixsf.com/blog/4-tips-when-migrating-from-object-oriented-programming-to-functional-programming/)

Example2: a Functional Programming that should have
been an OOP

```JavaScript
//*****Turn Functional Programming to OOP*****//
//-----Getting the user name-----//

//Bad - functional approach: each user model should be in charge of getting its name
var user1 = {
  name: "User Number One",
  age: 10
};
var user2 = {
  name: "User Number Two",
  age: 20
};

function getUsername(user){
  return user.name
}

console.log(getUsername(user1));
console.log(getUsername(user2));

//Good - OO approach: each user knows itself and can therefore give its name
var User = (function () {
  function User(name, age) {
    this.name = name;
    this.age = age;
  }
  User.prototype.getUsername = function () {
    return this.name;
  }
  return User;
}());

var user1 = new User("User Number One", 10);
var user2 = new User("User Number Two", 20);

console.log(user1.getUsername());
console.log(user2.getUsername());
```

Learn More:
- [These are not the models you’re looking for](https://youtu.be/LLvRMVQ_JcE?t=9m39s)
- [Github: angular2-models-di](https://github.com/auth0-blog/angular2-models-di)

Quizz

1. Which programming paradigm is this code?
```JavaScript
function doSomething() {
  var initialArray = [1, 3, 6, 9, 12];
  var result = 0;
  for(var i=0; i<initialArray.length; i++) {
    result += initialArray[i];
  }
  return result;
}
```
**Answer:** Procedural.

2. Which programming paradigm is this code?
```JavaScript
var user1 = {
  id: 1,
  name: "Cesare",
  lastName: "Beccaria",
  gender: "male",
  children: 1,
  updateChildren: function(value) {
    this.children = value;
  }
}
```
**Answer:** Object Orientated.

3. Which programming paradigm is this code?
```JavaScript
var allUsers = [user1];
function getAllUsers() {
  return allUsers;
}

function getUserById(id) {
  var allUsers = getAllUsers();
  return allUsers.find(function(user) {
    return user.id === id;
  });
}
```
**Answer:** Functional.

4. What is wrong in this code?
```JavaScript
var user = {id: 1, name: "john"};
var allUsers = getAllUsers();
function addUser(userInfo){
  allUser.push(userInfo);
}
addUser(user);
```
**Answer:** The functional code is impure. It mutates the state of the allUsers array.

5. What is wrong in this code?
```JavaScript
function updateUserInfoById(id, newName, newLastName, newChildren) {
  var firstUser = getUserById(1);
  firstUser.name = newName;
  firstUser.lastName = newLastName;
  firstUser.children = newChildren;
}
```
**Answer:** Does not respect the "Tell, don't ask" principle (OOP). The model should change itself.

6. What is wrong in this code?
```JavaScript
var Adult = (function() {
  function Adult(name, lastName, jobTitle) {
    this.name = name;
    this.lastName = lastName;
    this.jobTitle = jobTitle;
  }
  return Adult;
}());
var Child = (function() {
  function Child(name, lastName, birthYear) {
    this.name = name;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }
}());
```
**Answer:** The code could have used an abstract class "Human" for common properties.

7. I want a function to be able to update a user family name. What type of code shall I go for?

**Answer:** Object Orientated Programming. Add an updateFamilyName method on the User class that
takes in a value and set the user familyName with it.

8. I want to count the total number of character for all my users name. What type of code shall I go
for?

**Answer:** Procedural Programming. 1 loop to get each user's name and then another loop for
counting the letter.

9. I want to get all male users having at least 3 children. What type of code shall I go for?

**Answer:** Functional Programming. Use for example the filter method on the allUsers objects array.

10. What's the object-oriented way to become wealthy?

**Answer:** Inheritance. Dad joke...
