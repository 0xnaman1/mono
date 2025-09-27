import { onchainTable } from "ponder";

export const games = onchainTable("games", (t) => ({
  id: t.text().primaryKey(),
  address: t.text().notNull(),
  owner: t.text().notNull(),
  name: t.text().notNull(),
  startTime: t.bigint().notNull(),
  endTime: t.bigint().notNull(),
  createdAt: t.bigint().notNull(),
}));

export const users = onchainTable("users", (t) => ({
  id: t.text().primaryKey(), // gameAddress:userAddress
  gameAddress: t.text().notNull(),
  userAddress: t.text().notNull(),
  xp: t.bigint().notNull(),
  registeredAt: t.bigint().notNull(),
}));

export const battles = onchainTable("battles", (t) => ({
  id: t.text().primaryKey(),
  gameAddress: t.text().notNull(),
  winner: t.text().notNull(),
  loser: t.text().notNull(),
  hp: t.bigint().notNull(),
  timestamp: t.bigint().notNull(),
}));

export const withdrawals = onchainTable("withdrawals", (t) => ({
  id: t.text().primaryKey(),
  gameAddress: t.text().notNull(),
  user: t.text().notNull(),
  amount: t.bigint().notNull(),
  timestamp: t.bigint().notNull(),
}));

export const usersHp = onchainTable("usersHp", (t) => ({
  id: t.text().primaryKey(),
  gameAddress: t.text().notNull(),
  userAddress: t.text().notNull(),
  hp: t.bigint().notNull(),
  lastUpdatedHpTime: t.bigint().notNull(),
}));
