import socialImageUrl from '../lib/social-image-url.js'

export default {
  title: "404 Not Found",
  url: "/404",
  description: "404 Not Found",
  published: true,
  timestamp: "2019-11-25T15:34:02.232Z",
  twitterCard: socialImageUrl(require('../asset/image/card/twitter/landing-card-twitter.png')),
  facebookCard: socialImageUrl(require('../asset/image/card/facebook/landing-card-facebook.png')),
  keywords: [
    "art",
    "audio",
    "programming",
    "blog",
    "portfolio"
  ]
}
