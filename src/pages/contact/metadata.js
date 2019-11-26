import socialImageURL from '../../lib/social-image-url.js' 

export default {
  title: "Contact",
  url: "/contact",
  description: "Slugbyte's contact information.",
  published: true,
  timestamp: "2019-11-25T15:32:20.476Z",
  twitterCard: socialImageURL(require('../../asset/image/card/twitter/contact-card-twitter.png')), 
  facebookCard: socialImageURL(require('../../asset/image/card/facebook/contact-card-facebook.png')),
  keywords: [
    "contact",
    "email",
    "twitter",
    "github",
    "linkedin",
    "instagram"
  ]
}
