// https://observablehq.com/@jashkenas/lorem-ipsum@244
import define1 from './inputs.js'

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Lorem Ipsum

*Ah, Lorem Ipsum. Loathed by many, loved by few. Always lurking around the corner in any design context, and always useful in a pinch.*

<small>Based on: [lorem-ipsum.js](https://www.npmjs.com/package/lorem-ipsum)</small>`
)});
  main.variable(observer("viewof using")).define("viewof using", ["select"], function(select){return(
select({options: ["Lorem Ipsum", "Hipster Ipsum", "Bro Ipsum", "Vegan Ipsum", "Elvish Ipsum", "Crypto Ipsum", "Gagnam Ipsum"], title: "Using?"})
)});
  main.variable(observer("using")).define("using", ["Generators", "viewof using"], (G, _) => G.input(_));
  main.variable(observer("viewof count")).define("viewof count", ["slider"], function(slider){return(
slider({min: 1, max: 50, step: 1, value: 3, title: "Number of..."})
)});
  main.variable(observer("count")).define("count", ["Generators", "viewof count"], (G, _) => G.input(_));
  main.variable(observer("viewof units")).define("viewof units", ["select"], function(select){return(
select({options: ["paragraphs", "words"]})
)});
  main.variable(observer("units")).define("units", ["Generators", "viewof units"], (G, _) => G.input(_));
  main.variable(observer("viewof sentenceLowerBound")).define("viewof sentenceLowerBound", ["slider"], function(slider){return(
slider({min: 1, max: 50, value: 5, step: 1, title: "Minimum words per sentence"})
)});
  main.variable(observer("sentenceLowerBound")).define("sentenceLowerBound", ["Generators", "viewof sentenceLowerBound"], (G, _) => G.input(_));
  main.variable(observer("viewof sentenceUpperBound")).define("viewof sentenceUpperBound", ["slider","sentenceLowerBound"], function(slider,sentenceLowerBound){return(
slider({min: sentenceLowerBound, max: 50, value: 15, step: 1, title: "Maximum words per sentence"})
)});
  main.variable(observer("sentenceUpperBound")).define("sentenceUpperBound", ["Generators", "viewof sentenceUpperBound"], (G, _) => G.input(_));
  main.variable(observer("viewof paragraphLowerBound")).define("viewof paragraphLowerBound", ["slider"], function(slider){return(
slider({min: 1, max: 50, value: 3, step: 1, title: "Minimum sentences per paragraph"})
)});
  main.variable(observer("paragraphLowerBound")).define("paragraphLowerBound", ["Generators", "viewof paragraphLowerBound"], (G, _) => G.input(_));
  main.variable(observer("viewof paragraphUpperBound")).define("viewof paragraphUpperBound", ["slider","paragraphLowerBound"], function(slider,paragraphLowerBound){return(
slider({min: paragraphLowerBound, max: 50, value: 7, step: 1, title: "Maximum sentences per paragraph"})
)});
  main.variable(observer("paragraphUpperBound")).define("paragraphUpperBound", ["Generators", "viewof paragraphUpperBound"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","md","lipsum","count","units","sentenceLowerBound","sentenceUpperBound","paragraphLowerBound","paragraphUpperBound","words"], function(html,md,lipsum,count,units,sentenceLowerBound,sentenceUpperBound,paragraphLowerBound,paragraphUpperBound,words){return(
html`<div class="lorem-ipsum">${
  md`${lipsum({
    count, units, sentenceLowerBound, sentenceUpperBound, paragraphLowerBound, paragraphUpperBound, words})
  }`
}</div>`
)});
  main.variable(observer("viewof custom")).define("viewof custom", ["textarea"], function(textarea){return(
textarea({title: "Or, use your own dictionary...", rows: 5})
)});
  main.variable(observer("custom")).define("custom", ["Generators", "viewof custom"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","loremipsum"], function(md,loremipsum){return(
md`<br>
#### Usage from another notebook

This library can be imported and reused in other notebooks.

\`\`\`js
import {loremipsum} from "@jashkenas/lorem-ipsum"
\`\`\`

... and then called with any desired options to produce the ipsum you want:

\`\`\`js
loremipsum({
  count: 3,                    // How many sentences or paragraphs?
  units: "paragraphs",         // "paragraphs" or "sentences"
  using: "Lorem Ipsum",        // "Lorem", "Hipster", "Bro", "Vegan", "Elvish", "Bitcoin" or "Gagnam" + " Ipsum"
  minWordsPerSentence: 5,
  maxWordsPerSentence: 15,
  minSentencesPerParagraph: 3,
  maxSentencesPerParagraph: 7,
  words: null                  // Pass in your own array of words if you want to make a custom ipsum.
})
\`\`\`

For example:

\`\`\`js
loremipsum({using: "Bro Ipsum", count: 1})
\`\`\`

Returns:

\`\`\`
"${loremipsum({using: "Bro Ipsum", count: 1})}"
\`\`\`
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<hr>`
)});
  main.variable(observer("loremipsum")).define("loremipsum", ["dictionaries","lipsum"], function(dictionaries,lipsum){return(
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
)});
  main.variable(observer("words")).define("words", ["custom","unique","dictionaries","using"], function(custom,unique,dictionaries,using){return(
custom ? unique(custom) : dictionaries[using]
)});
  main.variable(observer("lipsum")).define("lipsum", ["require"], function(require){return(
require('https://bundle.run/lorem-ipsum@1.0.6')
)});
  const child1 = runtime.module(define1);
  main.import("select", child1);
  main.import("slider", child1);
  main.import("textarea", child1);
  main.variable(observer("css")).define("css", ["html"], function(html){return(
html`<pre>css = ...</pre><style>
form select {
  font-size: 16px;
  margin-top: 5px;
}
.lorem-ipsum {
  border: 1px solid #f4f4f4;
  border-left: 0; border-right: 0;
}
</style>`
)});
  main.variable(observer("split")).define("split", function(){return(
function split(text) {
  return text.split(/\s+/);
}
)});
  main.variable(observer("unique")).define("unique", function(){return(
function unique(text) {
  return Array.from((new Set(text.toLowerCase().replace(/[^\s\w]/g, ' ').split(/\s+/))).values()).sort()
}
)});
  main.variable(observer("dictionaries")).define("dictionaries", ["split","hipster","bro","vegan","elvish","bitcoin","gagnam"], function(split,hipster,bro,vegan,elvish,bitcoin,gagnam){return(
{
 "Hipster Ipsum": split(hipster), 
 "Bro Ipsum": split(bro), 
 "Vegan Ipsum": split(vegan), 
 "Elvish Ipsum": split(elvish), 
 "Crypto Ipsum": split(bitcoin), 
 "Gagnam Ipsum": split(gagnam) 
}
)});
  main.variable(observer("hipster")).define("hipster", function(){return(
"+1 3 8-bit a aesthetic american anderson apparel art artisan austin authentic bag banh banksy batch beard beer before belly bespoke bicycle biodiesel bird blog booth brooklyn brunch bushwick butcher cardigan carles chambray chillwave chips cleanse cliche coffee cosby craft cray cred denim direct diy dreamcatcher echo ennui ethical ethnic etsy fanny fap farm-to-table fingerstache fixie flexitarian food forage four freegan fund future gastropub gentrify gluten-free godard haven't heard hella helvetica high hoodie iphone irony it jean kale keffiyeh keytar kogi leggings letterpress level life lo-fi locavore loko lomo marfa master mcsweeney's messenger mi mixtape mlkshk moon mumblecore mustache narwhal next occupy odd of on organic out pack park party pbr photo pickled pinterest pitchfork polaroid pop-up pork portland post-ironic pour-over probably put quinoa raw readymade retro richardson rights salvia sartorial scenester seitan selvage semiotics shoreditch shorts single-origin skateboard small sold squid sriracha street stumptown sustainable swag sweater synth tattooed terry them they thundercats tofu trade truck truffaut trust tumblr twee typewriter umami vegan vhs vice vinyl viral wayfarers wes whatever williamsburg wolf you yr"
)});
  main.variable(observer("bro")).define("bro", function(){return(
"a abs awesome band bar beat beer benchpress bicep bomb bro brodown bromo bromosexual brosie brosky brotally bruh bummer burberry cheah chicks chillax collar colored crib croakies cruisin' crushed curls dave deep designer digits dope double dude dumbbells epic facemelt fistpump football fratastic frathard fresh frisbee game glowsticks got gtl hairflip hella hit hookup i i'd is it jager just keg kicks killer know, lacoste ladies lame lasers lax let's light lotion mad matthews mcgotes me metbrosexual mixer natty neck neckbro noise noxplode o'donnell party polo pong popped pre-workout protein pumped pushups quads ragefest rageout rager rando raybans real redbull right salmon searsucker sesh shades shorts shots shredded sickness solid sorority spank sperries squash suburban sugarfree suhweet sunglasses sup super sweetness take talking tan tanning that this throw tight tony totally totes ultimate up ups v visor vodka was yolo"
)});
  main.variable(observer("vegan")).define("vegan", function(){return(
"ahipa aka american arracacha arrowhead artichoke arugula asparagus aubergine avocado azuki bamboo bean beet beetroot bell bitter bitterleaf black-eyed bok bologi brinjal broadleaf broccoli brussels burdock cabbage camas canna cardoon carrot cassava catsear cauliflower celeriac celery celtuce ceylon chard chaya chestnut chickpea chickweed chicory chinese choy chrysanthemum collard common corn courgette cress cucumber daikon dandelion dolichos drumstick earthnut eggplant elephant endive ensete epazote fat fava fennel fiddlehead florence fluted foot garbanzo garden garlic gherkin ginger gobo golden good gourd gram greater green greens groundnut guar gumbo hamburg hen henry horse horseradish indian jerusalem kai-lan kale king kohlrabi komatsuna kuka kumara kurrat lagos lamb's land leaves leek lentil leone lettuce lima lizard's lotus maize mallow manioc melokhia melon miner's mizuna mooli moth mung mustard napa new nopal okra onion or orache pak paracress parsley parsnip pea peanut pepper pigeon pignut plantain plectranthus polk potato prairie prussian pumpkin purslane rabe radicchio radish ricebean rocket root runner rutabaga salad salsify samphire scallion scorzonera sea shallot shoot sierra skirret soko sorrel soybean spinach spring sprout sprouts squash summer swede sweet swiss tail taro tarwi tatsoi tepary ti tigernut tinda tomatillo tomato turnip ulluco urad velvet water watercress welsh west wild winged winter yam yardlong yarrow zealand zucchini"
)});
  main.variable(observer("elvish")).define("elvish", function(){return(
"enna ada adab adan adel aduial ae aear aelin aglar aha aina alata alda alph alqua amar amarth ambar amon ampa anca ando anga anna annabon annon anor anto ar aran aranel aras arda arn asca ast asta astaldo athan avari band bar barad baran bein beleg ben bereth bragol brethil brith cabed cabor caer calma cam canad caran celeb cennan cirith condir cor craban crann cugu dad dae dagnir dagor del din dol dor doron draug duin dun ech edhel eithel elen emerwen en ened eneg ereb ereg erin ernil eruanna esgal esse estel falas falf faroth faun feir fenn fin forod fuin galad galen gannel gaur glawar glin glor gloss gond goth grond gurth gwaith gweth hal harad hareth harma hathel haudh heir heledir heleg hen henneth heru herven herves heryn him hir hiril hith hoth hwesta iaeth iant iaur idhrin im imlad ithil kemen laer lain lalaith lambe lanc lang lass laurina le lebed leben lenn lhach lhaw lim linnod lith loa lond lor lost loth luin lyg mae maeg maethor malina man megil meleth mellon menel mereth mesc min minas mith mor moth nai naith nan naneth nar narn nathron neder neled neleg nell nem nen neth nim ninn ninniach nogoth nor nu nuin nuquerna nwalme odog ohtar or orna orne orod orodben ost panas parma paur peich per perian pethron quesse raen ram rana ranc ras rath raw rhun riel ril rist roch rochben rochir rond ros ross ruin ruth salch sarn sein sereg sigil silme tad taer talagand talan tathar tavor tehta telu tengwa thalion thavron thoron tinc tol toloth torech tri tuilinn tumba tyuru ungol unque van vanwa wen wilwarin wing yanta"
)});
  main.variable(observer("bitcoin")).define("bitcoin", function(){return(
"a altcoin aml and as asic ath bearish binance bitcoin bitfinex blockchain btfd bullish buterin cap casper consensys contract crypto cryptocurrency dapp decentralised distributed doge dump ecosystem eth ether etherdelta ethereum etherscan ethminer fiat finney fintech fomo foundation fud fungible future gas gdax geth hodl hodler hype ico immutable internet kyc ledger lightning lubin market mining moon nakamoto p2p paper parity platform poloniex pump ropsten satoshi scam service shard sharding shill shitcoin smart solidity szabo testnet tether token transaction txpool underbanked utxo virtual wei whale whitepaper yellow"
)});
  main.variable(observer("gagnam")).define("gagnam", function(){return(
"a ba baby ban bo boda bol bu bul cho chul da de do dwe eh ga gak gal gam gan gangnam gi gin go gu gum gun gyo han hey in ja je ji jo jom jon jong jyo ka ke know ko kum lady man mi mo mol mu myon na ne neun ngan ngi no nol nom nun o one op oppan pi pu pumrang re reum ro ron rul rum ryot sa saying sexy shi shik shim shot style su ta te ten to ton tu tung twi ul un wan wen what wi wo ya ye yo you yu yuk"
)});
  return main;
}
