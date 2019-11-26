import socialImageUrl from '../lib/social-image-url.js'

export default {
  title: "www.slugbyte.com",
  url: "/",
  description: "Slugbyte's art, audio, and programming blog + portfolio.",
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
