## Wut, Abstract Data Type Huh?
Programing jargon often makes learning new ideas more daunting than necessary. I remember reading text books full of jargon defined by jargon, leading to many core computer-science concepts alluding my comprehension. Likewise, I remember reading wiki articles and opening each term I was unfamiliar with into a new tab. The tabs would stack deeper and deeper and I would be at a loss as to where to start. This article is an attempt to explain the meaning of Abstract Data Type (ADT) in a no-undefined-jargon no-nonsense way.

### First-Off, What is a Data Type? 
In programming a *data type* is data that is constrained by a content type. For example the type *Boolean* has the constraint that it can only store the value True or False. A *String* has the constraint that it can only store text. A Data Type is simply data of a single content type. 

### So, wut Abstract Data Type is?
An abstract data type is a model of data and behavior. The difference between a Data Type and an Abstract Data Type is that an ADT has the addition of **BEHAVIOR**.

### Careful Careful
One gotcha is that and ADT is just a prescription not an implementation. In programming jargon we call the prescription an *interface* and the code that creates that *interface* an *implementation*. To demonstrate the difference let's create our own rules for an *interface* and then *implement* it two different ways. 

## Let's make up an ADT! (ValueStore)
In order not to overly complicate things lets make a ADT with the sole purpose of storing a single value. This ADT wont have  much usefulness in a piece of software, but it should help demonstrate the concept of *interface* vs *implementation*.  

Lets define the *interface* for an ADT named **ValueStore**
(aka. define a prescription for making a ValueStore)

### ValueStore Interface Definition
* It should store a single value. (Data)
	* By default its value should be null.
	* The user should be able to set the value on creation.
* It should have a method to set the value. (Behavior)
* It should have a method to retrieve the value. (Behavior)

**THATS IT!** That's the data and behavior definition of our ValueStore ADT! 

### Quick Food For Thought
Do a quick thought experiment... How many ways do you think you could write code to Implement that ValueStore Interface Definition?   

1,2,3, 1000, Infinity?  How Many Huh?

## aight, LETS HACK IT OUT!
Now that we have a ValueStore interface definition. Lets create two implementations. An Implementation is the way we choose to code out a solution to the interface definition.  Let's make a ValueStore using a JS constructor, and then make a ValueStore using closure.

####  ValueStore Constructor Implementation 
The goal here is to code up a ValueStore using a Javascript constructor implementation.
``` js
// a function constructor with a value paramiter that will default to null
function ValueStore(value=null){
  this.value = value 
}

// A prototype method that will implement the `get` interface
ValueStore.prototype.get = function(){
  return this.value
}

// A prototype method that will implement the `set` interface
ValueStore.prototype.set = function(value){
  this.value = value
}
```
#### ValueStore Constructor Tests
Now that we implemented a value store, let's test that it behaves like the interface we initially described.

1) Does it store a value that defaults to null? 
```
let emptyValue = new ValueStore()
// emptyValue === {value: null}

console.log('emptyValue:', emptyValue.get())
// emptyValue: null
```

2) Can you set the initial value on creation? 
```
let tempValue = new ValueStore('beans')
// tempValue === {value: "beans"}

console.log('tempValue:', tempValue.get())
// tempValue: "beans"
```

3) Does it have an interface for `get` and `set` behaviors? 
 ```
tempValue.set('corn')
console.log('tempValue:', tempValue.get())
// tempValue: "corn"
```
4) BOOYAH!

#### ValueStore Closure Implementation 
The goal here is to code up a ValueStore using a closure implementation.

``` js
// a function for creating a ValueStore ADT using closure
const valueStore = (value) => {
	// the state stores a value that will default to null 
  let state = value || null
  
  return {
    get: () => state, // get interface implementation
    set: (value) => { // set interface implementation
      state = value
    }
  }
}
```
#### ValueStore Closure Tests
Now that we implemented a value store with closure, let's test that it behaves like the interface we initially described.
1) Does it store a value that defaults to null? 
```
let emptyValue = valueStore()
// {set: () => ..., get: () => ...}

console.log('emptyValue:', emptyValue.get())
// emptyValue: null
```
2) Can you set the initial value on creation? 
```
let tempValue = valueStore('beans')
// {set: () => ..., get: () => ...}

console.log('tempValue:', tempValue.get())
// tempValue: "beans"
```
3) Does it have an interface for `get` and `set` behaviors? 
```
tempValue.set('corn')
console.log('tempValue:', tempValue.get())
// tempValue: "corn"
```
4) BOOOM!

## SO WHATS A ABSTRACT DATA TYPE HUH?
An Abstract Data Type is a prescription for an *interface* that defines a Data Type with data and behaviour. A programmer can implement the *interface* of any ADT using any *implementation* they want. 

The above two implementation of a ValueStore both have the exact same potential. Don't be confused that their syntactic interfaces are slightly different, the important thing is that 
they both implement the correct data and behaviors we defined for our ValueStore Abstract Data Type.

