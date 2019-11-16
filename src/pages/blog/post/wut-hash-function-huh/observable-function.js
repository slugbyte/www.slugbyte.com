// https://observablehq.com/@slugbyte/hash-function@868
import define1 from './lorem-ipsum.js'
import define2 from './inputs.js'

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Wut, Hash Functions, Huh?

Hash funcions can be thought of as Pseudo Random Number Generators that use generic data as seeds.
It is generally considered very difficult to generalize hash function algorithems because input can very so greatly. Hash functions have many uses including...

* [Verifying data integrity](https://en.wikipedia.org/wiki/File_verification)
* [Signature generation and verification](https://en.wikipedia.org/wiki/Digital_signature)
* [Password verification](https://en.wikipedia.org/wiki/Password_hashing)
* [Proof-of-work](https://en.wikipedia.org/wiki/Proof-of-work_system)
* [File or data identifier](https://en.wikipedia.org/wiki/Hash_table)

In theory there can be a *perfect hash function* (PHF) for any given set of data, a PHF is a hash function that will not have any collisions. Because a PHF is so difficult to create it is common to shoot for implamenting *ideal hash functions* (IHF). The goal of an IHF is to generate the least amount of collisions possible.


Hash functions are meant to be fast, determinstic, and have few or no collisions. Small changes to the input should reflect to changes in the output. Common tools for implamenting hash functions are arithmetic opperators, bitwise opperators, logic, and lookup tables. These opperations are fast and can be implamented on GPUs.

One method for construction hash functions is known as [Merkle–Damgård construction](https://en.wikipedia.org/wiki/Merkle%E2%80%93Damg%C3%A5rd_construction). The following diagram is a simplified version of its steps.








`
)});
  main.variable(observer()).define(["dot"], function(dot){return(
dot`
digraph dot  {
  step_1 [shape=rect color=green label="1) Initialise an internal state"]
  step_2 [shape=rect label="2) Consume the seed data in 32 bit blocks"]
  step_3 [shape=rect label="3) Mix the current block with the internal state"]
  step_4 [shape=rect label="4) Update the internal state with result of step (3)"]
  step_5 [label="5) If there is more seed data go back to step (2)"]
  step_6 [shape=rect color=red label="6) Finalize the state and return the hash value"]

  step_1 -> step_2 -> step_3 -> step_4 -> step_5 -> step_2
  step_5 -> step_6
}
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Converting strings to numbers for the mix math (&|^+-*)
Because the hash function will use arithmatic and bitwise opearters to perform step three in the flow chart above. We need to convert the strings we are going to hash into 32bit numbers (blocks) to work with.

Javascript strings have a \`charCodeAt\` method for converting a charicter into a one byte ascii code (integer). \`'hello world'.charCodeAt(0)\` will return the number 104 (aka hex 0x68). 104 is the ascii decimal char code for the letter 'h'.

Using the left shift opperator with the binary-or operator you can combine indavidual bytes into a larger multibyte number.  
if \`y=0xfa\` and \`z=0x23\` then \`((y<<8) | z)\` will preduce 0xfa23

By combining the functions of charCodeAt, the binary-or operator, and the left shift operator we can convert every four charicters of a string into a 32 bit number. 
`
)});
  main.variable(observer("stringTo32BitBlocks")).define("stringTo32BitBlocks", function(){return(
function stringTo32BitBlocks(string){
  let result = []
  // turn every four bytes into a 32bit number and push to results
  for(let i=0;i<string.length; i+=4){
    let bytes = string.slice(i, i+4).split('').map(c => c.charCodeAt(0))
    let block = (bytes[3] << 16) | (bytes[2] << 12) | (bytes[1] << 8) | bytes[0]
    result.push(block)
  }
  return result
}
)});
  main.variable(observer()).define(["md","example","stringTo32BitBlocks"], function(md,example,stringTo32BitBlocks){return(
md` 
\`\`\` js
> stringTo32BitBlocks('${example}')
// [${stringTo32BitBlocks(example).join(', ')}]
\`\`\`
`
)});
  main.variable(observer("viewof example")).define("viewof example", ["text"], function(text){return(
text({title: "Change the input.", value: 'Hello world!', placeholder: "Type something"})
)});
  main.variable(observer("example")).define("example", ["Generators", "viewof example"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`
## Implamenting a hash function
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

**WARNING:** This hash implamentaion is just a leaning example and should not be used in any security related applications. AKA. Don't use this for hashing passwords, data integrety assurence, or any other security matter.

Ok, Lets just stick to the flow chart.
`
)});
  main.variable(observer("hash")).define("hash", ["mix"], function(mix){return(
function hash(data){
  // STEP 1 intialize the internal state
  let state = [0xffaaffbb, 0x7fffffff, 0xfabbaafb, 0x40f777a7] // MAGIC NUMBERS
  
  // STEP 2 consume the input data in 32bit blocks (i+=4)
  for(let i=0;i<data.length/*STEP 5 if more data repeat STEP 2*/; i+=4){
    let bytes = data.slice(i, i+4).split('').map(c => c.charCodeAt(0))
    let block = (bytes[3] << 16) | (bytes[2] << 12) | (bytes[1] << 8) | bytes[0]
    
    // STEP 3 and 4 mix the current block with the state and update the state 
    state = mix(state, block)
  } 
  // STEP 6 FINILISE DATA AND RETURN HASH VALUE
  return state.map(n => Math.abs(n).toString(16)).join('')
}
)});
  main.variable(observer("mix")).define("mix", function(){return(
function mix(state, block){
  // Step 3 the mix function uses *+-, ^&|, >><< and % to mix the current block in with the state
  let select = block % 4
  let zero = state[0] + (state[select] * block) ^ state[state[select] % 4] << 3 | block >> 5
  let one = zero * (state[2] & state[3]) ^ state[3]
  let two  = (state[3] >> (zero % 1)) * (zero ^ one)
  let three = (state[3] ^ (two << 1)) ^ (state[select] >> 2)
  return [zero >> 1, one << 1, two >> 1, three << 1].map(n => n & 0xffffffff)
}
)});
  main.variable(observer()).define(["md","exampleText","hash"], function(md,exampleText,hash){return(
md` 

\`\`\` js
> hash('${exampleText || ''}')   
// ${hash(exampleText)}
\`\`\`

`
)});
  main.variable(observer("viewof exampleText")).define("viewof exampleText", ["text"], function(text){return(
text({title: "Change the hash input.", value: 'Hello world!', placeholder: "Type something"})
)});
  main.variable(observer("exampleText")).define("exampleText", ["Generators", "viewof exampleText"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`
## Testing for collisions
Here is my test the effective randomness strategy.
1. Generate a bunch of strings to hash with a lorem ipsum library
2. Hash the lorem ipsum strings
3. Turn the split the hashes in to 32 bit numbers 
4. Convert the the numbers in to points
5. Plot the points on a canvas with pretty colors
 
If the plotted points are not randomly spaced well then the chances of a hash collision will be high.


`
)});
  main.variable(observer()).define(["DOM","width","hashedLoremToPoints"], function(DOM,width,hashedLoremToPoints)
{  
  const height = 400
  const context = DOM.context2d(width, height);
  
  let colors = ['orange', 'black',  'red',  'magenta', ]
  let points = hashedLoremToPoints()

  for(var i=0; i<points.length; i++){
      context.fillStyle = colors[i % colors.length]
      context.fillRect(points[i].x % width, points[i].y % height, 3, 3)
  }
  
  return context.canvas
}
);
  main.variable(observer("viewof ipsumPhraseCount")).define("viewof ipsumPhraseCount", ["slider"], function(slider){return(
slider({
  min: 10,
  max: 10000,
  step: 5,
  value: 1000,
  format: ",",
  description: 'Edit number of lorem ipsuems phrases to hash',
})
)});
  main.variable(observer("ipsumPhraseCount")).define("ipsumPhraseCount", ["Generators", "viewof ipsumPhraseCount"], (G, _) => G.input(_));
  main.variable(observer("viewof ipsumWordCount")).define("viewof ipsumWordCount", ["slider"], function(slider){return(
slider({
  min: 1,
  max: 100,
  step: 1,
  value: 4,
  format: ",",
  description: 'Edit the number of words in each lorem ispum phrase',
})
)});
  main.variable(observer("ipsumWordCount")).define("ipsumWordCount", ["Generators", "viewof ipsumWordCount"], (G, _) => G.input(_));
  main.variable(observer("viewof cycle")).define("viewof cycle", ["checkbox"], function(checkbox){return(
checkbox([ 'cycle lorem genorator'])
)});
  main.variable(observer("cycle")).define("cycle", ["Generators", "viewof cycle"], (G, _) => G.input(_));
  main.variable(observer("lorem")).define("lorem", ["cycle","ipsumPhraseCount","loremipsum","ipsumWordCount"], function*(cycle,ipsumPhraseCount,loremipsum,ipsumWordCount)
{
  while(cycle) {
    yield new Array(ipsumPhraseCount).fill(0).map(() => loremipsum({units: 'words', count: ipsumWordCount}))
  }
   yield new Array(ipsumPhraseCount).fill(0).map(() => loremipsum({units: 'words', count: ipsumWordCount}))
}
);
  main.variable(observer("hashedLorem")).define("hashedLorem", ["lorem","hash"], function(lorem,hash){return(
lorem.map(i => hash(i))
)});
  main.variable(observer("points")).define("points", ["hashedLoremToPoints"], function(hashedLoremToPoints){return(
hashedLoremToPoints().map(p => ('x: ' +  p.x.toString(16) + ', y: ' + p.y.toString(16)))
)});
  main.variable(observer("hashedLoremToPoints")).define("hashedLoremToPoints", ["hashedLorem"], function(hashedLorem){return(
function hashedLoremToPoints(){
  let allHashes = hashedLorem.join('')
  let result = []  
  for(var i=0;i<allHashes.length; i+=16){
    // x and y are both 32 bit numbers
    result.push({
      x: parseInt(allHashes.slice(i, i+8), 16), 
      y: parseInt(allHashes.slice(i+8, i+16), 16), 
    })
  }
  return result
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
## Resources 
* http://www.partow.net/programming/hashfunctions
* https://en.wikipedia.org/wiki/Merkle%E2%80%93Damg%C3%A5rd_construction
* https://en.wikipedia.org/wiki/Cryptographic_hash_function
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Librarys`
)});
  const child1 = runtime.module(define1);
  main.import("loremipsum", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  main.import("text", child2);
  main.import("checkbox", child2);
  main.variable(observer("dot")).define("dot", ["require"], function(require){return(
require("@observablehq/graphviz@0.2")
)});
  return main;
}
