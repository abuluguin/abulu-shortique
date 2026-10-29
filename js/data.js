/* =====================================================================
   ABULU SHORTIQUE  -  ALL OF YOUR EDITABLE CONTENT LIVES IN THIS FILE
   ---------------------------------------------------------------------
   You never need to touch index.html, style.css or app.js to update the
   website. Just edit the sections below, save, and upload this file to
   GitHub again.

   Sections in this file (use Ctrl+F / Cmd+F and search the name):
     1. SITE          -> name, tagline, social links, website address
     2. FOLLOWER_HISTORY -> the numbers behind the growth chart
     3. SHORTS        -> every video in the gallery
     4. CHARACTERS    -> Fan and Duck
     5. MILESTONES    -> follower milestones
     6. FAN_IDEAS     -> community ideas for future Shorts
     7. RELEASES      -> the "What's new" list
     8. TICKER        -> the scrolling headline strip

   RULES (very important, and easy):
     - Keep every comma and every quote mark exactly as in the examples.
     - Text goes inside "double quotes".
     - Numbers have NO quotes:  followers: 12
     - Dates are written like this:  "2026-10-29"  (year-month-day)
     - Copy one whole { ... }, block, paste it, and change the words.
   ===================================================================== */


/* ---------------------------------------------------------------------
   1. SITE
   --------------------------------------------------------------------- */
var SITE = {
  name: "ABULU Shortique",
  tagline: "Short. Funny. Unpredictable.",
  description: "ABULU Shortique is a comedy Shorts channel with 3D animated mini-stories starring Fan, a duck, and a lot of chaos.",

  // Your public website address. After GitHub Pages is on, it looks like:
  //   https://YOUR-GITHUB-USERNAME.github.io/abulu-shortique/
  // (Also change it in index.html, robots.txt and sitemap.xml - see README.)
  url: "https://YOUR-GITHUB-USERNAME.github.io/abulu-shortique/",

  // Where visitors can follow you. Leave a link as "" to hide its button.
  links: {
    whatsappChannel: "https://whatsapp.com/channel/0029VbE7cQZDZ4LZW07m0F1a",
    youtube: "",
    tiktok: "",
    instagram: "",
    facebook: ""
  },

  // The date the channel started (used by Channel Stats).
  launchDate: "2026-10-25",

  // How the "Suggest an idea" box sends ideas to you (no server needed).
  // Fill in ONE or BOTH. Leave "" to switch that option off.
  //   githubRepo: "your-username/abulu-shortique"  -> opens a pre-filled
  //               GitHub issue (visitor needs a free GitHub account)
  //   email:      "you@example.com"                -> opens their email app
  ideaInbox: {
    githubRepo: "",
    email: ""
  },

  // Optional: type a number here to force the follower count shown on the
  // site. Leave as null to use the newest number in FOLLOWER_HISTORY.
  followersOverride: null
};


/* ---------------------------------------------------------------------
   2. FOLLOWER_HISTORY   (the growth chart)
   ---------------------------------------------------------------------
   To update the chart: add ONE new line at the bottom.
     { date: "2026-10-30", followers: 25 },
   You can add a time too (Malaysia time is +08:00):
     { date: "2026-10-30T21:00:00+08:00", followers: 25 },
   Oldest first, newest last. The newest line is your current followers.
   --------------------------------------------------------------------- */
var FOLLOWER_HISTORY = [
  { date: "2026-10-25T22:00:00+08:00", followers: 3 },
  { date: "2026-10-25T23:00:00+08:00", followers: 3 },
  { date: "2026-10-26T00:00:00+08:00", followers: 4 },
  { date: "2026-10-26T01:00:00+08:00", followers: 6 }
];


/* ---------------------------------------------------------------------
   3. SHORTS   (the gallery)
   ---------------------------------------------------------------------
   TO ADD A NEW SHORT:
     1. Put the thumbnail picture in   images/thumbs/   (JPG, 9:16 tall)
     2. Put the video file in          videos/           (MP4)  - optional
     3. Copy the LAST block below, paste it at the very bottom (add a
        comma after the block above it), and change the words.

   Fields:
     id          short code, lowercase, no spaces (must be unique)
     title       the name of the Short
     description one or two sentences
     thumbnail   path to the picture
     video       path to the MP4 on this website, or "" if you have none
     watchUrl    link to the Short on YouTube / TikTok etc., or ""
                 (the Watch button plays "video" if it exists, otherwise
                  it opens "watchUrl" in a new tab)
     views       number of views, e.g. 1250    (use null if unknown)
     date        upload date "2026-10-29"      (use null if unknown)
     duration    "0:30"
     tags        list of: "fan", "duck", "milestone", "special"
     milestone   small badge text such as "1 follower", or ""
   Newest Shorts are shown first automatically.
   --------------------------------------------------------------------- */
