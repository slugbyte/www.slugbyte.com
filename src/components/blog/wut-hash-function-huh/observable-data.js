// URL: https://observablehq.com/@slugbyte/hash-function
// Title: Wut, Hash Functions, Huh?
// Author: Duncan Marsh (@slugbyte)
// Version: 868
// Runtime version: 1

const m0 = {
  id: "d145f7d6b6821fa9@868",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
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
)})
    },
    {
      inputs: ["dot"],
      value: (function(dot){return(
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
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Converting strings to numbers for the mix math (&|^+-*)
Because the hash function will use arithmatic and bitwise opearters to perform step three in the flow chart above. We need to convert the strings we are going to hash into 32bit numbers (blocks) to work with.

Javascript strings have a \`charCodeAt\` method for converting a charicter into a one byte ascii code (integer). \`'hello world'.charCodeAt(0)\` will return the number 104 (aka hex 0x68). 104 is the ascii decimal char code for the letter 'h'.

Using the left shift opperator with the binary-or operator you can combine indavidual bytes into a larger multibyte number.  
if \`y=0xfa\` and \`z=0x23\` then \`((y<<8) | z)\` will preduce 0xfa23

By combining the functions of charCodeAt, the binary-or operator, and the left shift operator we can convert every four charicters of a string into a 32 bit number. 
`
)})
    },
    {
      name: "stringTo32BitBlocks",
      value: (function(){return(
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
)})
    },
    {
      inputs: ["md","example","stringTo32BitBlocks"],
      value: (function(md,example,stringTo32BitBlocks){return(
md` 
\`\`\` js
> stringTo32BitBlocks('${example}')
// [${stringTo32BitBlocks(example).join(', ')}]
\`\`\`
`
)})
    },
    {
      name: "viewof example",
      inputs: ["text"],
      value: (function(text){return(
text({title: "Change the input.", value: 'Hello world!', placeholder: "Type something"})
)})
    },
    {
      name: "example",
      inputs: ["Generators","viewof example"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
## Implamenting a hash function
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`

**WARNING:** This hash implamentaion is just a leaning example and should not be used in any security related applications. AKA. Don't use this for hashing passwords, data integrety assurence, or any other security matter.

Ok, Lets just stick to the flow chart.
`
)})
    },
    {
      name: "hash",
      inputs: ["mix"],
      value: (function(mix){return(
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
)})
    },
    {
      name: "mix",
      value: (function(){return(
function mix(state, block){
  // Step 3 the mix function uses *+-, ^&|, >><< and % to mix the current block in with the state
  let select = block % 4
  let zero = state[0] + (state[select] * block) ^ state[state[select] % 4] << 3 | block >> 5
  let one = zero * (state[2] & state[3]) ^ state[3]
  let two  = (state[3] >> (zero % 1)) * (zero ^ one)
  let three = (state[3] ^ (two << 1)) ^ (state[select] >> 2)
  return [zero >> 1, one << 1, two >> 1, three << 1].map(n => n & 0xffffffff)
}
)})
    },
    {
      inputs: ["md","exampleText","hash"],
      value: (function(md,exampleText,hash){return(
md` 

\`\`\` js
> hash('${exampleText || ''}')   
// ${hash(exampleText)}
\`\`\`

`
)})
    },
    {
      name: "viewof exampleText",
      inputs: ["text"],
      value: (function(text){return(
text({title: "Change the hash input.", value: 'Hello world!', placeholder: "Type something"})
)})
    },
    {
      name: "exampleText",
      inputs: ["Generators","viewof exampleText"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
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
)})
    },
    {
      inputs: ["DOM","width","hashedLoremToPoints"],
      value: (function(DOM,width,hashedLoremToPoints)
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
)
    },
    {
      name: "viewof ipsumPhraseCount",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  min: 10,
  max: 10000,
  step: 5,
  value: 1000,
  format: ",",
  description: 'Edit number of lorem ipsuems phrases to hash',
})
)})
    },
    {
      name: "ipsumPhraseCount",
      inputs: ["Generators","viewof ipsumPhraseCount"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof ipsumWordCount",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  min: 1,
  max: 100,
  step: 1,
  value: 4,
  format: ",",
  description: 'Edit the number of words in each lorem ispum phrase',
})
)})
    },
    {
      name: "ipsumWordCount",
      inputs: ["Generators","viewof ipsumWordCount"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof cycle",
      inputs: ["checkbox"],
      value: (function(checkbox){return(
checkbox([ 'cycle lorem genorator'])
)})
    },
    {
      name: "cycle",
      inputs: ["Generators","viewof cycle"],
      value: (G, _) => G.input(_)
    },
    {
      name: "lorem",
      inputs: ["cycle","ipsumPhraseCount","loremipsum","ipsumWordCount"],
      value: (function*(cycle,ipsumPhraseCount,loremipsum,ipsumWordCount)
{
  while(cycle) {
    yield new Array(ipsumPhraseCount).fill(0).map(() => loremipsum({units: 'words', count: ipsumWordCount}))
  }
   yield new Array(ipsumPhraseCount).fill(0).map(() => loremipsum({units: 'words', count: ipsumWordCount}))
}
)
    },
    {
      name: "hashedLorem",
      inputs: ["lorem","hash"],
      value: (function(lorem,hash){return(
lorem.map(i => hash(i))
)})
    },
    {
      name: "points",
      inputs: ["hashedLoremToPoints"],
      value: (function(hashedLoremToPoints){return(
hashedLoremToPoints().map(p => ('x: ' +  p.x.toString(16) + ', y: ' + p.y.toString(16)))
)})
    },
    {
      name: "hashedLoremToPoints",
      inputs: ["hashedLorem"],
      value: (function(hashedLorem){return(
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
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
## Resources 
* http://www.partow.net/programming/hashfunctions
* https://en.wikipedia.org/wiki/Merkle%E2%80%93Damg%C3%A5rd_construction
* https://en.wikipedia.org/wiki/Cryptographic_hash_function
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Librarys`
)})
    },
    {
      from: "@jashkenas/lorem-ipsum",
      name: "loremipsum",
      remote: "loremipsum"
    },
    {
      from: "@jashkenas/inputs",
      name: "slider",
      remote: "slider"
    },
    {
      from: "@jashkenas/inputs",
      name: "text",
      remote: "text"
    },
    {
      from: "@jashkenas/inputs",
      name: "checkbox",
      remote: "checkbox"
    },
    {
      name: "dot",
      inputs: ["require"],
      value: (function(require){return(
require("@observablehq/graphviz@0.2")
)})
    }
  ]
};

const m1 = {
  id: "@jashkenas/lorem-ipsum",
  variables: [
    {
      name: "loremipsum",
      inputs: ["dictionaries","lipsum"],
      value: (function(dictionaries,lipsum){return(
function loremipsum({
  count = 3,
  using = "Lorem Ipsum", 
  units = "paragraphs",
  minWordsPerSentence = 5,
  maxWordsPerSentence = 15,
  minSentencesPerParagraph = 3,
  maxSentencesPerParagraph = 7,
  words = null
} = {}) {
  if (words == null) {
    words = using === "Lorem Ipsum" ? null : dictionaries[using];
  }
  return lipsum({
    count, 
    units, 
    sentenceLowerBound: minWordsPerSentence, 
    sentenceUpperBound: maxWordsPerSentence, 
    paragraphLowerBound: minSentencesPerParagraph, 
    paragraphUpperBound: maxSentencesPerParagraph, 
    words
  }) 
}
)})
    },
    {
      name: "dictionaries",
      inputs: ["split","hipster","bro","vegan","elvish","bitcoin","gagnam"],
      value: (function(split,hipster,bro,vegan,elvish,bitcoin,gagnam){return(
{
 "Hipster Ipsum": split(hipster), 
 "Bro Ipsum": split(bro), 
 "Vegan Ipsum": split(vegan), 
 "Elvish Ipsum": split(elvish), 
 "Crypto Ipsum": split(bitcoin), 
 "Gagnam Ipsum": split(gagnam) 
}
)})
    },
    {
      name: "lipsum",
      inputs: ["require"],
      value: (function(require){return(
require('https://bundle.run/lorem-ipsum@1.0.6')
)})
    },
    {
      name: "split",
      value: (function(){return(
function split(text) {
  return text.split(/\s+/);
}
)})
    },
    {
      name: "hipster",
      value: (function(){return(
"+1 3 8-bit a aesthetic american anderson apparel art artisan austin authentic bag banh banksy batch beard beer before belly bespoke bicycle biodiesel bird blog booth brooklyn brunch bushwick butcher cardigan carles chambray chillwave chips cleanse cliche coffee cosby craft cray cred denim direct diy dreamcatcher echo ennui ethical ethnic etsy fanny fap farm-to-table fingerstache fixie flexitarian food forage four freegan fund future gastropub gentrify gluten-free godard haven't heard hella helvetica high hoodie iphone irony it jean kale keffiyeh keytar kogi leggings letterpress level life lo-fi locavore loko lomo marfa master mcsweeney's messenger mi mixtape mlkshk moon mumblecore mustache narwhal next occupy odd of on organic out pack park party pbr photo pickled pinterest pitchfork polaroid pop-up pork portland post-ironic pour-over probably put quinoa raw readymade retro richardson rights salvia sartorial scenester seitan selvage semiotics shoreditch shorts single-origin skateboard small sold squid sriracha street stumptown sustainable swag sweater synth tattooed terry them they thundercats tofu trade truck truffaut trust tumblr twee typewriter umami vegan vhs vice vinyl viral wayfarers wes whatever williamsburg wolf you yr"
)})
    },
    {
      name: "bro",
      value: (function(){return(
"a abs awesome band bar beat beer benchpress bicep bomb bro brodown bromo bromosexual brosie brosky brotally bruh bummer burberry cheah chicks chillax collar colored crib croakies cruisin' crushed curls dave deep designer digits dope double dude dumbbells epic facemelt fistpump football fratastic frathard fresh frisbee game glowsticks got gtl hairflip hella hit hookup i i'd is it jager just keg kicks killer know, lacoste ladies lame lasers lax let's light lotion mad matthews mcgotes me metbrosexual mixer natty neck neckbro noise noxplode o'donnell party polo pong popped pre-workout protein pumped pushups quads ragefest rageout rager rando raybans real redbull right salmon searsucker sesh shades shorts shots shredded sickness solid sorority spank sperries squash suburban sugarfree suhweet sunglasses sup super sweetness take talking tan tanning that this throw tight tony totally totes ultimate up ups v visor vodka was yolo"
)})
    },
    {
      name: "vegan",
      value: (function(){return(
"ahipa aka american arracacha arrowhead artichoke arugula asparagus aubergine avocado azuki bamboo bean beet beetroot bell bitter bitterleaf black-eyed bok bologi brinjal broadleaf broccoli brussels burdock cabbage camas canna cardoon carrot cassava catsear cauliflower celeriac celery celtuce ceylon chard chaya chestnut chickpea chickweed chicory chinese choy chrysanthemum collard common corn courgette cress cucumber daikon dandelion dolichos drumstick earthnut eggplant elephant endive ensete epazote fat fava fennel fiddlehead florence fluted foot garbanzo garden garlic gherkin ginger gobo golden good gourd gram greater green greens groundnut guar gumbo hamburg hen henry horse horseradish indian jerusalem kai-lan kale king kohlrabi komatsuna kuka kumara kurrat lagos lamb's land leaves leek lentil leone lettuce lima lizard's lotus maize mallow manioc melokhia melon miner's mizuna mooli moth mung mustard napa new nopal okra onion or orache pak paracress parsley parsnip pea peanut pepper pigeon pignut plantain plectranthus polk potato prairie prussian pumpkin purslane rabe radicchio radish ricebean rocket root runner rutabaga salad salsify samphire scallion scorzonera sea shallot shoot sierra skirret soko sorrel soybean spinach spring sprout sprouts squash summer swede sweet swiss tail taro tarwi tatsoi tepary ti tigernut tinda tomatillo tomato turnip ulluco urad velvet water watercress welsh west wild winged winter yam yardlong yarrow zealand zucchini"
)})
    },
    {
      name: "elvish",
      value: (function(){return(
"enna ada adab adan adel aduial ae aear aelin aglar aha aina alata alda alph alqua amar amarth ambar amon ampa anca ando anga anna annabon annon anor anto ar aran aranel aras arda arn asca ast asta astaldo athan avari band bar barad baran bein beleg ben bereth bragol brethil brith cabed cabor caer calma cam canad caran celeb cennan cirith condir cor craban crann cugu dad dae dagnir dagor del din dol dor doron draug duin dun ech edhel eithel elen emerwen en ened eneg ereb ereg erin ernil eruanna esgal esse estel falas falf faroth faun feir fenn fin forod fuin galad galen gannel gaur glawar glin glor gloss gond goth grond gurth gwaith gweth hal harad hareth harma hathel haudh heir heledir heleg hen henneth heru herven herves heryn him hir hiril hith hoth hwesta iaeth iant iaur idhrin im imlad ithil kemen laer lain lalaith lambe lanc lang lass laurina le lebed leben lenn lhach lhaw lim linnod lith loa lond lor lost loth luin lyg mae maeg maethor malina man megil meleth mellon menel mereth mesc min minas mith mor moth nai naith nan naneth nar narn nathron neder neled neleg nell nem nen neth nim ninn ninniach nogoth nor nu nuin nuquerna nwalme odog ohtar or orna orne orod orodben ost panas parma paur peich per perian pethron quesse raen ram rana ranc ras rath raw rhun riel ril rist roch rochben rochir rond ros ross ruin ruth salch sarn sein sereg sigil silme tad taer talagand talan tathar tavor tehta telu tengwa thalion thavron thoron tinc tol toloth torech tri tuilinn tumba tyuru ungol unque van vanwa wen wilwarin wing yanta"
)})
    },
    {
      name: "bitcoin",
      value: (function(){return(
"a altcoin aml and as asic ath bearish binance bitcoin bitfinex blockchain btfd bullish buterin cap casper consensys contract crypto cryptocurrency dapp decentralised distributed doge dump ecosystem eth ether etherdelta ethereum etherscan ethminer fiat finney fintech fomo foundation fud fungible future gas gdax geth hodl hodler hype ico immutable internet kyc ledger lightning lubin market mining moon nakamoto p2p paper parity platform poloniex pump ropsten satoshi scam service shard sharding shill shitcoin smart solidity szabo testnet tether token transaction txpool underbanked utxo virtual wei whale whitepaper yellow"
)})
    },
    {
      name: "gagnam",
      value: (function(){return(
"a ba baby ban bo boda bol bu bul cho chul da de do dwe eh ga gak gal gam gan gangnam gi gin go gu gum gun gyo han hey in ja je ji jo jom jon jong jyo ka ke know ko kum lady man mi mo mol mu myon na ne neun ngan ngi no nol nom nun o one op oppan pi pu pumrang re reum ro ron rul rum ryot sa saying sexy shi shik shim shot style su ta te ten to ton tu tung twi ul un wan wen what wi wo ya ye yo you yu yuk"
)})
    }
  ]
};

const m2 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "slider",
      inputs: ["input"],
      value: (function(input){return(
function slider(config = {}) {
  let {
    min = 0, max = 1, value = (max + min) / 2, step = "any", precision = 2,
    title, description, getValue, format, display, submit,
  } = typeof config === "number" ? {value: config} : config;
  precision = Math.pow(10, precision);
  if (!getValue) getValue = input => Math.round(input.valueAsNumber * precision) / precision;
  return input({
    type: "range", title, description, submit, format, display,
    attributes: {min, max, step, value},
    getValue
  });
}
)})
    },
    {
      name: "text",
      inputs: ["input"],
      value: (function(input){return(
function text(config = {}) {
  const {
    value,
    title,
    description,
    autocomplete = "off",
    maxlength,
    minlength,
    pattern,
    placeholder,
    size,
    submit
  } = typeof config === "string" ? {value: config} : config;
  const form = input({
    type: "text",
    title,
    description,
    submit,
    attributes: {
      value,
      autocomplete,
      maxlength,
      minlength,
      pattern,
      placeholder,
      size
    }
  });
  form.output.remove();
  form.input.style.fontSize = "1em";
  return form;
}
)})
    },
    {
      name: "checkbox",
      inputs: ["input","html"],
      value: (function(input,html){return(
function checkbox(config = {}) {
  let {
    value: formValue, title, description, submit, options
  } = Array.isArray(config) ? {options: config} : config;
  options = options.map(
    o => (typeof o === "string" ? { value: o, label: o } : o)
  );
  const form = input({
    type: "checkbox",
    title,
    description,
    submit,
    getValue: input => {
      if (input.length)
        return Array.prototype.filter
          .call(input, i => i.checked)
          .map(i => i.value);
      return input.checked ? input.value : false;
    },
    form: html`
      <form>
        ${options.map(({ value, label }) => {
          const input = html`<input type=checkbox name=input ${
            (formValue || []).indexOf(value) > -1 ? "checked" : ""
          } style="vertical-align: baseline;" />`;
          input.setAttribute("value", value);
          const tag = html`<label style="display: inline-block; margin: 5px 10px 3px 0; font-size: 0.85em;">
           ${input}
           ${label}
          </label>`;
          return tag;
        })}
      </form>
    `
  });
  form.output.remove();
  return form;
}
)})
    },
    {
      name: "input",
      inputs: ["html","d3format"],
      value: (function(html,d3format){return(
function input(config) {
  let {
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  const wrapper = html`<div></div>`;
  if (!form)
    form = html`<form>
	<input name=input type=${type} />
  </form>`;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) form.input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );
  if (format) format = typeof format === "function" ? format : d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
      ? "onclick"
      : type == "checkbox" || type == "radio"
      ? "onchange"
      : "oninput";
    form[verb] = e => {
      e && e.preventDefault();
      const value = getValue ? getValue(form.input) : form.input.value;
      if (form.output) {
        const out = display ? display(value) : format ? format(value) : value;
        if (out instanceof window.Element) {
          while (form.output.hasChildNodes()) {
            form.output.removeChild(form.output.lastChild);
          }
          form.output.append(out);
        } else {
          form.output.value = out;
        }
      }
      form.value = value;
      if (verb !== "oninput")
        form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    };
    if (verb !== "oninput")
      wrapper.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
    form[verb]();
  }
  while (form.childNodes.length) {
    wrapper.appendChild(form.childNodes[0]);
  }
  form.append(wrapper);
  return form;
}
)})
    },
    {
      name: "d3format",
      inputs: ["require"],
      value: (function(require){return(
require("d3-format@1")
)})
    }
  ]
};

const notebook = {
  id: "d145f7d6b6821fa9@868",
  modules: [m0,m1,m2]
};

export default notebook;
