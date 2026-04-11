import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const claudeArticle = readFileSync("convex/seedArticleWordPressClaude.ts", "utf8");
const openClawArticle = readFileSync("convex/seedArticleOpenClaw.ts", "utf8");

test("WordPress Claude MCP article links to relevant ZeroToAIAgents pages", () => {
  assert.match(
    claudeArticle,
    /https:\/\/zerotoaiagents\.com\/reviews\/claude-code/,
    "Expected the Claude MCP article to link to the Claude Code review"
  );
  assert.match(
    claudeArticle,
    /https:\/\/zerotoaiagents\.com\/guides\/ai-coding-agent-statistics/,
    "Expected the Claude MCP article to link to the AI coding agent statistics guide"
  );
});

test("OpenClaw WordPress article links to relevant ZeroToAIAgents pages", () => {
  assert.match(
    openClawArticle,
    /https:\/\/zerotoaiagents\.com\/reviews\/claude-code/,
    "Expected the OpenClaw article to link to the Claude Code review"
  );
  assert.match(
    openClawArticle,
    /https:\/\/zerotoaiagents\.com\/reviews\/cursor/,
    "Expected the OpenClaw article to link to the Cursor review"
  );
  assert.match(
    openClawArticle,
    /https:\/\/zerotoaiagents\.com\/guides\/ai-coding-agent-statistics/,
    "Expected the OpenClaw article to link to the AI coding agent statistics guide"
  );
});