var SHORTS = [
  {
    id: "japan-fan-level-99",
    title: "Japan Fan Level 99",
    description: "The most dedicated fan in the world. The most confused fan in the world. Often the same fan.",
    thumbnail: "images/thumbs/japan-fan-level-99.jpg",
    video: "videos/japan-fan-level-99.mp4",
    watchUrl: "",
    views: null, date: null, duration: "0:42",
    tags: ["fan"], milestone: ""
  },
  {
    id: "one-more-game",
    title: "One More Game",
    description: "Just one more game. That is what he said four games ago.",
    thumbnail: "images/thumbs/one-more-game.jpg",
    video: "videos/one-more-game.mp4",
    watchUrl: "",
    views: null, date: null, duration: "0:30",
    tags: ["fan"], milestone: ""
  },
  {
    id: "the-wifi",
    title: "The WiFi",
    description: "A tense, deeply personal story about one bar of signal.",
    thumbnail: "images/thumbs/the-wifi.jpg",
    video: "videos/the-wifi.mp4",
    watchUrl: "",
    views: null, date: null, duration: "0:30",
    tags: ["fan"], milestone: ""
  },
  {
    id: "we-got-1-follower",
    title: "We Got 1 Follower",
    description: "The first follower arrives. The channel reacts the only way it knows how: way too hard.",
    thumbnail: "images/thumbs/we-got-1-follower.jpg",
    video: "videos/we-got-1-follower.mp4",
    watchUrl: "",
    views: null, date: null, duration: "0:28",
    tags: ["milestone"], milestone: "1 follower"
  },
  {
    id: "we-got-2-followers",
    title: "We Got 2 Followers",
    description: "Double the followers. Quadruple the chaos.",
    thumbnail: "images/thumbs/we-got-2-followers.jpg",
    video: "videos/we-got-2-followers.mp4",
    watchUrl: "",
    views: null, date: null, duration: "0:28",
    tags: ["milestone"], milestone: "2 followers"
  },
  {
    id: "we-hit-1000-followers",
    title: "We Hit 1,000 Followers?!",
    description: "A celebration for 1,000 followers. The actual number was 3. The party did not care.",
    thumbnail: "images/thumbs/we-hit-1000-followers.jpg",
    video: "videos/we-hit-1000-followers.mp4",
    watchUrl: "",
    views: null, date: null, duration: "0:30",
    tags: ["milestone"], milestone: "3 followers (not 1,000)"
  },
  {
    id: "the-website",
    title: "Have You Seen The Website?!",
    description: "The official ad for the official website. Yes, you are on it right now.",
    thumbnail: "images/thumbs/the-website.jpg",
    video: "videos/the-website.mp4",
    watchUrl: "",
    views: null, date: "2026-10-26", duration: "0:30",
    tags: ["special"], milestone: ""
  },
  {
    id: "the-button",
    title: "The Button",
    description: "A giant red button. A very clear warning. What could possibly go wrong?",
    thumbnail: "images/thumbs/the-button.jpg",
    video: "videos/the-button.mp4",
    watchUrl: "",
    views: null, date: "2026-10-26", duration: "0:30",
    tags: ["duck"], milestone: ""
  },
  {
    id: "the-npc",
    title: "The NPC",
    description: "A man notices something off about the town. Then the world glitches. Then, a duck.",
    thumbnail: "images/thumbs/the-npc.jpg",
    video: "videos/the-npc.mp4",
    watchUrl: "",
    views: null, date: "2026-10-27", duration: "0:30",
    tags: ["duck"], milestone: ""
  },
  {
    id: "duck-selfie",
    title: "Duck Selfie",
    description: "A duck finds a phone. Takes a selfie. Posts it. One billion likes. The duck stays calm.",
    thumbnail: "images/thumbs/duck-selfie.jpg",
    video: "videos/duck-selfie.mp4",
    watchUrl: "",
    views: null, date: "2026-10-27", duration: "0:30",
    tags: ["duck"], milestone: ""
  },
  {
    id: "gundam",
    title: "Gundam Is Easy",
    description: "\"This? Easy.\" One year later: still not easy.",
    thumbnail: "images/thumbs/gundam.jpg",
    video: "videos/gundam.mp4",
    watchUrl: "",
    views: null, date: "2026-10-28", duration: "0:30",
    tags: ["fan"], milestone: ""
  },
  {
    id: "duck-restaurant",
    title: "The Duck Restaurant",
    description: "A duck walks into a fancy restaurant. Everything on the menu is duck.",
    thumbnail: "images/thumbs/duck-restaurant.jpg",
    video: "videos/duck-restaurant.mp4",
    watchUrl: "",
    views: null, date: "2026-10-28", duration: "0:26",
    tags: ["duck"], milestone: ""
  },
  {
    id: "fan-adopts-a-duck",
    title: "Fan Adopts a Duck",
    description: "Fan just wanted to wash his car. 1,987 bowls of cereal later, he has a duck.",
    thumbnail: "images/thumbs/fan-adopts-a-duck.jpg",
    video: "videos/fan-adopts-a-duck.mp4",
    watchUrl: "",
    views: null, date: "2026-10-29", duration: "0:50",
    tags: ["fan", "duck"], milestone: ""
  }
];


