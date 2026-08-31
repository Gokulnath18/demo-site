import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // Mirrors the "@/*" path in tsconfig.json. Plain `import` statements
  // resolve without this (SWC rewrites the specifier at transform time),
  // but a string passed to `jest.mock("@/...")` goes through Jest's own
  // resolver, which doesn't see tsconfig paths — per Next.js's Jest guide
  // (docs/app/guides/testing/jest.md, "Handling Absolute Imports and
  // Module Path Aliases"), this mapping is what makes that resolve too.
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);
