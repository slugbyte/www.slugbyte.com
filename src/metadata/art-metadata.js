import socialImageURL from '../lib/social-image-url.js' 

export default {
  title: "Art",
  url: "/art",
  description: "Slugbyte's art portfolio.",
  published: true,
  timestamp: "2019-11-25T15:30:32.936Z",
  twitterCard: socialImageURL(require('../asset/image/card/twitter/art-card-twitter.png')),
  facebookCard: socialImageURL(require('../asset/image/card/facebook/art-card-facebook.png')),
  keywords: [
    "art",
    "portfolio",
    "drawing",
    "illustration",
    "draw",
    "sketch"
  ]
}