/* ---------------------------------------------------------------------
   4. CHARACTERS
   --------------------------------------------------------------------- */
var CHARACTERS = [
  {
    id: "fan",
    name: "Fan",
    role: "The main character",
    emoji: "🎌",
    image: "images/fan.jpg",
    imageAlt: "Fan, the main character of ABULU Shortique, smiling with a red headband",
    color: "pink",
    tagline: "Optimistic. Overconfident. Somehow still standing.",
    bio: "Fan is the heart of ABULU Shortique. He wears a red headband, believes every problem is \"easy\", and keeps ending up in situations nobody planned. He means well. Usually.",
    traits: ["Overconfident", "Kind-hearted", "Easily distracted", "Cereal-adjacent"],
    catchphrase: "\"This? Easy.\"",
    appearsIn: ["fan-adopts-a-duck", "gundam", "japan-fan-level-99"]
  },
  {
    id: "duck",
    name: "Duck",
    role: "The recurring chaotic character",
    emoji: "🦆",
    image: "images/duck.jpg",
    imageAlt: "Duck, the recurring chaotic character of ABULU Shortique, looking suspicious",
    color: "gold",
    tagline: "Calm. Hungry. Appears at the worst possible moment.",
    bio: "Duck turns up when you least expect it and leaves the situation worse (and funnier) than before. Duck does not explain. Duck does not apologise. Duck might just want cereal.",
    traits: ["Chaotic", "Unbothered", "Always hungry", "Suspiciously famous"],
    catchphrase: "*quack*",
    appearsIn: ["fan-adopts-a-duck", "duck-restaurant", "duck-selfie", "the-npc", "the-button"]
  }
];


/* ---------------------------------------------------------------------
   5. MILESTONES
   ---------------------------------------------------------------------
   followers  the number needed to unlock it
   title      the name of the milestone
   note       a short funny line
   shortId    (optional) the id of the Short that celebrates it, or ""
   Add as many as you like. The order does not matter.
   --------------------------------------------------------------------- */
