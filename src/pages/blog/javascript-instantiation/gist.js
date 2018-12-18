// TEST SPEEDS OF DIFFERINT TYPES OF OBEJCT INSTANTIATION

// Im working on github.com/slugbyte/data-structures and have been testing out differnt coding styles for
// implamenting my ADSs. At first I was mosly intresed in the asthetics of my coding, because I
// have been intrested for a while in expiermenting with coding style. But I recenlty started reading about diffrent 
// Speed implications using functions like Object.prototype and Object.create so I decited to go ahead write my self
// some SPEED TESTS! 

// I created the following simple note using each instationation method
//    {type: 'todo', value: 'get eggs'} 
// and added the following prototype methods...
//    Note.prototype.describe := () => self.type + ': ' + self.value
//    Note.prototype.update := (value) => self.value = value
// and added the following prototype propertys
//    Note.prototype.isNote = true
//    Note.prototype.constructor = Note
// and added the following static method
//    Note.isNote := (note) => !!note.isNote

// To test the speed of each method I instatiated 1048576 notes, 10 times for each instationation method and collected 
// the milliseconds ellapsed. Then I print the results with a little bit handy math to calculate things like
// the min, max, and average milliseconds of each run. 

// 1048576 was just an arbitray large number ie. Math.pow(2, 20)

// Example reults in a Chrome Version 71.0.3578.98 (Official Build) (64-bit) On a 2.9 GHz Intel Core i9 :)
// The following values are all milisections per 1048576 instattiations
// 1) testNoteConstructor average: 23.7, min: 18, max: 35, diference: 17
// 2) testNoteClass average: 45, min: 41, max: 53, diference: 12
// 3) testNoteFactory average: 46, min: 41, max: 53, diference: 12
// 4) testNoteFunctional average: 66.5, min: 62, max: 81, diference: 19
// 5) testNoteFunctionalCurry average: 69.2, min: 59, max: 80, diference: 21
// 6) testNoteFunctionalish average: 105.2, min: 97, max: 117, diference: 20
// 7) testNoteFunctionalFreeze average: 1023.4, min: 964, max: 1118, diference: 154
// 8) testNoteSetPrototypeOf average: 14670.4, min: 12107, max: 17579, diference: 5472
// 9) testNoteObjectCreate average: 14938.2, min: 9646, max: 19564, diference: 9918

// THE FINDINGS SHOW THAT 
// * es5 constructors are the fastet
// * factorys are esentially exacly the same speed as their constructors
// * classes a a little bit slower than constructors
// * functional code is a bit slower than classes 
// * Using Object.freeze can have significate peroformace impacts when working huge numbers of objects 
//      and should be used with caution.
// * Using Object.setPrototype, Object.create can be over 640 times slower than constructors, LULWUUUUUUUUTTTTTT!
//     So if performance is an issue for your program... probs dont want to modify your protytpes :p


let RUNS_PER_TEST = 10
let ITTERATIONS_PER_RUN = Math.pow(2, 20)

function NoteConstructor(type, value){
    this.type = type
    this.value = value
}
NoteConstructor.prototype.isNote = true
NoteConstructor.prototype.describe = function(){
  return this.type + ': ' + this.value
}
NoteConstructor.prototype.updateValue = function(value){
  this.value = value
  return this
}
NoteConstructor.isNote = function(note){
  return !!note.isNote
}
let testNoteConstructor= () => {
  let result = {}
  let note = result.note = new NoteConstructor('todo', 'get eggs')
  result.descriptionBeforeUpdate = note.describe()
  note.updateValue('get ham')
  result.descriptionAfterUpdate = note.describe()
  result.check = NoteConstructor.isNote(note)
  result.constructor = note.constructor
  return result
}

let NoteFactory = function(type, value){
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

// functional-ish curryed note methods
// called -ish because update has to mutate the state inorder to preserve
// the closure access to the correct state after update has been called 
// if this was truly functional the note would have no methods and update would 
// instead reaturn {...note, value} (a copy of the old note with an updated value)
// that would make sure the old note was never mutated
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

let testSpeed = ({cb, runs=10, iterations=Math.pow(2, 20)}) => {
  let state = {
    runs,
    iterations,
    results: []
  }
  for (var t =0; t < runs; t++){
    let startTime = Date.now()
    for(var i = 0; i < iterations; i++){
      cb()
    }
    state.results.push(Date.now() - startTime)
  }
  state.min = state.results.reduce((r, n) => Math.min(r, n))
  state.max = state.results.reduce((r, n) => Math.max(r, n))
  state.diference = state.max - state.min
  state.totalTime = state.results.reduce((r, n) => r + n) 
  state.average = state.totalTime / 10
  return state
}



let runTest = () => {
  return  [
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


let results = runTest()
console.log(results)

// copy(results.map((r, i)=> `// ${i + 1}) ${r.name} average: ${r.testSpeedResults.average}, min: ${r.testSpeedResults.min}, max: ${r.testSpeedResults.max}, diference: ${r.testSpeedResults.diference}`).join('\n'))





