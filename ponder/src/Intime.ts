import { ponder } from "ponder:registry";
import { games, users, battles, withdrawals, usersHp } from "../ponder.schema";
import { eq } from "ponder";

ponder.on("Factory:GameCreated", async ({ event, context }) => {
  await context.db.insert(games).values({
    id: event.args.gameAddress,
    address: event.args.gameAddress,
    owner: event.args.owner,
    name: event.args.gameName,
    startTime: event.args.startTime,
    endTime: event.args.endTime,
    createdAt: event.block.timestamp,
  });
  
});

ponder.on("Intime:UserRegistered", async ({ event, context }) => {
  await context.db.insert(users).values({
    id: `${event.log.address}:${event.args.user}`,
    gameAddress: event.log.address,
    userAddress: event.args.user,
    xp: event.args.xp,
    registeredAt: event.block.timestamp,
  });

  // Initialize user's HP
  await context.db.insert(usersHp).values({
    id: `${event.log.address}:${event.args.user}`,
    gameAddress: event.log.address,
    userAddress: event.args.user,
    hp: event.args.xp, // Initialize HP with the same value as XP,
    lastUpdatedHpTime: event.block.timestamp,
  });
});

ponder.on("Intime:BattleResult", async ({ event, context }) => {
  await context.db.insert(battles).values({
    id: `${event.log.address}:${event.block.number}:${event.log.logIndex}`,
    gameAddress: event.log.address,
    winner: event.args.winner,
    loser: event.args.loser,
    hp: event.args.xpAmount,
    timestamp: event.block.timestamp,
  });

  // Update winner's HP (add xpAmount)
  await context.db
    .update(usersHp, { 
      id: `${event.log.address}:${event.args.winner}`
    })
    .set((row) => ({ hp: row.hp + event.args.xpAmount, lastUpdatedHpTime: event.block.timestamp }));

  // Update loser's HP (subtract xpAmount)
  await context.db
    .update(usersHp, { 
      id: `${event.log.address}:${event.args.loser}`
    })
    .set((row) => ({ hp: row.hp - event.args.xpAmount, lastUpdatedHpTime: event.block.timestamp }));
});

ponder.on("Intime:USDCWithdrawn", async ({ event, context }) => {
  await context.db.insert(withdrawals).values({
    id: `${event.log.address}:${event.block.number}:${event.log.logIndex}`,
    gameAddress: event.log.address,
    user: event.args.user,
    amount: event.args.amount,
    timestamp: event.block.timestamp,
  });
});


