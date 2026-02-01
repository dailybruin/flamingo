import WestwordleLogo from "../../../components/GamesCard/WestWordLogoCropped.png";
import WhackaBruinLogo from "../../../components/GamesCard/WhackABruinLogo.png";
import CrosswordLogo from "../../../components/GamesCard/CrosswordLogo.png";
import MiniCrosswordLogo from "../../../components/GamesCard/MiniCrosswordLogo.png";

/**
 * Checks if a person made games. If they did, returns info
 * about the game(s) they made.
 * @param {str} nicename The person's nicename (i.e the name in their URL)
 * @returns Array of JSON of info about each game created
 */
export function userMadeGames(nicename) {
    if (!nicename) return [];

    var games_created = [];
    for (const game of games) {
        for (const author of game['authors']) {
            if (author['user_nicename'] == nicename)
            {
                games_created.push(game);
            }
        }
    }

    return games_created;
}

const games = [
  {
    headline: "Mini Crossword",
    href: "/category/games/mini-crossword",
    as: "/category/games/mini-crossword",
    link: "/category/games/mini-crossword",
    image: MiniCrosswordLogo,
    excerpt: "Solve today's mini crossword!",
    authors: [
      { display_name: "Narek Germirlian", user_nicename: "NarekGermirlian" }
    ]
  },
  {
    headline: "Crossword",
    href: "/category/games/crossword",
    as: "/category/games/crossword",
    link: "/category/games/crossword",
    image: CrosswordLogo,
    excerpt: "Solve today's crossword puzzle!",
    authors: [
      { display_name: "Narek Germirlian", user_nicename: "NarekGermirlian" }
    ]
  },
  {
    headline: "Whack-a-Mole",
    href: "/category/games/whack-a-bruin",
    as: "/category/games/whack-a-bruin",
    link: "/category/games/whack-a-bruin",
    image: WhackaBruinLogo,
    excerpt: "Whack the Bruins and beat your high score!",
    authors: [
      { display_name: "Johnny Zheng", user_nicename: "JohnnyZheng" },
      { display_name: "Hillary Nguyen", user_nicename: "HNguyen" },
      { display_name: "Aileen Chen", user_nicename: "AChen" }
    ]
  },
  {
    headline: "Westwordle",
    href: "/category/games/westwordle",
    as: "/category/games/westwordle",
    link: "/category/games/westwordle",
    image: WestwordleLogo,
    excerpt: "Guess the Daily Bruin-themed word in 6 tries.",
    authors: [
      { display_name: "Daily Bruin Games Team", user_nicename: "" }
    ]
  }
];

export default games;
