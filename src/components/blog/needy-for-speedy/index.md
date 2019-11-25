# Needy for Speedy, Javascript Edition
> aka. Day 6 with the space heater    

Howdy y'all, it's been a cold weak but at least my toes are warm. This here's a deep dive into the runtime speeds of javascript's different object creation methods.
 
## I improved on a very sloppy gist from yesterday
While experimenting with coding styles while working on some [Abstract Data Structures](github.com/slugbyte/data-structures). ~~lul basically none are implemented at the time of this post~~. I've been reading lots of JS docs on [MDN](https://developer.mozilla.org/en-US/). The docs I was reading had many big red warnings about the negative impacts of fussing around with Object prototypes. I also found there are so many ways to make an Object. I had previously been playing around with formatting, syntax, feel, and readability (arguably all subjective), when these MDN warnings provoked me to switch gears and write some code to test the speed of different Object instantiation techniques.   
  
## a little note 
To test the speed of different Object instantiation techniques, I modeled the following little note, and then implemented it in a bunch of different ways. Some of the implementations varied due to what I've been calling "coding style", but they at least implemented the following data and behavior.     
```   
// NOTE
{
    type: <string>   
    Value: <string> 
}     

// PROTOTYPE VARS
isNote = true
constructor = <function reference> (Only if an actual constructor was used)
  
// PROTOTYPE METHODS
updateValue = (value) -> <note referece>  
describe = () -> <string "type: value">   

// STATIC METHODS  
isNote = (note) -> !!note.isNote
``` 
  
  
## ALL THEM BEANS  
OOP should be pronounced OOP  

###  CLASSIC CONSTRUCTOR     
SO, this is the classic constructor, Nothing to fancy. No deviation from the mocked up model above. But, Below you will find the `testNoteConstructor` function. Notice this function is not a test, because it's not asserting anything about the Note. It's just a function that uses every feature of the note. This function will be used by `timeTest` as the `cb` arg so that we can time how long it takes to instantiate 1048576 `NoteConstructor` notes and execute their methods.   
```   js
function NoteConstructor(type, value){
    this.type = type
    this.value = value
}

NoteConstructor.isNote = function(note){
  return !!note.isNote
}

NoteConstructor.prototype.isNote = true

NoteConstructor.prototype.describe = function(){
  return this.type + ': ' + this.value
}

NoteConstructor.prototype.updateValue = function(value){
  this.value = value
  return this
}

let testNoteConstructor = () => {
  let result = {}
  let note = result.note = new NoteConstructor('todo', 'get eggs')
  result.descriptionBeforeUpdate = note.describe()
  note.updateValue('get ham')
  result.descriptionAfterUpdate = note.describe()
  result.check = NoteConstructor.isNote(note)
  result.constructor = note.constructor
  return result
}
```

### ES6 CLASS    
Also Nothing fancy here, just an ES6 class. Notice here that is has its very one `testNoteClass` that does the same things as `testNoteConstructor`. Each implementation has its very own `testImplementationName` function.    
``` js
class NoteClass {
  constructor(type, value){
    this.type = type
    this.value = value
  }
  
  describe(){
    return this.type + ': ' + this.value
  }
  
  updateValue(value){
    this.value = value
    return this
  }
  
  static isNote(note){
    return !!note.isNote
  }
}

NoteClass.prototype.isNote = true

let testNoteClass = () => {
  let result = {}
  let note = result.note = new NoteClass('todo', 'get eggs')
  result.descriptionBeforeUpdate = note.describe()
  note.updateValue('get ham')
  result.descriptionAfterUpdate = note.describe()
  result.check = NoteClass.isNote(note)
  result.constructor = note.constructor
  return result
}
```
  
### FACTORY FUNCTION    
Nothin but a good ole' factory and a `testNoteFactory` to keep it company.   
``` js
function NoteFactory(type, value){
  return new NoteConstructor(type, value)
}

NoteFactory.isNote = (note) => !!note.isNote

let testNoteFactory = () => {
  let result = {}
  let note = result.note = NoteFactory('todo', 'get eggs')
  result.descriptionBeforeUpdate = note.describe()
  note.updateValue('get ham')
  result.descriptionAfterUpdate = note.describe()
  result.check = NoteFactory.isNote(note)
  result.constructor = note.constructor
  return result
}
```

