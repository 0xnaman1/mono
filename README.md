<img width="1766" height="1103" alt="Image" src="https://github.com/user-attachments/assets/422426fb-7a22-4156-82f8-02d85a55f684" />

## Overview

InTime lets you stake $1 and play a game with other people wearing **ETHGlobal NFC** bands where you compete against each other to sustain your HP and get ranked on the leaderboard.

When the game ends the person who managed to keep the max HP out of players participating will win the collectively staked amount.

## How to play?

Step 1: Go to our site, pick an upcoming game to participate, register for it by using your NFC and staking $1.

Step 2: 
When the game starts you get 100 HP, and your goal is to keep it as close to 100 as you can as it will keep decaying with time and if you choose not to do anything you’ll hit 0 HP and lose the game. 
So find any other participant of the same game, and battle with them by scanning your and the opponent’s NFC’s band.

One of you will get random increment from other person, yes you can also loose HP 🙁.

Step 3: At the end of the game, the person on top of leaderboard i.e the person with max HP at that time will win and receive all the staked amount.

## What did we use?

We used https://github.com/arx-research/libhalo package to interact with the NFC band. Apart from this, we used Pyth Entropy to generate random numbers to increase and decrease the health points and also choose a winner by random.
