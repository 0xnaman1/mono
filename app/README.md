# 🕐 InTime

InTime lets you stake 2$ and play a game with other people wearing ETHGlobal NFC bands where you compete against each other to sustain your HP and get ranked on the leaderboard.

When the game ends the person who managed to keep the max HP out of players participating will win the collectively staked amount.

## How to play?

**Step 1:** Go to our site, pick an upcoming game to participate, register for it by using your NFC and staking 2$.

**Step 2:**
When the game starts you get 100 HP, and your goal is to keep it as close to 100 as you can as it will keep decaying with time and if you choose not to do anything you'll hit 0 HP and lose the game.
So find any other participant of the same game, and battle with them by scanning your and the opponent's NFC's band.
One of you will get random increment from other person, yes you can also loose HP 🙁.

**Step 3:** At the end of the game, the person on top of leaderboard i.e the person with max HP at that time will win.

## Development

Link: https://mono-app-seven.vercel.app/

To run

```
pnpm install
pnpm dev
```

## TODO

- [ ] myhealth() hp - (current time - last updated time) / decay
- [ ] game info (start, end, progress, decay)

- [ ] only testnet base
- [ ] isRegistered()