## FP -> FP 
### FUNCTIONAL (MULTIPLE ARITY)
**Note:** I think functional programming (FP) is better for modeling behavior that works with data, not modeling data itself. Unless, like an abstract data type, the model is a behavior model. These notes are just data with dinky behavior, If I was building a notes app using FP. The data would only be data and not reference any of its behaviors(methods), like some of the following implementations do. 
  
Notice that the following Note implementation is very different because the notes have no methods! The notes are just data. The `updateValue` and `describe` have become an external function that works with note-like objects. Also, the `updateValue` equivalent does not mutate the original note, it returns a copy with an updated value. Although this implementation's "methods" do not mutate the note, they do not stop mutation from happening elsewhere.   
 
``` js  
let describeNoteFunctional = (note) =>  note.type + ': ' + note.value

let updateNoteValueFunctional = (value, note) => ({...note, value})

let NoteFunctional = ({type, value}) => ({type, value, isNote: true})

NoteFunctional.isNote = (note) => !!note.isNote

let testNoteFunctional = () => {
  let result = {}
  let note = result.note = NoteFunctional({type:'todo', value: 'get eggs'})
  result.descriptionBeforeUpdate = describeNoteFunctional(note)
  let updatedNote = result.updatedNote = updateNoteValueFunctional('get ham', note)
  result.descriptionAfterUpdate = describeNoteFunctional(updatedNote)
  result.check = NoteFunctional.isNote(note)
  return result
}
```

