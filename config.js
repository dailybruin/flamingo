// export const Config = {apiUrl: 'http://165.227.25.233'}
export const Config = {
  apiUrl: "https://wp.dailybruin.com",
  articleCardFields: ""
};

/* Each of these tag ids correspond to the tag on Wordpress */
export const TAG_IDS = {
  aTAGID: 4847,   // Db-story-a
  bTAGID: 4850,   // Db-story-b
  c1TAGID: 4849,  // etc
  c2TAGID: 4851,
  d1TAGID: 4862,
  d2TAGID: 4863,
  gTAGID: 27530,
  m1TAGID: 4854,
  f1TAGID: 22896,
  f2TAGID: 22897,
  iTAGID: 27532,
  jTAGID: 27534,
  kTAGID: 27535,
  lTAGID: 27536,
  hTAGID: 27531
};

/* The News Quiz: the WordPress tag that marks a post as a quiz, and the app
   that plays it (embedded at /category/games/quiz). NEXT_PUBLIC_NEWS_QUIZ_URL
   points the embed at a local copy of the quiz for development. */
export const NEWS_QUIZ = {
  tagId: 28306,
  url: process.env.NEXT_PUBLIC_NEWS_QUIZ_URL || "https://quiz.dailybruin.com"
};

/* Each of these categories has a corresponding WordPress ID */
export const CAT_IDS = {
  quadCATID: 12848,
  newsCATID: 1424,
  enterpriseCATID: 21602,
  opinionCATID: 1460,
  artsCATID: 1454,
  sportsCATID: 1431
}

