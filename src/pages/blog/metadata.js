import socialImageURL from '../../lib/social-image-url.js' 

export default {
  title: "Blog",
  url: "/blog",
  description: "Slugbyte's blog about art, audio, and programming",
  published: true,
  timestamp: "2019-11-16T17:46:32.828Z",
  twitterCard: socialImageURL(require('../../asset/image/card/twitter/blog-card-twitter.png')),
  facebookCard: socialImageURL(require('../../asset/image/card/facebook/blog-card-facebook.png')),
  keywords: [
    "blog",
    "programming",
    "art",
    "code",
    "tutorial",
    "music",
    "audio"
  ]
}