### FUNCTIONAL (CURRIED)   
This is very similar to the `NoteFunctional`  implementation, but it's using curried functions. Currying is amazing, and if you haven't given it a shot YOU SHOULD RIGHT NOW! Below are some great JS curry related resources.  

  * [Funfunfunction's steller curry video](https://www.youtube.com/watch?v=iZLP4qOwY8I)
  * [Getify on function composition](https://github.com/getify/Functional-Light-JS/blob/13a3bdafb4edb83207db76212312472aab20d06a/manuscript/ch4.md)  
  * [Hemanth's amazin functional programing jargon in javascript](https://github.com/hemanth/functional-programming-jargon)
    
```  js
let describeNoteFunctionalCurry = (note) => () =>  note.type + ': ' + note.value
  
let updateNoteValueFunctionalCurry = (note) => (value) => ({...note, value})

let NoteFunctionalCurry = ({type, value}) => ({type, value, isNote: true})

NoteFunctionalCurry.isNote = (note) => !!note.isNote

let testNoteFunctionalCurry = () => {
  let result = {}
  let note = result.note = NoteFunctionalCurry({type:'todo', value: 'get eggs'})
  result.descriptionBeforeUpdate = describeNoteFunctionalCurry(note)()
  let updatedNote = result.updatedNote = updateNoteValueFunctionalCurry(note)('get ham')
  result.descriptionAfterUpdate = describeNoteFunctionalCurry(updatedNote)()
  result.check = NoteFunctionalCurry.isNote(note)
  return result
}
```

### FUNCTIONAL WITH FREEZING    
This is the same as `NoteFunctional` but each time a note is returned it is first passed into `Object.freeze()` witch will prevent the note from being mutated anywhere in the program. 
``` js
let describeNoteFunctionalFreeze = (note) =>  note.type + ': ' + note.value

let updateNoteValueFunctionalFreeze = (value, note) => Object.freeze({...note, value})

let NoteFunctionalFreeze = ({type, value}) => Object.freeze({type, value, isNote: true})

NoteFunctionalFreeze.isNote = (note) => !!note.isNote

let testNoteFunctionalFreeze = () => {
  let result = {}
  let note = result.note = NoteFunctionalFreeze({type:'todo', value: 'get eggs'})
  result.descriptionBeforeUpdate = describeNoteFunctionalFreeze(note)
  let updatedNote = result.updatedNote = updateNoteValueFunctionalFreeze('get ham', note)
  result.descriptionAfterUpdate = describeNoteFunctionalFreeze(updatedNote)
  result.check = NoteFunctionalFreeze.isNote(note)
  return result
}
```
  
### FUNCTIONAL-ISH (CURRIED BUT WITH MUTATION)  
Functional coding is my favz, but usually, I don't use it to model OOP, for the [lulz](https://en.wiktionary.org/wiki/for_the_lulz) I did it anyway.       
    
JS often has OOP implementations of objects that sometimes have functional-esq methods for example `array.map(cb)`. But this here... is the opposite, it's using the powers of closure to make a function return an OOP like object without the use of the `new` keyword. AKA. THIS ONE IS WACK, and its got readability issues... for example I felt the need to write comments in the code to explain complexities. Basically, I feel like this one is not a good choice even if it's fast, but it might be fun for you to read through anyways.   
``` js
let describeNoteFunctionalish =  (note) => () => note.type + ': ' + note.value

let updateNoteValueFunctionalish = (note) => (value) => {
  // this is not functional it is mutating the note and returning "self" 
  note.value = value
  return value 
}

let NoteFunctionalish = (type, value) => {
  var state = {
    type, 
    value, 
    isNote: true,
  }
  // methods have to be added after state is intialized inorder to have a closure
  // wraped over state, as opposed to undefined
  return {
    ...state,
    describe: describeNoteFunctionalish(state),
    updateValue: updateNoteValueFunctionalish(state),
  }
}

NoteFunctionalish.isNote = (note) => {
  return !!note.isNote
}

let testNoteFunctionalish = () => {
  let result = {}
  let note = result.note = NoteFunctionalish('todo', 'get eggs')
  result.descriptionBeforeUpdate = note.describe()
  note.updateValue('get ham')
  result.descriptionAfterUpdate = note.describe()
  result.check = NoteFunctionalish.isNote(note)
  return result
}
```

## Exposing dirt about a friend kinda gossip
### Object.create   
This one is much more like the first three, in that it returns an object that has prototype methods with the same behaviors. However, I used `Object.create()` to bring the note to life. On MDN when prototype warnings come up usually it refers you to `Object.create()` as a good tool to use, BUT SPOILER ALERT ITS HELLLLLZA SLOW.   
``` js
function NoteObjectCreate(type, value){
  let prototype = {
    isNote: true, 
    describe: function(){
      return this.type + ': ' + this.value
    },
    updateValue: function(value){
      this.value = value
      return this
    },
  }
  
  return Object.create(prototype, {
    type: {
      writable: true, 
      value: type, 
    },
    value: {
      writable: true, 
      value: value, 
    },
  })
}

NoteObjectCreate.isNote = function(note){
  return !!note.isNote
}

let testNoteObjectCreate = () => {
  let result = {}
  let note = result.note = NoteObjectCreate('todo', 'get eggs')
  result.descriptionBeforeUpdate = note.describe()
  note.updateValue('get ham')
  result.descriptionAfterUpdate = note.describe()
  result.check = NoteObjectCreate.isNote(note)
  return result
}
```

### Object.setPrototypeOf   
THE LAST IMPLEMENTATION, PHIEAW!  
  
This one is also similar to the first three, and MDN also points to `Object.setPrototypeOf()` as a good way to set an object's prototype. ALSO, SPOILER ALERT ITS HELLLLZA SLOOOOOOWW!   
``` js
function NoteSetPrototypeOf(type, value){
  let result = { type, value}
  let prototype = {
    isNote: true, 
    describe: function(){
      return this.type + ': ' + this.value
    },
    updateValue: function(value){
      this.value = value
      return this
    },
  }
  return Object.setPrototypeOf(result, prototype)
}

NoteSetPrototypeOf.isNote = function(note){
  return !!note.isNote
}

let testNoteSetPrototypeOf = () => {
  let result = {}
  let note = result.note = NoteSetPrototypeOf('todo', 'get eggs')
  result.descriptionBeforeUpdate = note.describe()
  note.updateValue('get ham')
  result.descriptionAfterUpdate = note.describe()
  result.check = NoteSetPrototypeOf.isNote(note)
  return result
}
```
## YOU ARE BEAUTIFUL JUST THE WAY YOU ARE
### tick tock  
After hashing out all the Object creation implementations, I made a function `testSpeed` for testing the speed of a synchronous javascript function. `testSpeed` has the following args.    
* `cb` - a function who's speed gunna' be test
* `iterations` - the number of times `cb` should get executed per **run**
    * defaulting to `1048576` -- just an arbitrarily large number
* `runs` - the number of times you want to collect how many milliseconds elapsed while executing `cb` `iterations` times.    
    * defaulting to `10`   
``` js 
let testSpeed = ({cb, runs=10, iterations=Math.pow(2, 20)}) => {
  let state = {
    runs,
    iterations,
    results: []
  }
  for (var t =0; t < runs; t++){
    let startTime = performance.now()
    for(var i = 0; i < iterations; i++){
      cb()
    }
    state.results.push(performance.now() - startTime)
  }
  state.min = state.results.reduce((r, n) => Math.min(r, n))
  state.max = state.results.reduce((r, n) => Math.max(r, n))
  state.diference = state.max - state.min
  state.totalTime = state.results.reduce((r, n) => r + n) 
  state.average = state.totalTime / 10
  return state
}
```

### RUNNIN RUNNIN RUNNIN (that song, ya know?)    
This lil doodie runs each function through `speedTest` and aggregates the results, then it returns an array of those results sorted by the average ms elapsed.   
``` js
let runTest = () => {
  return [
    testNoteConstructor,
    testNoteClass, 
    testNoteFactory,
    testNoteFunctional, 
    testNoteFunctionalFreeze, 
    testNoteFunctionalCurry, 
    testNoteFunctionalish, 
    testNoteObjectCreate,
    testNoteSetPrototypeOf,
  ].map(cb => {
    console.log('testing', cb.name)
    return {
      name: cb.name,
      testSpeedResults: testSpeed({cb, runs: RUNS_PER_TEST, iterations: ITTERATIONS_PER_RUN})
    }
  }).sort((a, b) => a.testSpeedResults.average - b.testSpeedResults.average)
}  
```

### RESULTS
From Chrome Version 71.0.3578.98 (64-bit) on a whizzbang fast box.  
All of the following numbers are milliseconds per 1048576 invocations.  
1. testNoteConstructor average: 23.7, min: 18, max: 35, diference: 17. 
2. testNoteClass average: 45, min: 41, max: 53, diference: 12. 
3. testNoteFactory average: 46, min: 41, max: 53, diference: 12. 
4. testNoteFunctional average: 66.5, min: 62, max: 81, diference: 19. 
5. testNoteFunctionalCurry average: 69.2, min: 59, max: 80, diference: 21. 
6. testNoteFunctionalish average: 105.2, min: 97, max: 117, diference: 20. 
7. testNoteFunctionalFreeze average: 1023.4, min: 964, max: 1118, diference:154. 
8. testNoteSetPrototypeOf average: 14670.4, min: 12107, max: 17579, diference: 5472. 
9. testNoteObjectCreate average: 14938.2, min: 9646, max: 19564, diference: 9918. 

## CONCLUSION 
It takes me longer to do a write up than to write the code.   

And ...   

1. Classic constructors are really really fast. 
2. Classes and Factories are essentially equivalent, but they're both super fast so use em' all day. 
3. Functional versions are lil' a bit slower, but unless you have crazy needy for speedy optimization hax, go ahead and use em all day. 
    * also the closure implementations have memory considerations
4. USE `Object.freeze` with caution, It's an amazing tool and you should use it but If you're regularly doing something Millions of times it can have a substantial impact. So Use it with caution all day.   
5. `Object.create` and `Object.setPrototypeOf` are DEFINITELY not supposed to be used this way! They are also amazing tools, but they should be used with much consideration. For example, `Object.create` can be used to create classic inheritance (I'm not a fan of inheritance but wat-evz), where `Object.create` is called once per type of model and then never again. As opposed to Once per instantiation of a model.   
6. Write code for fun!

<3 Slug. 

[Original Code](https://gist.github.com/slugbyte/4db0cda98f90c0e012ff218406faef28)