var MILESTONES = [
  { followers: 1,        title: "First Follower",            note: "One person pressed follow. The channel has not recovered.", shortId: "we-got-1-follower" },
  { followers: 2,        title: "Double Trouble",            note: "Twice the audience. Four times the chaos.",                shortId: "we-got-2-followers" },
  { followers: 3,        title: "The Fake 1,000 Celebration", note: "A full 1,000-follower party for exactly 3 followers. No regrets.", shortId: "we-hit-1000-followers" },
  { followers: 5,        title: "High Five",                 note: "Five followers. That is basically a crowd.",               shortId: "" },
  { followers: 10,       title: "Double Digits",             note: "Two digits. Unconfirmed reports of a bigger party.",       shortId: "" },
  { followers: 50,       title: "The Fifty Club",            note: "Fifty people chose chaos on purpose.",                     shortId: "" },
  { followers: 100,      title: "Triple Digits",             note: "One hundred followers. Fan is already planning snacks.",   shortId: "" },
  { followers: 500,      title: "Half a Thousand",           note: "The duck has demanded a larger bowl.",                     shortId: "" },
  { followers: 1000,     title: "The Real 1,000",            note: "The one we pretended to hit. Now it is real.",             shortId: "" },
  { followers: 5000,     title: "Five Thousand",             note: "Neighbours are starting to recognise the duck.",           shortId: "" },
  { followers: 10000,    title: "Ten Thousand",              note: "Officially too big to be called a hobby.",                 shortId: "" },
  { followers: 100000,   title: "One Hundred Thousand",      note: "A new level of unpredictable.",                            shortId: "" },
  { followers: 1000000,  title: "One Million",               note: "The duck will make a statement.",                          shortId: "" }
];


/* ---------------------------------------------------------------------
   6. FAN_IDEAS   (community ideas for future Shorts)
   ---------------------------------------------------------------------
   TO ADD AN IDEA: copy one block, paste it at the bottom, change it.
     idea     the idea itself
     from     who suggested it (a first name or nickname)
     status   "idea"  (just suggested)
              "planned"  (you will make it)
              "making"   (in production)
              "made"     (finished!)   -> also set shortId to the Short's id
     shortId  the id of the finished Short, or ""
   --------------------------------------------------------------------- */
var FAN_IDEAS = [
  { idea: "Duck tries to order food at a drive-through.",              from: "Example idea",      status: "idea",    shortId: "" },
  { idea: "Fan and Duck get stuck in a lift together.",                from: "Example idea",      status: "planned", shortId: "" },
  { idea: "Duck becomes the boss of Fan's office for one day.",        from: "Example idea",      status: "idea",    shortId: "" },
  { idea: "Fan adopts a duck.",                                        from: "Community favourite", status: "made",  shortId: "fan-adopts-a-duck" }
];


/* ---------------------------------------------------------------------
   7. RELEASES   (the "What's new" list - newest first)
   --------------------------------------------------------------------- */
var RELEASES = [
  { version: "2.0", date: "29 Oct 2026", title: "The website goes public",
    items: [
      "Brand new design that works on phones, tablets and computers",
      "New sections: Characters, Milestones and Channel Stats",
      "Short #13 is up: Fan Adopts a Duck"
    ] },
  { version: "1.6", date: "28 Oct 2026", title: "Short #12: The Duck Restaurant",
    items: ["Short #12 is up: The Duck Restaurant. He survived the menu."] },
  { version: "1.5", date: "28 Oct 2026", title: "Short #11: Gundam Is Easy",
    items: ["Short #11 is up: Gundam Is Easy. He will finish it tomorrow."] },
  { version: "1.4", date: "27 Oct 2026", title: "Short #10: Duck Selfie",
    items: ["Short #10 is up: Duck Selfie. One billion likes. Zero reaction."] },
  { version: "1.3", date: "27 Oct 2026", title: "Short #9: The NPC",
    items: ["Short #9 is up: The NPC. Nice weather today."] },
  { version: "1.2", date: "26 Oct 2026", title: "Short #8: The Button",
    items: ["Short #8 is up: The Button. Do not press it. We pressed it."] },
  { version: "1.0", date: "25 Oct 2026", title: "The website is born",
    items: ["Follower counter and growth chart", "Shorts you can watch right here", "Fan Ideas, milestones and a status board"] }
];


/* ---------------------------------------------------------------------
   8. TICKER   (the scrolling headlines - add or remove any line)
   --------------------------------------------------------------------- */
var TICKER = [
  "Short #13: 1,987 bowls of cereal later, the car is still covered in soap",
  "Short #13: Fan does not even like cereal. He adopted the duck anyway",
  "Short #12: every dish on the menu was duck. Every single one",
  "Short #11: the model kit remains 0.1% finished",
  "Short #10: a duck got 1,000,000,000 likes and blinked once",
  "Short #9 also contains a duck. We still have no comment",
  "Analysts call 6 followers 'a lot'",
  "Next stop: 10 followers",
  "Fan ideas now accepted",
  "This ticker is not legally a news organization"
];
