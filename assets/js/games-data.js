const GAMES_DATA = [
  {
    "name": "Fancade",
    "link": "https://play.fancade.com",
    "image": "/assets/media/icon/fancade.jpg",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Amazon Luna",
    "link": "https://luna.amazon.com/",
    "image": "/assets/media/icons/amazon-luna.webp",
    "categories": [
      "all"
    ],
    "blank": "true"
  },
  {
    "name": "Gartic Phone",
    "link": "https://garticphone.com",
    "image": "/assets/media/icons/garticphone.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Newgrounds",
    "link": "https://newgrounds.com/",
    "image": "/assets/media/icons/newgrounds.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Pranx",
    "link": "https://pranx.com/",
    "image": "/assets/media/icons/pranx.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Steam",
    "link": "https://steampowered.com/",
    "image": "/assets/media/icons/steam.webp",
    "categories": [
      "all"
    ],
    "say": "Steam can't actually be added because it's an app, not a website. This only lets you browse the Steam website, you can't actually play any games unless you use Geforce Now.",
    "partial": true
  },
  {
    "name": "Swordbattle.io",
    "link": "https://swordbattle.io/",
    "image": "/assets/media/icons/swordbattle.webp",
    "categories": [
      "all",
      "2d"
    ]
  },
  {
    "name": "Stabfish.io",
    "link": "https://stabfish.io/",
    "image": "/assets/media/icons/stabfish.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Dynast.io",
    "link": "https://dynast.io",
    "image": "/assets/media/icons/dynast-io.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Twisted Cooking Mama",
    "link": "https://twisted-cooking-mama.game-files.crazygames.com/ruffle/twisted-cooking-mama/1/twistedcookingmama.html?v=1.273",
    "image": "/assets/media/icons/twistedcookingmama.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Marbles Garden",
    "link": "https://www.coolmathgames.com/0-marbles-garden/play",
    "image": "/assets/media/icons/marblesgarden.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Fancy Pants Adventure",
    "link": "https://games.crazygames.com/en_US/fancy-pants-adventure-world/index.html?v=1.273",
    "image": "/assets/media/icons/fancypantsadventures.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Fancy Pants Adventure 2",
    "link": "https://games.crazygames.com/en_US/fancy-pants-adventure-world/index.html?v=1.273",
    "image": "/assets/media/icons/fancypantsadventures2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Rooftop Snipers 2",
    "link": "https://h5cdn.github.io/s6/rooftop-snipers-2/",
    "image": "/assets/media/icons/rooftopsnipers2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Stickman Archero Fight",
    "link": "https://html5.gamedistribution.com/rvvASMiM/3f4c166817ad4fd4b5b05d9adba22fcd/index.html",
    "image": "/assets/media/icons/stickman-archero-fight.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Earn to Die 2012 Part 2",
    "link": "https://games-online.io/game/EarnToDie/index.html",
    "image": "/assets/media/icons/earntodie2012part2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Lostgamer",
    "link": "https://lostgamer.io",
    "image": "/assets/media/icons/lostgamerio.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Thisissand",
    "link": "https://thisissand.com/",
    "image": "/assets/media/icons/thisissand.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "digdig.io",
    "link": "https://digdig.io/",
    "image": "/assets/media/icons/digdigio.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Big Tower Tiny Square",
    "link": "https://www.coolmathgames.com/0-big-tower-tiny-square/play",
    "image": "/assets/media/icons/bigtowertinysquare.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "The Impossible Quiz",
    "link": "https://the-impossible-quiz.game-files.crazygames.com/ruffle/theimpossiblequiz.html",
    "image": "/assets/media/icons/theimpossiblequiz.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Helix Jump",
    "link": "https://helix-jump.game-files.crazygames.com/helix-jump/1/index.html",
    "image": "/assets/media/icons/helixjump.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "skribbl",
    "link": "https://skribbl.io/",
    "image": "/assets/media/icons/skribblio.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Wings!",
    "link": "https://wings.io/",
    "image": "/assets/media/icons/wingsio.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Stomped.io",
    "link": "https://stomped.io",
    "image": "/assets/media/icons/stompedio.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Age of War",
    "link": "https://age-of-war.game-files.crazygames.com/ruffle/ageofwar.html",
    "image": "/assets/media/icons/ageofwar.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Brain Test",
    "link": "https://0322484b-7a58-4454-9667-f805afffded5.poki-gdn.com/2e6b68d3-0f43-4b84-9c14-ab59f94e566c/index.html?country=US&ccpaApplies=0&url_referrer=https%3A%2F%2Fpoki.com%2F&tag=pg-v3.132.1&site_id=3&iso_lang=en&poki_url=https%3A%2F%2Fpoki.com%2Fen%2Fg%2Fbrain-test-tricky-puzzles&gdhoist=yes&nonPersonalized=n&familyFriendly=n&categories=7%2C16%2C37%2C72%2C96%2C400%2C832%2C843%2C1140%2C1150%2C1159&special_condition=landing&game_id=0322484b-7a58-4454-9667-f805afffded5&game_version_id=2e6b68d3-0f43-4b84-9c14-ab59f94e566c",
    "image": "/assets/media/icons/braintest.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Gladihoppers",
    "link": "https://bonbang.github.io/store99/gladihoppers/index.html",
    "image": "/assets/media/icons/gladihoppers.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "3 Slices",
    "link": "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2F3-slices.xml",
    "image": "/assets/media/icons/3slices.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Buckshot Roulette",
    "link": "https://buckshotroulette.online/game/v11/",
    "image": "/assets/media/icons/buckshotroulette.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Starblast",
    "link": "https://starblast.io",
    "image": "/assets/media/icons/starblastio.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "CSGO Parkour",
    "link": "https://yandex.com/games/app/203069?flags={%22adv_sticky_banner_disabled%22:true}",
    "image": "/assets/media/icons/csgoparkour.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Parkour Block 3D",
    "link": "https://html5.gamedistribution.com/1461d40bb77f48e6be72489959a1ac04/",
    "image": "/assets/media/icons/parkourblock3d.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Jelly Mario",
    "link": "https://jellymar.io",
    "image": "/assets/media/icons/jellymario.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Tyran.io",
    "link": "https://tyran.io",
    "image": "/assets/media/icons/tyranio.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Arras.io",
    "link": "https://arras.io/",
    "image": "/assets/media/icons/arrasio.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "mk48.io",
    "link": "https://mk48.io/",
    "image": "/assets/media/icons/mk48io.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Bandit.RIP",
    "link": "https://bandit.rip/",
    "image": "/assets/media/icons/banditrip.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Addicting Games",
    "link": "https://www.addictinggames.com/",
    "image": "/assets/media/icons/addictinggames.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Deeeep.io",
    "link": "https://beta.deeeep.io",
    "image": "/assets/media/icons/deeeepio.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "ev.io",
    "link": "https://ev.io",
    "image": "/assets/media/icons/evio.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Brain Test 2",
    "link": "https://games.poki.com/458768/df221093-aae9-4c0d-b458-efb16ae8e3ab",
    "image": "/assets/media/icons/braintest2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Brain Test 3",
    "link": "https://games.poki.com/458768/1f3ae540-a95f-4f20-a000-29512612e341",
    "image": "/assets/media/icons/braintest3.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Donitz - itch.io",
    "link": "https://donitz.itch.io/",
    "image": "/assets/media/icons/itch.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Territorial.io",
    "link": "https://territorial.io",
    "image": "/assets/media/icons/territorialio.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Stickman Hook",
    "link": "/e/load/stickman-hook/index.html",
    "image": "/assets/media/icons/stickmanhook.webp",
    "categories": [
      "all",
      "local"
    ]
  },
  {
    "name": "Tube Jumpers",
    "link": "https://unblocked76.github.io/tube-jumpers/",
    "image": "/assets/media/icons/tubejumpers.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Tunnel Rush",
    "link": "https://5dd2e8e4-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/5627efae-e960-407d-82a5-3da708eb4e68/index.html",
    "image": "/assets/media/icons/tunnelrush.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Tunnel Rush 2",
    "link": "https://a7e6d137-c3c1-46e6-a3db-04c2d33c98a8.poki-gdn.com/71e6bddd-9b0e-4621-a11a-9503086f69d5/index.html",
    "image": "/assets/media/icons/tunnelrush2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Rainbow Obby",
    "link": "https://785a4295-96c4-43e5-b237-fb07fc3ef44d.poki-gdn.com/f1d39f75-7a25-41de-86cf-ba00804737b5/index.html",
    "image": "/assets/media/icons/rainbowobby.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Candy Jump",
    "link": "https://candyjump.games235.com/",
    "image": "/assets/media/icons/candyjump.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Minecraft Classic",
    "link": "https://classic.minecraft.net",
    "image": "/assets/media/icons/mc.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Learn to Fly 3",
    "link": "https://www.silvergames.com/en/learn-to-fly-3/iframe",
    "image": "/assets/media/icons/learntofly3.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Neal.Fun",
    "link": "https://neal.fun",
    "image": "/assets/media/icons/nealfun.webp",
    "categories": [
      "all"
    ],
    "error": "true",
    "say": "Neal.fun does not work on Interstellar because of Cloudflare protection."
  },
  {
    "name": "YoHoHo.io",
    "link": "https://yohoho.io/",
    "image": "/assets/media/icons/yohoho.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "AntWar.io",
    "link": "https://antwar.io/",
    "image": "/assets/media/icons/antwario.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Tetr.io",
    "link": "https://tetr.io/",
    "image": "/assets/media/icons/tetrio.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Time Shooter 2",
    "link": "https://html5.gamedistribution.com/62a72f2da7cb4b609579a47653546e6a/",
    "image": "/assets/media/icons/timeshooter2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Merge Fruit",
    "link": "https://html5.gamedistribution.com/2dee9d404697435aa76111eb4015e1d5/",
    "image": "/assets/media/icons/mergefruit.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "There Is No Game",
    "link": "https://5dd2d607-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/38959ae1-110b-49ab-86ae-df425fd7862a/index.html",
    "image": "/assets/media/icons/thereisnogame.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "FeedVid",
    "link": "https://v6p9d9t4.ssl.hwcdn.net/html/4941980-683813/index.html",
    "image": "/assets/media/icons/feedvid.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "florr.io",
    "link": "https://florr.io",
    "image": "/assets/media/icons/florr.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Rocket Bot Royale",
    "link": "https://rocketbotroyale2.winterpixel.io/",
    "image": "/assets/media/icons/rocketbotroyale.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Papa's Cheeseria",
    "link": "https://www.coolmathgames.com/0-papas-cheeseria/play",
    "image": "/assets/media/icons/papascheeseria.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Papa's Pancakeria",
    "link": "https://www.coolmathgames.com/0-papas-pancakeria/play",
    "image": "/assets/media/icons/papaspancakeria.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Papa's Wingeria",
    "link": "https://www.coolmathgames.com/0-papas-wingeria/play",
    "image": "/assets/media/icons/papaswingeria.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Riddle School 1",
    "link": "https://uploads.ungrounded.net/ruffle_wrapper/ruffleembed.html?v=1.0.67&browsermode=default&props=%7B%22ruffle%22%3A%22%2Fruffle_wrapper%2Flib%2Fruffle.js%3F1695474658%22%2C%22public_path%22%3A%22%2Fruffle_wrapper%2Flib%2F%22%2C%22swf%22%3A%22https%3A%2F%2Fuploads.ungrounded.net%2F314000%2F314680_Riddle_School.swf%3F1148577264%22%2C%22vars%22%3A%7B%22NewgroundsAPI_PublisherID%22%3A1%2C%22NewgroundsAPI_SandboxID%22%3A%2265103f0745c96%22%2C%22NewgroundsAPI_SessionID%22%3A%22%22%2C%22NewgroundsAPI_UserName%22%3A%22%26lt%3Bdeleted%26gt%3B%22%2C%22NewgroundsAPI_UserID%22%3A0%2C%22ng_username%22%3A%22%26lt%3Bdeleted%26gt%3B%22%7D%2C%22width%22%3A550%2C%22height%22%3A400%2C%22icon%22%3A%22https%3A%2F%2Fpicon.ngfiles.com%2F314000%2Fflash_314680_card.webp%3Ff1607914286%22%2C%22warnOnUnsupportedContent%22%3Afalse%7D",
    "image": "/assets/media/icons/riddle-school.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Powerline.IO",
    "link": "https://powerline.io",
    "image": "/assets/media/icons/powerline.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Papa's Scooperia",
    "link": "https://files.crazygames.com/ruffle/papasscooperia.html",
    "image": "/assets/media/icons/papasscooperia.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Papa's Sushiria",
    "link": "https://files.crazygames.com/ruffle/papassushiria.html",
    "image": "/assets/media/icons/papassushiria.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Burrito Bison",
    "link": "https://f.silvergames.com/awayfl/index.html?swf=burrito-bison.swf",
    "image": "/assets/media/icons/burritobison.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Fireboy And Watergirl 2 In The Light Temple",
    "link": "https://www.coolmathgames.com/sites/default/files/public_games/40210/",
    "image": "/assets/media/icons/fireboyandwatergirllighttemple.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Fireboy And Watergirl 4 In The Crystal Temple",
    "link": "https://www.coolmathgames.com/sites/default/files/public_games/40212/",
    "image": "/assets/media/icons/fireboyandwatergirlcrystaltemple.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Fireboy And Watergirl 5: Elements",
    "link": "https://www.coolmathgames.com/sites/default/files/public_games/40218",
    "image": "/assets/media/icons/fireboyandwatergirlelements.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Fireboy And Watergirl 6: Fairy Tales",
    "link": "https://html5.gamedistribution.com/rvvASMiM/be3cff113c4e4f069b7614851825ffe9/index.html",
    "image": "/assets/media/icons/fireboyandwatergirlfairytales.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Fireboy And Watergirl In The Forest Temple",
    "link": "https://www.coolmathgames.com/sites/default/files/public_games/40034/",
    "image": "/assets/media/icons/fireboyandwatergirlforesttemple.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Gunspin",
    "link": "https://html5.gamedistribution.com/rvvASMiM/917cce8c44c44638a8cdc2a1794b65c8/index.html",
    "image": "/assets/media/icons/gunspin.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Thelast Royale",
    "link": "https://thelast.io",
    "image": "/assets/media/icons/thelast-io.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "mope.io",
    "link": "https://thelast.io",
    "image": "/assets/media/icons/mope-io.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Tiny Fishing",
    "link": "https://www.dob5.com/d/file/games/tiny-fishing/",
    "image": "/assets/media/icons/tinyfishing.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Johnny Upgrade",
    "link": "https://lagged.com/api/play2/johnny-upgrade3/",
    "image": "/assets/media/icons/johnnyupgrade.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "bloxd.io",
    "link": "https://bloxd.io",
    "image": "/assets/media/icons/bloxd-io.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Duck Life 4",
    "link": "/e/load/ducklife4/index.html",
    "image": "/assets/media/icons/dl4.webp",
    "categories": [
      "all",
      "local"
    ],
    "load": true
  },
  {
    "name": "Papa's Freezeria",
    "link": "https://www.coolmathgames.com/0-papas-freezeria/play",
    "image": "/assets/media/icons/papasfreezeria.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Evades",
    "link": "https://evades.io",
    "image": "/assets/media/icons/evadesio.webp",
    "categories": [
      "all,",
      "2P"
    ]
  },
  {
    "name": "Bullet Force Multiplayer",
    "link": "https://www.crazygames.com/game/bullet-force-multiplayer",
    "image": "/assets/media/icons/BFM.webp",
    "categories": [
      "all,",
      "2P"
    ]
  },
  {
    "name": "Crazy Games",
    "link": "https://www.crazygames.com/",
    "image": "/assets/media/icons/crazy.webp",
    "categories": [
      "all,",
      "emu,",
      "2P,",
      "sports,",
      "flash"
    ]
  },
  {
    "name": "Cubes 2048",
    "link": "https://www.crazygames.com/game/cubes-2048-io",
    "image": "/assets/media/icons/C2048.webp",
    "categories": [
      "all,",
      "2P"
    ]
  },
  {
    "name": "FNAF 2",
    "link": "https://sussygamedeveloper.github.io/FNAF2/",
    "image": "/assets/media/icons/FNAF2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "FNAF 3",
    "link": "https://sussygamedeveloper.github.io/fnaf3/",
    "image": "/assets/media/icons/FNAF3.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "FNAF Web",
    "link": "https://wellsousaaa.github.io/Five-Nights-at-Freddys-Web/",
    "image": "/assets/media/icons/FNAFWeb.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Riddle School 4",
    "link": "https://riddle-school-4.game-files.crazygames.com/ruffle/riddleschool4.html",
    "image": "/assets/media/icons/rs4.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Riddle School 5",
    "link": "https://riddle-school-5.game-files.crazygames.com/ruffle/riddleschool5.html",
    "image": "/assets/media/icons/rs5.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "GBA Emulator",
    "link": "https://ds.44670.org/gba/",
    "image": "/assets/media/icons/gba.webp",
    "categories": [
      "all,",
      "emu"
    ]
  },
  {
    "name": "Itch.io",
    "link": "https://itch.io",
    "image": "/assets/media/icons/itch.webp",
    "categories": [
      "all,",
      "emu,",
      "2P"
    ]
  },
  {
    "name": "N-Gon",
    "link": "https://landgreen.github.io/sidescroller/",
    "image": "/assets/media/icons/NGON.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Nintendo DS Emulator",
    "link": "https://ds.44670.org/",
    "image": "/assets/media/icons/ds.webp",
    "categories": [
      "all,",
      "emu"
    ]
  },
  {
    "name": "Nintendo 64 Emulator",
    "link": "https://www.neilb.net/n64wasm/",
    "image": "/assets/media/icons/N64.webp",
    "categories": [
      "all,",
      "emu"
    ]
  },
  {
    "name": "Playstation 2 Emulator",
    "link": "https://playjs.purei.org/",
    "image": "/assets/media/icons/PS2.webp",
    "categories": [
      "all,",
      "emu"
    ]
  },
  {
    "name": "Run 3",
    "link": "https://www.coolmathgames.com/0-run-3/play",
    "image": "/assets/media/icons/run3.webp",
    "categories": [
      "all,",
      "flash"
    ]
  },
  {
    "name": "Subway Surfers: San Francisco ",
    "link": "https://raw.githack.com/3kh0/3kh0-assets/main/subway-surfers/index.html",
    "image": "/assets/media/icons/SF.webp",
    "categories": [
      "all,",
      "emu"
    ]
  },
  {
    "name": "Survivor.io",
    "link": "https://html5.gamedistribution.com/rvvASMiM/f1c451e586c04b4c8cba01b0c50d9090/index.html",
    "image": "/assets/media/icons/SVI.webp",
    "categories": [
      "all,",
      "emu"
    ]
  },
  {
    "name": "Web Retro",
    "link": "/e/load/webretro/index.html",
    "image": "/assets/media/icons/webretro.webp",
    "categories": [
      "all,",
      "emu",
      "local"
    ]
  },
  {
    "name": "Fortnite (Geforce NOW)",
    "link": "https://play.geforcenow.com/mall/#/deeplink?game-id=46bfab06-d864-465d-9e56-2d9e45cdee0a",
    "image": "/assets/media/icons/fortnite.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Bomb Party",
    "link": "https://jklm.fun",
    "image": "/assets/media/icons/BP.webp",
    "categories": [
      "all,",
      "2P"
    ]
  },
  {
    "name": "1",
    "link": "/e/load/1/index.html",
    "image": "/assets/media/icons/1.webp",
    "categories": [
      "all",
      "local"
    ]
  },
  {
    "name": "2D Rocket League",
    "link": "https://v6p9d9t4.ssl.hwcdn.net/html/3325334/index.html",
    "image": "/assets/media/icons/2D-Rocket-League.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "3D Dino Game",
    "link": "https://lagged.com/api/play2/t-rex-3d2/",
    "image": "/assets/media/icons/trex-run-3D.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "60 Sec. Burger Run",
    "link": "https://www.coolmathgames.com/0-60-second-burger-run/play",
    "image": "/assets/media/icons/60-second-burger-run.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "8 Ball Pool",
    "link": "https://8ball-pool.io",
    "image": "/assets/media/icons/8ball.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Ace Attorney",
    "link": "https://f.kbhgames.com/r/gba/?r=ace-attorney",
    "image": "/assets/media/icons/aa.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "AC - Wild World",
    "link": "https://static.arcadespot.com/retroemulator.php?system=nds&game=2017/10/animal-crossing-wild-world1.zip",
    "image": "/assets/media/icons/acww.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Adventure Capitalist",
    "link": "https://than1089.github.io/adventure-capitalist/",
    "image": "/assets/media/icons/adventure-capitalist.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Agar.io",
    "link": "https://agar.io",
    "image": "/assets/media/icons/agario.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Among Us (Scratch)",
    "link": "https://turbowarp.org/523967150/fullscreen",
    "image": "/assets/media/icons/scratch-among-us.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Apex Legends",
    "link": "https://play.geforcenow.com/games?game-id=cb2b1b5f-54ba-45fd-9839-96bbfe1376cd&lang=en_US&asset-id=01_c6efce00-e91e-402a-8b72-f4971f89c528",
    "image": "/assets/media/icons/apex.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Basket Random",
    "link": "https://html5.gamedistribution.com/rvvASMiM/bf1268dccb5d43e7970bb3edaa54afc8/index.html",
    "image": "/assets/media/icons/br.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Basketball Bros",
    "link": "https://www.basketbros.io/",
    "image": "/assets/media/icons/basket-bros.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Basketball Legends",
    "link": "https://www.basketballlegends.fun/gamedata/basketball-legends-2020",
    "image": "/assets/media/icons/basketball-legends.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Biggie Cheese Fight",
    "link": "https://scratch.mit.edu/projects/163771748/fullscreen",
    "image": "/assets/media/icons/biggiecheese.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "BuildNow.GG",
    "link": "https://games.crazygames.com/en_US/buildnow-gg/index.html",
    "image": "/assets/media/icons/build-now.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Cat Ninja",
    "link": "https://4iapq88o5f3gc1dij3it0mp5jojnm3jr-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%252Fcat-ninja.xml",
    "image": "/assets/media/icons/cat-ninja.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Candy Box",
    "link": "https://candybox2.net",
    "image": "/assets/media/icons/candybox.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Celeste PICO-8",
    "link": "https://exok.com/minigames/celeste.html",
    "image": "/assets/media/icons/celeste.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Clicker Heros",
    "link": "https://www.clickerheroes.com/play.html",
    "image": "/assets/media/icons/clickerheros.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Chess.com",
    "link": "https://chess.com",
    "image": "/assets/media/icons/chess.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Cluster Rush",
    "link": "/e/load/Cluster-Rush/index.html",
    "image": "/assets/media/icons/cluster-rush.webp",
    "categories": [
      "all",
      "local"
    ]
  },
  {
    "name": "Cookie Clicker",
    "link": "https://orteil.dashnet.org/cookieclicker/",
    "image": "/assets/media/icons/cookieclicker.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Diep.io",
    "link": "https://diep.io/",
    "image": "/assets/media/icons/diep.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Doge Miner",
    "link": "/e/load/DogeMiner/index.html",
    "image": "/assets/media/icons/doge-miner-1.webp",
    "categories": [
      "all",
      "local"
    ]
  },
  {
    "name": "Doom 1",
    "link": "https://browncha023.github.io/GBA/launcher.html#dm",
    "image": "/assets/media/icons/DOOM.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Doom 2",
    "link": "https://browncha023.github.io/GBA/launcher.html#dm2",
    "image": "/assets/media/icons/doom2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Dreader",
    "link": "https://donitz.itch.io/dreader",
    "image": "/assets/media/icons/dreader.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Drift Hunters",
    "link": "https://webglmath.github.io/drift-hunters/",
    "image": "/assets/media/icons/drift-hunters.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Drive Mad",
    "link": "/e/drive-mad/index.html",
    "local": true,
    "image": "/assets/media/icons/dm.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Fallout 2",
    "link": "https://jonasz-o.itch.io/fallout2remake3d",
    "image": "/assets/media/icons/fallout2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "FNAF 2 (Scratch)",
    "link": "https://scratch.mit.edu/projects/469219637/embed/",
    "image": "/assets/media/icons/FNAF2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "FNF - Lofi Mod",
    "link": "https://fnf.kdata1.com/lofi-funkin/2/",
    "image": "/assets/media/icons/lofi.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "FNF VS. Snorlax",
    "link": "https://fnf.kdata1.com/snorlax/1/",
    "image": "/assets/media/icons/snorlax.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "JustFall.LOL",
    "link": "https://justfall.lol",
    "image": "/assets/media/icons/just-fall-lol.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Kirby Mirror (GBA)",
    "link": "https://www.retrogames.onl/gba/kirby-mirror-gba.html",
    "image": "/assets/media/icons/kirby.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "G-Switch",
    "link": "https://5dd24442-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/4f2c69b4-3edc-4cd7-a078-efd3d1ea9fb5/index.html",
    "image": "/assets/media/icons/gswitch.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "G-Switch 2",
    "link": "https://5dd27095-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/e0e70ee4-fdd4-4de8-931d-fde7d1cb408b/index.html",
    "image": "/assets/media/icons/gswitch2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "G-Switch 3",
    "link": "https://5dd2b395-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/120fdec6-7eeb-470f-a43c-9bcdace0dacb/index.html",
    "image": "/assets/media/icons/gswitch3.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Golden Eye 007",
    "link": "https://f.kbhgames.com/r/n64/game.php?file=007-golden-eye.zip",
    "image": "/assets/media/icons/golden-eye-007.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "GBA Games 2",
    "link": "https://cattn.github.io/gba/",
    "image": "/assets/media/icons/gba.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Geforce NOW",
    "link": "https://play.geforcenow.com",
    "image": "/assets/media/icons/geforce-now.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Haunted School 1",
    "link": "https://games.crazygames.com/en_US/haunted-school---horror-game/index.html",
    "image": "/assets/media/icons/na.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "HexArena",
    "link": "https://hexarena.io/",
    "image": "/assets/media/icons/hexarena.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Hole.IO",
    "link": "https://hole-io.com/",
    "image": "/assets/media/icons/hole.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Isleward",
    "link": "https://play.isleward.com",
    "image": "/assets/media/icons/isleward.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "NGU Idle",
    "link": "https://cache.armorgames.com/files/games/ngu-idle-18444/index.html?v=1559319416",
    "image": "/assets/media/icons/nguidle.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Jacksmith",
    "link": "https://www.coolmathgames.com/0-jacksmith/play",
    "image": "/assets/media/icons/jacksmith.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Sandtrix",
    "link": "https://files.crazygames.com/sandtrix/16/index.html",
    "image": "/assets/media/icons/sandtrix.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Learn To Fly Idle",
    "link": "https://www.gameslol.net/data/waflash/index.php?g=635",
    "image": "/assets/media/icons/ltf_idle.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Lordz.io",
    "link": "https://lordz.io/",
    "image": "/assets/media/icons/lordz.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Masked IO",
    "link": "https://unblocked-games.s3.amazonaws.com/games/masked-io/index.html",
    "image": "/assets/media/icons/masked-forces.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Mario Kart 64",
    "link": "https://static.arcadespot.com/retroemulator.php?system=n64&game=2017/06/mario-kart-64.zip",
    "image": "/assets/media/icons/mario-kart-64.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Mobs Inc",
    "link": "https://overboy.itch.io/mobs-inc",
    "image": "/assets/media/icons/mobsinc.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "MooMoo.io",
    "link": "https://moomoo.io",
    "image": "/assets/media/icons/moo.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Mortal Kombat 4",
    "link": "https://f.kbhgames.com/r/n64/game.php?file=Mortal-Kombat-4-U.zip",
    "image": "/assets/media/icons/mortal-kombat-4.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Mr. Mine",
    "link": "https://www.coolmathgames.com/0-mr-mine/play",
    "image": "/assets/media/icons/mrmine.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "MX3M: Pool Party",
    "link": "https://h0jokl1egt0fd4oc8qv3j0tltl9jbqhn-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://649025137-174029463385024710.preview.editmysite.com/uploads/b/139890129-767696982876512205/files/mx3mpp.xml",
    "image": "/assets/media/icons/mx3m.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "MX3M: Spooky Land",
    "link": "https://html5.gamedistribution.com/rvvASMiM/b8a342904608470a9f3382337aca3558/index.html",
    "image": "/assets/media/icons/mx3m-spooky.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "MX3M: Winter",
    "link": "https://www-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://sites.google.com/site/s017q3e/moto-x3m-4-winter.xml",
    "image": "/assets/media/icons/mx3m-winter.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Saul Run",
    "link": "https://complex-ify.itch.io/saul-goodman",
    "image": "/assets/media/icons/saulrun.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Ninja Cat Exploit",
    "link": "https://html5.gamedistribution.com/rvvASMiM/903ba9346b9d437e9c7e81d672cead44/index.html",
    "image": "/assets/media/icons/ninja-cat.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Online Racing Game!",
    "link": "https://jchabin.github.io/cars/",
    "image": "/assets/media/icons/OR.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Online Soccer M.",
    "link": "https://www.onlinesoccermanager.com/",
    "image": "/assets/media/icons/osm.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Papa's Bakeria",
    "link": "https://f.silvergames.com/emu/waffle/?id=5458",
    "image": "/assets/media/icons/bakeria.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Papa's Cupcakeria",
    "link": "https://f.silvergames.com/emu/waffle/?id=3246",
    "image": "/assets/media/icons/cupcakeria.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Papa Louie 1",
    "link": "https://f.silvergames.com/ruffle/player.php?id=1373",
    "image": "/assets/media/icons/louie1.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Papa Louie 2",
    "link": "https://f.silvergames.com/emu/waffle/?id=3042",
    "image": "/assets/media/icons/louie2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Papa Louie 3",
    "link": "https://f.silvergames.com/emu/waffle/?id=4693",
    "image": "/assets/media/icons/papa-louie-3.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Papa's Pizzeria",
    "link": "https://f.silvergames.com/ruffle/player.php?id=1360",
    "image": "/assets/media/icons/pizzeria.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Paper Mario 64",
    "link": "https://f.kbhgames.com/r/n64/game.php?file=Paper%20Mario%20(USA).zip",
    "image": "/assets/media/icons/paper-mario-64.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Paper.io",
    "link": "https://paper-io.com/",
    "image": "/assets/media/icons/paperio.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Pixel Shooter",
    "link": "https://94bfktj403i6m18as4vkvtreqd0ohci4-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://274019683-173520394482650759.preview.editmysite.com/uploads/b/139890129-131715539788281629/files/ps.xml",
    "image": "/assets/media/icons/pixel-shooter.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Pizza Tower",
    "link": "https://gamaverse.com/c/e/g/pizza-tower-1678640389/index.html",
    "image": "/assets/media/icons/pizza-tower.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Pokemon Heart Gold",
    "link": "https://static.arcadespot.com/retroemulator.php?system=nds&game=2017/10/pokemon-heartgold-version1.zip",
    "image": "/assets/media/icons/heartgold.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Pokemon Showdown",
    "link": "https://play.pokemonshowdown.com",
    "image": "/assets/media/icons/showdown.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Google Baseball",
    "link": "https://www.google.com/logos/2019/july4th19/r6/july4th19.html",
    "image": "/assets/media/icons/googlebaseball.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Deadshot",
    "link": "https://deadshot.io",
    "image": "/assets/media/icons/deadshot.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Rainbow Tower",
    "link": "https://www.mathplayground.com/mobile_rainbow_tower/index.html",
    "image": "/assets/media/icons/rainbowtower.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Doodle Jump",
    "link": "https://doodlejump.pro/",
    "image": "/assets/media/icons/doodlejump.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Madalin Stunt Cars Multiplayer",
    "link": "https://games.crazygames.com/en_US/madalin-cars-multiplayer/index.html",
    "image": "/assets/media/icons/madalinmultiplayer.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "PM: Light Platinum",
    "link": "https://browncha023.github.io/GBA/launcher.html#pokemonlp",
    "image": "/assets/media/icons/lp.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Precision Client",
    "link": "https://glcdn.githack.com/3kh0/3kh0-assets/-/raw/main/precision-client/index.html",
    "image": "/assets/media/icons/precision.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Rainbow Six Siege",
    "link": "https://play.geforcenow.com/games?game-id=1dd07d47-6601-42f7-80e9-e4d8db08ea1b&lang=en_US&asset-id=01_44417-48c3d8e642e2",
    "image": "/assets/media/icons/r6.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Red Ball 1",
    "link": "https://www.algebrashelper.com/redball",
    "image": "/assets/media/icons/redball1.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Red Ball 2",
    "link": "https://www.algebrashelper.com/redball-2",
    "image": "/assets/media/icons/redball2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Red Ball 4",
    "link": "https://www.algebrashelper.com/redball-4",
    "image": "/assets/media/icons/redball4.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Red Ball 4 Vol. 2",
    "link": "https://www.algebrashelper.com/read-ball-4v2",
    "image": "/assets/media/icons/redball4vol2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Red Ball 4 Vol. 3",
    "link": "https://www.algebrashelper.com/red-ball-4v3",
    "image": "/assets/media/icons/redball4vol3.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Riddle School 2",
    "link": "https://f.silvergames.com/ruffle/player.php?id=8564",
    "image": "/assets/media/icons/rs2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Riddle School 3",
    "link": "https://riddle-school-3.game-files.crazygames.com/ruffle/riddleschool3.html",
    "image": "/assets/media/icons/rs3.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Rocket Pult",
    "link": "https://v6p9d9t4.ssl.hwcdn.net/html/565140/index.html",
    "image": "/assets/media/icons/rocketpult.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Rooftop Snipers",
    "link": "https://html5.gamedistribution.com/rvvASMiM/c3a70ae98547407a92ebedca8b79fdfa/index.html",
    "image": "/assets/media/icons/rooftop.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Sand Spiel",
    "link": "https://sandspiel.club/",
    "image": "/assets/media/icons/sand.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Sandboxels",
    "link": "https://v6p9d9t4.ssl.hwcdn.net/html/5808591/index.html",
    "image": "/assets/media/icons/sandboxels.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Shapez.IO",
    "link": "https://shapez.io",
    "image": "/assets/media/icons/shapezio.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Shell Shockers",
    "link": "https://shellshock.io/",
    "image": "/assets/media/icons/shell-shockers.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Slither.io",
    "link": "https://slither.io/",
    "image": "/assets/media/icons/slither.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Smash Bros 64",
    "link": "https://emulatorgames.online/games/n64/super-smash-bros",
    "image": "/assets/media/icons/super-smash-bros-64.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Snowball.io",
    "link": "https://games.crazygames.com/en_US/snowball-io/index.html",
    "image": "/assets/media/icons/snowball.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Space Plan",
    "link": "https://jhollands.co.uk/spaceplan/",
    "image": "/assets/media/icons/spaceplan.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Stumble Guys",
    "link": "https://www.stumbleguys.com/play",
    "image": "/assets/media/icons/stumble-guys.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Stumble Guys Clone",
    "link": "https://stumble-guys.io/stumble-guys.embed",
    "image": "/assets/media/icons/stumble-guys.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Sugar Sugar HTML5",
    "link": "https://66564262-37c6-4095-a731-535342e4bbe4.poki-gdn.com/5bd6e8c6-381d-4de5-9823-96662d29afaf/index.html",
    "image": "/assets/media/icons/sugarsugar.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Super Mario 63",
    "link": "https://www.numuki.com/gameframe/super-mario-63",
    "image": "/assets/media/icons/sm63.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Super Mario 64",
    "link": "https://f.kbhgames.com/r/n64/game.php?file=32112_super-mario-64-usa.zip",
    "image": "/assets/media/icons/sm64.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Super Smash Flash",
    "link": "https://f.kbhgames.com/RS/game.php?r=//f.kbhgames.com/2018/swf/smashflash.swf&w=1521&h=753",
    "image": "/assets/media/icons/ssf1.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Supply Chain Idle",
    "link": "https://chat.kongregate.com/gamez/0027/1653/live/index.html?kongregate_game_version=1554392772",
    "image": "/assets/media/icons/supplychainlogo.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Taming.io",
    "link": "https://taming.io/",
    "image": "/assets/media/icons/tamingio.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Temple of Boom",
    "link": "https://temple-of-boom.github.io/file/",
    "image": "/assets/media/icons/templeofboom.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "Tanuki Sunset",
    "link": "https://watchdocumentaries.com/wp-content/uploads/games/tanuki-sunset",
    "image": "/assets/media/icons/tanuki.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "The Simpsons",
    "link": "https://static.arcadespot.com/retroemulator.php?system=nds&game=2017/11/the-simpsons-game.zip",
    "image": "/assets/media/icons/the-simpsons-game.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Temple Run 2",
    "link": "https://watchdocumentaries.com/wp-content/uploads/games/temple-run-2/",
    "image": "/assets/media/icons/temple-run-2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Twitch Tetris",
    "link": "https://www.rossipotti.de/ausgabe28/tetris/controls.html",
    "image": "/assets/media/icons/na.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Voxiom.io",
    "link": "https://voxiom.io/",
    "image": "/assets/media/icons/voxiom.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Zombs.io",
    "link": "https://zombs.io/",
    "image": "/assets/media/icons/zombs-io.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Zombs Royale",
    "link": "https://zombsroyale.io",
    "image": "/assets/media/icons/zombs-royale.webp",
    "categories": [
      "all,",
      "2P"
    ]
  },
  {
    "name": "GBA Games",
    "link": "https://real-sgs.vercel.app/Tools/GBA-Emulator",
    "image": "/assets/media/icons/gba.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Roblox (Now.GG)",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.roblox.client&partner=interstellar",
    "image": "/assets/media/icons/roblox.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Madden NFL 24",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.ea.gp.maddennfl21mobile&partner=interstellar",
    "image": "/assets/media/icons/maddennfl24.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Android",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.uncube.launcher3&partner=interstellar",
    "image": "/assets/media/icons/android.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Genshin Impact",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.miHoYo.GenshinImpact&partner=interstellar",
    "image": "/assets/media/icons/genshinimpact.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Fortnite (Now.GG)",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.epicgames.fortnite&partner=interstellar",
    "image": "/assets/media/icons/fortnite.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "EA SPORTS FCâ„¢ MOBILE 24 SOCCER",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.ea.gp.fifamobile&partner=interstellar",
    "image": "/assets/media/icons/easports-fcmobile24.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "EA SPORTSâ„¢ UFCÂ® Mobile 2",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.ea.gp.easportsufc2&partner=interstellar",
    "image": "/assets/media/icons/easports-ufc.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Melon Playground",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.studio27.MelonPlayground&partner=interstellar",
    "image": "/assets/media/icons/melonplayground.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Solar Smash",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.paradyme.solarsmash&partner=interstellar",
    "image": "/assets/media/icons/solarsmash.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Bloons TD Battles 2",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.ninjakiwi.bloonstdbattles2&partner=interstellar",
    "image": "/assets/media/icons/bloonstd2.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Bloons TD Battles",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.ninjakiwi.bloonstdbattles&partner=interstellar",
    "image": "/assets/media/icons/bloonstd.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Cookie Run Kingdom",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.devsisters.ck&partner=interstellar",
    "image": "/assets/media/icons/cookierunkingdom.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Character AI",
    "link": "https://now.gg/iframe/snippet?app_pkg=ai.character.app&partner=interstellar",
    "image": "/assets/media/icons/characterai.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Aptoide",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.aptoide.partners.nowgg.store&partner=interstellar",
    "image": "/assets/media/icons/aptoide.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Akinator",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.digidust.elokence.akinator.freemium&partner=interstellar",
    "image": "/assets/media/icons/akinator.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "WorldBox",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.mkarpenko.worldbox&partner=interstellar",
    "image": "/assets/media/icons/worldbox.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Toca Life World",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.tocaboca.tocalifeworld&partner=interstellar",
    "image": "/assets/media/icons/tocalifeworld.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Toca Hair Salon 4",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.tocaboca.tocahairsalon4&partner=interstellar",
    "image": "/assets/media/icons/tocabocahairsalon4.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Toca Kitchen 2",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.tocaboca.tocakitchen2&partner=interstellar",
    "image": "/assets/media/icons/tocakitchen2.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Free Fire",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.dts.freefireth&partner=interstellar",
    "image": "/assets/media/icons/freefire.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Stumble Guys (Android)",
    "link": "https://now.gg/iframe/snippet?app_pkg=com.kitkagames.fallbuddies&partner=interstellar",
    "image": "/assets/media/icons/stumble-guys.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Now.GG",
    "link": "https://now.gg",
    "image": "/assets/media/icons/now-gg.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Roblox (NowGG.me) [Working]",
    "link": "https://nowgg.me/apps/roblox-corporation/5349/roblox.html",
    "image": "/assets/media/icons/shuttle.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Now.GG (NowGG.me) [Working]",
    "link": "https://nowgg.me",
    "image": "/assets/media/icons/shuttle.webp",
    "categories": [
      "all",
      "emu",
      "android"
    ]
  },
  {
    "name": "Parappa the Rapper",
    "link": "https://retrogamesonline.io/parappa-the-rapper.embed",
    "image": "/assets/media/icons/ptr.webp",
    "categories": [
      "all",
      "emu"
    ]
  },
  {
    "name": "Half-Life",
    "link": "https://x8bitrain.github.io/webXash/",
    "image": "/assets/media/icons/half-life.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Kiomet",
    "link": "https://kiomet.com",
    "image": "/assets/media/icons/kiomet.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Tribals.io",
    "link": "https://tribals.io/",
    "image": "/assets/media/icons/tribalsio.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Counter Strike 1.6",
    "link": "https://play-cs.com/en/servers",
    "image": "/assets/media/icons/cs16.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Narrow One",
    "link": "https://narrow.one",
    "image": "/assets/media/icons/narrowone.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Kirka",
    "link": "https://kirka.io",
    "image": "/assets/media/icons/kirka.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Cryzen",
    "link": "https://cryzen.io",
    "image": "/assets/media/icons/cryzen.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Hordes",
    "link": "https://hordes.io",
    "image": "/assets/media/icons/hordes.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Venge",
    "link": "https://venge.io",
    "image": "/assets/media/icons/venge.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Getaway S.",
    "link": "https://www.twoplayergames.org/embed/getaway-shootout",
    "image": "/assets/media/icons/getaway.webp",
    "categories": [
      "all",
      "2P"
    ]
  },
  {
    "name": "2048",
    "link": "/e/load/2048/index.html",
    "image": "/assets/media/icons/2048.webp",
    "categories": [
      "all",
      "local"
    ]
  },
  {
    "name": "2048 Multitasking",
    "link": "/e/load/2048-multitask/index.html",
    "image": "/assets/media/icons/2048.webp",
    "categories": [
      "all",
      "local"
    ]
  },
  {
    "name": "Windows 96",
    "link": "https://windows96.net",
    "image": "/assets/media/icons/windows96.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "The Impossible Quiz: Book 2",
    "link": "https://f.silvergames.com/ruffle/player.php?id=3742",
    "image": "/assets/media/icons/book2.webp",
    "categories": [
      "all",
      "emu"
    ]
  },
  {
    "name": "Wrassling",
    "link": "https://games.poki.com/458768/wrassling",
    "image": "/assets/media/icons/wrassling.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Google Snake Modded",
    "link": "https://googlesnakemods.com/v/current/",
    "image": "/assets/media/icons/snake.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Idle Startup Tycoon",
    "link": "https://www.mortgagecalculator.org/money-games/idle-startup-tycoon/",
    "image": "/assets/media/icons/idlestartup.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Two Player Games",
    "link": "https://www.twoplayergames.org/",
    "image": "/assets/media/icons/tpg.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Five Nights at Winston's",
    "link": "https://g.deev.is/fnaw/",
    "image": "/assets/media/icons/fnaw.webp",
    "categories": [
      "all",
      "game"
    ]
  },
  {
    "name": "Goomy Clicker 2",
    "link": "https://idle-js-games.github.io/goomyClicker2/",
    "image": "/assets/media/icons/gc2.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Mario Kart DS",
    "link": "https://seraph.reveriestudios.online/games/mariokartds/index.html",
    "image": "/assets/media/icons/mariokartds.jpg",
    "categories": [
      "all",
      "emu"
    ]
  },
  {
    "name": "Cooking Mama",
    "link": "https://seraph.reveriestudios.online/games/cookingmama/index.html",
    "image": "/assets/media/icons/cookingmama.jpg",
    "categories": [
      "all",
      "emu"
    ]
  },
  {
    "name": "Wordle",
    "link": "https://www.nytimes.com/games/wordle/index.html",
    "image": "/assets/media/icons/w.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Wordle Unlimited",
    "link": "https://wordleunlimited.org/",
    "image": "/assets/media/icons/w.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Wordly",
    "link": "https://wordly.org/",
    "image": "/assets/media/icons/w.webp",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Connections",
    "link": "https://www.nytimes.com/games/connections",
    "image": "/assets/media/icons/cn.png",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Connections Unlimited",
    "link": "https://1games.io/game/connections-game/",
    "image": "/assets/media/icons/cn.png",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Globle",
    "link": "https://globle.org/?",
    "image": "/assets/media/icons/cn.png",
    "categories": [
      "all"
    ]
  },
  {
    "name": "ShipCraft.io",
    "link": "https://shipcraft.io/",
    "categories": [
      "all"
    ]
  },
  {
    "name": "Super Mario Bros.",
    "link": "https://emulator-games.pages.dev/nes/Super Mario Bros.",
    "image": "/assets/media/icons/emulator/smb.webp",
    "categories": [
      "all",
      "emu"
    ]
  },
  {
    "name": "Super Mario Bros. 2",
    "link": "https://emulator-games.pages.dev/nes/Super Mario Bros. 2",
    "image": "/assets/media/icons/emulator/smb2.webp",
    "categories": [
      "all",
      "emu"
    ]
  },
  {
    "name": "Super Mario Bros. 3",
    "link": "https://emulator-games.pages.dev/nes/Super Mario Bros. 3",
    "image": "/assets/media/icons/emulator/smb3.webp",
    "categories": [
      "all",
      "emu"
    ]
  },
  {
    "name": "10 Minutes Till Dawn",
    "link": "/e/load/10-minutes-till-dawn/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play 10 Minutes Till Dawn in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "100ng",
    "link": "/e/load/100ng/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play 100ng in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "1v1space",
    "link": "/e/load/1v1space/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play 1v1space in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "9007199254740992",
    "link": "/e/load/9007199254740992/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play 9007199254740992 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "99balls",
    "link": "/e/load/99balls/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play 99balls in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "A Dance Of Fire And Ice",
    "link": "/e/load/a-dance-of-fire-and-ice/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play A Dance Of Fire And Ice in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Achievementunlocked",
    "link": "/e/load/achievementunlocked/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Achievementunlocked in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Adrenalinechallenge",
    "link": "/e/load/adrenalinechallenge/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Adrenalinechallenge in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Adventure Drivers",
    "link": "/e/load/adventure-drivers/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Adventure Drivers in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Ages Of Conflict",
    "link": "/e/load/ages-of-conflict/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Ages Of Conflict in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Alienhominid",
    "link": "/e/load/alienhominid/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Alienhominid in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Align 4",
    "link": "/e/load/align-4/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Align 4 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Amazing Rope Police",
    "link": "/e/load/amazing-rope-police/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Amazing Rope Police in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Amidst The Clouds",
    "link": "/e/load/amidst-the-clouds/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Amidst The Clouds in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Angelunder",
    "link": "/e/load/angelunder/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Angelunder in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Angry Sharks",
    "link": "/e/load/angry-sharks/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Angry Sharks in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Aquapark Slides",
    "link": "/e/load/aquapark-slides/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Aquapark Slides in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Astray",
    "link": "/e/load/astray/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Astray in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Avalanche",
    "link": "/e/load/avalanche/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Avalanche in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Awesometanks2",
    "link": "/e/load/awesometanks2/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Awesometanks2 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Backrooms",
    "link": "/e/load/backrooms/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Backrooms in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Backrooms 2d",
    "link": "/e/load/backrooms-2d/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Backrooms 2d in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Bacon May Die",
    "link": "/e/load/bacon-may-die/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Bacon May Die in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Bad Ice Cream",
    "link": "/e/load/bad-ice-cream/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Bad Ice Cream in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Bad Ice Cream 2",
    "link": "/e/load/bad-ice-cream-2/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Bad Ice Cream 2 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Bad Ice Cream 3",
    "link": "/e/load/bad-ice-cream-3/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Bad Ice Cream 3 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Baldis Basics",
    "link": "/e/load/baldis-basics/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Baldis Basics in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Basketbros Io",
    "link": "/e/load/basketbros-io/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Basketbros Io in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Battleforgondor",
    "link": "/e/load/battleforgondor/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Battleforgondor in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Bigredbutton",
    "link": "/e/load/bigredbutton/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Bigredbutton in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Blacholesquare",
    "link": "/e/load/blacholesquare/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Blacholesquare in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Blackknight",
    "link": "/e/load/blackknight/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Blackknight in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Blockpost",
    "link": "/e/load/blockpost/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Blockpost in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Bloonstd",
    "link": "/e/load/bloonstd/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Bloonstd in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Bloonstd2",
    "link": "/e/load/bloonstd2/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Bloonstd2 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Bloxors",
    "link": "/e/load/bloxors/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Bloxors in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Bntts",
    "link": "/e/load/bntts/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Bntts in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Bobtherobber2",
    "link": "/e/load/bobtherobber2/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Bobtherobber2 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Boxhead2play",
    "link": "/e/load/boxhead2play/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Boxhead2play in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Boxing Random",
    "link": "/e/load/boxing-random/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Boxing Random in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Breakingthebank",
    "link": "/e/load/breakingthebank/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Breakingthebank in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Btd4",
    "link": "/e/load/btd4/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Btd4 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Btd5",
    "link": "/e/load/btd5/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Btd5 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Btts",
    "link": "/e/load/btts/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Btts in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Burger And Frights",
    "link": "/e/load/burger-and-frights/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Burger And Frights in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Bus and subway",
    "link": "/e/load/bus and subway/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Bus and subway in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Cannon Basketball 4",
    "link": "/e/load/cannon-basketball-4/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Cannon Basketball 4 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Canyondefense",
    "link": "/e/load/canyondefense/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Canyondefense in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Cars Simulator",
    "link": "/e/load/cars-simulator/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Cars Simulator in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Cell Machine",
    "link": "/e/load/cell-machine/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Cell Machine in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Championarcher",
    "link": "/e/load/championarcher/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Championarcher in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Chess",
    "link": "/e/load/chess/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Chess in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Chill Radio",
    "link": "/e/load/chill-radio/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Chill Radio in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Chrome Dino",
    "link": "/e/load/chrome-dino/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Chrome Dino in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Circlo",
    "link": "/e/load/circlo/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Circlo in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Cnpingpong",
    "link": "/e/load/cnpingpong/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Cnpingpong in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Connect3",
    "link": "/e/load/connect3/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Connect3 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Core Ball",
    "link": "/e/load/core-ball/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Core Ball in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Craftmine",
    "link": "/e/load/craftmine/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Craftmine in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Creativekillchamber",
    "link": "/e/load/creativekillchamber/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Creativekillchamber in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Crossyroad",
    "link": "/e/load/crossyroad/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Crossyroad in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Ctr",
    "link": "/e/load/ctr/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Ctr in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Ctr Holiday",
    "link": "/e/load/ctr-holiday/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Ctr Holiday in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Ctr Tr",
    "link": "/e/load/ctr-tr/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Ctr Tr in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Cubefield",
    "link": "/e/load/cubefield/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Cubefield in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Cupcake2048",
    "link": "/e/load/cupcake2048/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Cupcake2048 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Dante",
    "link": "/e/load/dante/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Dante in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Death Run 3d",
    "link": "/e/load/death-run-3d/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Death Run 3d in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Deepest Sword",
    "link": "/e/load/deepest-sword/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Deepest Sword in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Defend The Tank",
    "link": "/e/load/defend-the-tank/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Defend The Tank in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Doctor Acorn2",
    "link": "/e/load/doctor-acorn2/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Doctor Acorn2 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Doge2048",
    "link": "/e/load/doge2048/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Doge2048 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Dogeminer2",
    "link": "/e/load/Dogeminer2/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Dogeminer2 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Doomori",
    "link": "/e/load/DOOMORI/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Doomori in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Doublewires",
    "link": "/e/load/doublewires/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Doublewires in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Dragon Vs Bricks",
    "link": "/e/load/dragon-vs-bricks/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Dragon Vs Bricks in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Draw The Hill",
    "link": "/e/load/draw-the-hill/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Draw The Hill in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Duke Nukem 2",
    "link": "/e/load/duke-nukem-2/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Duke Nukem 2 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Eaglerfaithful",
    "link": "/e/load/eaglerfaithful/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Eaglerfaithful in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Eaglerjp",
    "link": "/e/load/eaglerjp/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Eaglerjp in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Edge Surf",
    "link": "/e/load/edge-surf/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Edge Surf in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Edgenotfound",
    "link": "/e/load/edgenotfound/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Edgenotfound in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Eel Slap",
    "link": "/e/load/eel-slap/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Eel Slap in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Eggycar",
    "link": "/e/load/eggycar/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Eggycar in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Elasticman",
    "link": "/e/load/elasticman/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Elasticman in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Endlesswar3",
    "link": "/e/load/endlesswar3/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Endlesswar3 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Escapingtheprison",
    "link": "/e/load/escapingtheprison/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Escapingtheprison in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Evil Glitch",
    "link": "/e/load/evil-glitch/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Evil Glitch in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Evolution",
    "link": "/e/load/evolution/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Evolution in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Exo",
    "link": "/e/load/exo/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Exo in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Factoryballs",
    "link": "/e/load/factoryballs/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Factoryballs in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Fairsquares",
    "link": "/e/load/fairsquares/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Fairsquares in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Fake Virus",
    "link": "/e/load/fake-virus/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Fake Virus in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Fancypantsadventures",
    "link": "/e/load/fancypantsadventures/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Fancypantsadventures in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Fireboywatergirlforesttemple",
    "link": "/e/load/fireboywatergirlforesttemple/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Fireboywatergirlforesttemple in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Flappy 2048",
    "link": "/e/load/flappy-2048/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Flappy 2048 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Flappy Bird",
    "link": "/e/load/flappy-bird/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Flappy Bird in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Flashtetris",
    "link": "/e/load/flashtetris/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Flashtetris in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Fleeingthecomplex",
    "link": "/e/load/fleeingthecomplex/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Fleeingthecomplex in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Fnaw",
    "link": "/e/load/fnaw/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Fnaw in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Fridaynightfunkin",
    "link": "/e/load/fridaynightfunkin/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Fridaynightfunkin in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Froggys Battle",
    "link": "/e/load/froggys-battle/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Froggys Battle in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Fruitninja",
    "link": "/e/load/fruitninja/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Fruitninja in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Frying Nemo",
    "link": "/e/load/frying-nemo/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Frying Nemo in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Fsucraft",
    "link": "/e/load/fsucraft/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Fsucraft in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Fuclient",
    "link": "/e/load/fuclient/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Fuclient in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Gachalife",
    "link": "/e/load/gachalife/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Gachalife in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Game Inside",
    "link": "/e/load/game-inside/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Game Inside in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Gdtd",
    "link": "/e/load/gdtd/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Gdtd in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Gearsofbabies",
    "link": "/e/load/gearsofbabies/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Gearsofbabies in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Generic Fishing Game",
    "link": "/e/load/generic-fishing-game/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Generic Fishing Game in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Geochallenge",
    "link": "/e/load/geochallenge/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Geochallenge in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Geodash",
    "link": "/e/load/geodash/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Geodash in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Geogeo",
    "link": "/e/load/geogeo/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Geogeo in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Geoneondash",
    "link": "/e/load/geoneondash/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Geoneondash in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Geops1",
    "link": "/e/load/geops1/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Geops1 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Georash",
    "link": "/e/load/georash/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Georash in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Georgeandtheprinter",
    "link": "/e/load/georgeandtheprinter/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Georgeandtheprinter in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Geotrash",
    "link": "/e/load/geotrash/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Geotrash in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Getaway Shootout",
    "link": "/e/load/getaway-shootout/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Getaway Shootout in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Gimme The Airpod",
    "link": "/e/load/gimme-the-airpod/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Gimme The Airpod in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Glass City",
    "link": "/e/load/glass-city/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Glass City in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Gmonster",
    "link": "/e/load/gmonster/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Gmonster in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Go Ball",
    "link": "/e/load/go-ball/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Go Ball in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Goodnight",
    "link": "/e/load/goodnight/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Goodnight in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Goodnight Meowmie",
    "link": "/e/load/goodnight-meowmie/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Goodnight Meowmie in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Google Snake",
    "link": "/e/load/google-snake/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Google Snake in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Gravity Soccer",
    "link": "/e/load/gravity-soccer/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Gravity Soccer in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Greybox",
    "link": "/e/load/greybox/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Greybox in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Grindcraft",
    "link": "/e/load/grindcraft/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Grindcraft in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Hackertype",
    "link": "/e/load/hackertype/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Hackertype in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Handshakes",
    "link": "/e/load/handshakes/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Handshakes in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Happy Hop",
    "link": "/e/load/happy-hop/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Happy Hop in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Hardware Tycoon",
    "link": "/e/load/hardware-tycoon/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Hardware Tycoon in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Hba",
    "link": "/e/load/hba/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Hba in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Helicopter",
    "link": "/e/load/helicopter/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Helicopter in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Hexempire",
    "link": "/e/load/hexempire/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Hexempire in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Hextris",
    "link": "/e/load/hextris/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Hextris in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Highrisehop",
    "link": "/e/load/highrisehop/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Highrisehop in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Hill Climb Racing",
    "link": "/e/load/hill-climb-racing/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Hill Climb Racing in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Hungry Lamu",
    "link": "/e/load/hungry-lamu/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Hungry Lamu in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Iceagebaby",
    "link": "/e/load/iceagebaby/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Iceagebaby in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Iceagebaby2",
    "link": "/e/load/iceagebaby2/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Iceagebaby2 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Idle Shark",
    "link": "/e/load/idle-shark/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Idle Shark in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Idledices",
    "link": "/e/load/idledices/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Idledices in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Impossiblequiz",
    "link": "/e/load/impossiblequiz/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Impossiblequiz in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Invite The Blackbird",
    "link": "/e/load/invite-the-blackbird/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Invite The Blackbird in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Just Fall",
    "link": "/e/load/just-fall/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Just Fall in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Just One Boss",
    "link": "/e/load/just-one-boss/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Just One Boss in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Kitchen Gun Game",
    "link": "/e/load/kitchen-gun-game/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Kitchen Gun Game in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Kittencannon",
    "link": "/e/load/kittencannon/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Kittencannon in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Knife Master",
    "link": "/e/load/knife-master/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Knife Master in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Learntofly",
    "link": "/e/load/learntofly/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Learntofly in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Learntofly2",
    "link": "/e/load/learntofly2/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Learntofly2 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Level13",
    "link": "/e/load/level13/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Level13 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Linerider",
    "link": "/e/load/linerider/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Linerider in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Ltf Idle",
    "link": "/e/load/ltf-idle/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Ltf Idle in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Ltf3",
    "link": "/e/load/ltf3/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Ltf3 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Mario",
    "link": "/e/load/mario/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Mario in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Marvinspectrum",
    "link": "/e/load/marvinspectrum/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Marvinspectrum in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Matrixrampage",
    "link": "/e/load/matrixrampage/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Matrixrampage in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Mc2d",
    "link": "/e/load/mc2d/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Mc2d in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Minesweeper",
    "link": "/e/load/minesweeper/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Minesweeper in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Motox3m",
    "link": "/e/load/motox3m/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Motox3m in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Motox3m Pool",
    "link": "/e/load/motox3m-pool/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Motox3m Pool in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Motox3m Spooky",
    "link": "/e/load/motox3m-spooky/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Motox3m Spooky in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Motox3m Winter",
    "link": "/e/load/motox3m-winter/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Motox3m Winter in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Noob Steve Parkour",
    "link": "/e/load/noob-steve-parkour/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Noob Steve Parkour in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Pandemic2",
    "link": "/e/load/pandemic2/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Pandemic2 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Papaspizzaria",
    "link": "/e/load/papaspizzaria/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Papaspizzaria in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Poom",
    "link": "/e/load/poom/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Poom in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Roblox",
    "link": "/e/load/roblox/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Roblox in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Roblox copy",
    "link": "/e/load/roblox copy/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Roblox copy in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Soundboard",
    "link": "/e/load/soundboard/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Soundboard in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Stick Merge",
    "link": "/e/load/stick-merge/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Stick Merge in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "1v1lol",
    "link": "/e/load/1v1lol/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play 1v1lol in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "2048 Multitask",
    "link": "/e/load/2048-multitask/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play 2048 Multitask in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Adarkroom",
    "link": "/e/load/adarkroom/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Adarkroom in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Basketball Stars",
    "link": "/e/load/basketball-stars/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Basketball Stars in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Bitlife",
    "link": "/e/load/bitlife/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Bitlife in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Deal Or No Deal",
    "link": "/e/load/deal-or-no-deal/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Deal Or No Deal in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Doom",
    "link": "/e/load/doom/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Doom in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Drift Boss",
    "link": "/e/load/drift-boss/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Drift Boss in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Ducklife1",
    "link": "/e/load/ducklife1/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Ducklife1 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Ducklife2",
    "link": "/e/load/ducklife2/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Ducklife2 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Ducklife3",
    "link": "/e/load/ducklife3/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Ducklife3 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Earntodie",
    "link": "/e/load/earntodie/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Earntodie in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Google Feud",
    "link": "/e/load/google-feud/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Google Feud in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Happywheels",
    "link": "/e/load/happywheels/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Happywheels in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Interactivebuddy",
    "link": "/e/load/interactivebuddy/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Interactivebuddy in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Krunker",
    "link": "/e/load/krunker/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Krunker in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Madalin Stunt Cars 2",
    "link": "/e/load/madalin-stunt-cars-2/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Madalin Stunt Cars 2 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Madalin Stunt Cars 3",
    "link": "/e/load/madalin-stunt-cars-3/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Madalin Stunt Cars 3 in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Ovo",
    "link": "/e/load/ovo/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Ovo in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Papasburgeria",
    "link": "/e/load/papasburgeria/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Papasburgeria in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Slope",
    "link": "/e/load/slope/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Slope in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Smashkarts",
    "link": "/e/load/smashkarts/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Smashkarts in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Snowrider3d",
    "link": "/e/load/snowrider3d/index.html",
    "image": "",
    "categories": [
      "all",
      "local"
    ],
    "local": true,
    "description": "Play Snowrider3d in your browser and master its own set of levels, mechanics, and challenges."
  },
  {
    "name": "Polytrack",
    "link": "/e/polytrack/index.html",
    "image": "/e/polytrack/images/icon.svg",
    "categories": [
      "all",
      "local",
      "action"
    ],
    "local": true,
    "description": "Race low-poly cars, drift around tight corners, and build your own tracks in this Trackmania-inspired racer."
  },
  {
    "name": "Retro Bowl",
    "link": "/e/load/retro-bowl/index.html",
    "image": "/e/load/retro-bowl/img/icon.jpg",
    "categories": [
      "all",
      "local",
      "sports"
    ],
    "local": true,
    "description": "Manage your NFL franchise, build your roster, and lead your team to victory in this retro-style American football game."
  }
];
