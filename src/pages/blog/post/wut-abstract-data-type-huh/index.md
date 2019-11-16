## Wut, Abstract Data Type Huh?

### We can make up our own ADT
Because an abstract data type is just a model for some data and its be havior, we can make one up.
An ADTs is a perscription for a type, not an *implamentation*. In programming jargaon we call the perscription
an *interface* and the code that creates that *interface* an *implamentation*. To demonstrate the difference lets 
crerate our own rules for an *interface* and then *implament* it two different ways. 

### A generic value ADT (ValueStore)
In order not to over compicate things lets make a ADT with the sole purpose of storing a single value. 
This ADT probbly wont have to much usefulness in a piece of software, but it should help demonstrate the
concept of *interface* vs *implamentation*.  

Lets create an ADT that will store a single value. Lets define two methods for this ADT. 
A method named **set** for seting the value, and a method named **get** for retrieving the stored value.  

Lets name the ADT ValueStore.   

Lets say that when a ValueStore is created Its value can be initialed or default to `null`.  

### ValueStore constructor implamentation 
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

### ValueStore closure implamentation 
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

### Review
An ADT is a perscription, for lack of a better word, for an *interface* that defines a Type.
A programmer can implament the *interface* of an ADT using any *implementation* they want. 

The above two implamentations of a ValueStore both have the exact same potential. Don't be 
confused that their syntactic interfaces are slightly different, the important thing is that 
they both implament the correct behaviors we defined for our made up ValueStore ADT.

