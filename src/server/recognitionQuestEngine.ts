import "server-only";

import { recognitionQuests, type QuestInteraction } from "@/content/recognitionQuests";
import type { MemberAccount } from "@/content/memberAccount";
import { getEmployeeRecord } from "./employeeRecord";
import { objectiveComplete, type GameState } from "./gameState";

export function getRecognitionQuest(id: string) {
  return recognitionQuests.find((quest) => quest.id === id);
}

export function getQuestInteraction(questId: string, interactionId: string) {
  return getRecognitionQuest(questId)?.interactions.find(({ id }) => id === interactionId);
}

export function questInteractionComplete(game: GameState, questId: string, interactionId: string) {
  return game.questFlags[`${questId}:${interactionId}`] === true;
}

export function questInteractionStatus(game: GameState, questId: string, interaction: QuestInteraction, qualifyingShifts: number) {
  if (questInteractionComplete(game, questId, interaction.id)) return "complete";
  if (!objectiveComplete(game, "buy-kit")) return "locked";
  const eligible = interaction.requires.every((condition) => {
    if ("flag" in condition) return questInteractionComplete(game, questId, condition.flag);
    if ("item" in condition) return (game.inventory[condition.item] ?? 0) > 0;
    if ("rank" in condition) return game.employment.hornRank === condition.rank;
    return qualifyingShifts >= condition.qualifyingShifts;
  });
  return eligible ? "ready" : "locked";
}

export function applyQuestInteraction(game: GameState, account: MemberAccount, questId: string, interactionId: string, answer?: string) {
  const interaction = getQuestInteraction(questId, interactionId);
  if (!interaction) return "This desk has no record of that interaction.";
  const counted = getEmployeeRecord(account).qualifyingShifts.counted.length;
  const status = questInteractionStatus(game, questId, interaction, counted);
  if (status === "complete") return "That part of your fitting is already on file.";
  if (status === "locked") return "The desk is still waiting for your earlier records or shift qualifications.";
  if (interaction.choices && answer !== interaction.choices.correct) return interaction.choices.rejected;

  for (const item of interaction.consumes ?? []) {
    const remaining = game.inventory[item] - 1;
    if (remaining > 0) game.inventory[item] = remaining;
    else delete game.inventory[item];
  }
  for (const item of interaction.grants ?? []) game.inventory[item] = (game.inventory[item] ?? 0) + 1;
  game.questFlags[`${questId}:${interaction.id}`] = true;
  if (interaction.awardRank) game.employment = { ...game.employment, hornRank: interaction.awardRank };
}
