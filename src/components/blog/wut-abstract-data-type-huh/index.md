## Wut, Abstract Data Type Huh?

Programing jargon often makes learning new ideas more daunting than necessary. I remember reading text books full of jargon defined by jargon, and leading to many core computer concepts alluding my comprehension. Likewise, I remember reading wiki articles and opening each term I was unfamiliar with into a new tab. The tabs would stack deeper and deeper and I would be at a loss auto where to start. This article is an attempt to explain the meaning of Abstract Data Type (ADT) in a no-jargon no-nonsense way.

### First-Off, What is a Data Type? 
In programming a *data type* is data that is constrained by content. For example the type *boolean* has the constraint that it can only store the value True or False. A *string* has the constraint that it can only store text. A *data type* is simply a type of data.

### So, wut Abstract Data Type is?
An abstract data type is a model of data and behavior. The difference between a Data Type and an Abstract Data Type is that an ADT has **BEHAVIOR**, where a Data Type just has data.

### Careful Careful
One gotcha, is that and ADT is just a prescription not an implementation. In programming jargon we call the prescription an *interface* and the code that creates that *interface* an *implementation*. To demonstrate the difference let's create our own rules for an *interface* and then *implement* it two different ways. 

## Let's make up an ADT! (ValueStore)
In order not to overly complicate things lets make a ADT with the sole purpose of storing a single value. This ADT wont have to much usefulness in a piece of software, but it should help demonstrate the concept of *interface* vs *implementation*.  

Lets define the *interface* for an ADT named **ValueStore**
(aka. define a prescription for making a ValueStore)

### ValueStore Interface Definition
* It should store a single value. (Data)
	* By default its value should be null.
* It should have a method to set the value. (Behavior)
* It should have a method to retrieve the value. (Behavior)

**THATS IT!** That's the data and behavior definition of our ValueStore ADT! 

### Quick Thought Experiment
Do a quick thought experiment... How many ways do you think you could write code to Implement that ValueStore Interface Definition? 

## aight, LETS HACK IT OUT!
Now that we have a ValueStore interface definition. Lets create two implamentations. An Implementation is the way we choose to code out a solution to the interface definition. Lets 

#### ValueStore Constructor Implementation 
The goal here is to code up a ValueStore using a Javascript constructor.
``` js
// a function constructor with a value paramiter that will default to null
function ValueStore(value=null){
  this.value = value 
}

// A prototype method that will implamnet the `get` interface
ValueStore.prototype.get = function(){
  return this.value
}

// A prototype method that will implament the `set` interface
ValueStore.prototype.set = function(value){
  this.value = value
}
```
#### ValueStore Constructor Tests
Now that we implamented a value store, let's test that it behaves like the interface we initialy described.
```
let emptyValue = new ValueStore()
// emptyValue === {value: null}

console.log('emptyValue:', emptyValue.get())
// emptyValue: null

let tempValue = new ValueStore('beans')
// tempValue === {value: "beans"}

console.log('tempValue:', tempValue.get())
// tempValue: "beans"

tempValue.set('corn')
console.log('tempValue:', tempValue.get())
// tempValue: "corn"
```

#### ValueStore Closure Implementation 
The goal here is to code up a ValueStore using a Javascript closures.
``` js
const valueStore = (options={}) => {
  let state = options.value || null
  return {
    get: () => state,
    set: (value) => {
      state = value
    }
  }
}
```
#### ValueStore Closure Tests
Now that we implamented a value store, let's test that it behaves like the interface we initialy described.
```
let emptyValue = valueStore()
// emptyValue === {value: null}

console.log('emptyValue:', emptyValue.get())
// emptyValue: null

let tempValue = valueStore({value: 'beans'})
// tempValue === {value: "beans"}

console.log('tempValue:', tempValue.get())
// tempValue: "beans"

tempValue.set('corn')
console.log('tempValue:', tempValue.get())
// tempValue: "corn"
```

### SO WHATS A ABSTRACT DATA TYPE HUH?
An Abstract Data Type is a prescription for an *interface* that defines a Type. A programmer can implement the *interface* of any ADT using any *implementation* they wan't. 

The above two implementation of a ValueStore both have the exact same potential. Don't be confused that their syntactic interfaces are slightly different, the important thing is that 
they both implement the correct behaviors we defined for our ValueStore Abstract Data Type.

