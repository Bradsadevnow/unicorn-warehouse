import "server-only";

import PDFDocument from "pdfkit";
import { getStarterHome } from "@/content/living";
import { getTokenBalances, type MemberAccount } from "@/content/memberAccount";
import { getEmployeeRecord } from "./employeeRecord";
import type { GameState } from "./gameState";
import { starterHomeAddress } from "./starterHomes";

const ink = "#321c48";
const dim = "#654c79";
const purple = "#74369a";
const lilac = "#f1e4fb";
const green = "#e7f8ed";
const left = 44;
const width = 524;
const footerY = 738;
const statusLabels = { posted: "Posted", spent: "Spent", pending: "Pending", held: "Held" };

// The built-in PDF fonts cover Western European text. Preserve the actual display name in the save.
function printable(text: string) {
  return text.normalize("NFC").replace(/[–—]/g, "-").replace(/[^\x20-\x7E\xA0-\xFF]/gu, (character) =>
    `[U+${character.codePointAt(0)!.toString(16).toUpperCase()}]`);
}

export async function writeMemberRecordsPdf(account: MemberAccount, game: GameState) {
  const document = new PDFDocument({
    size: "LETTER", margin: 0, autoFirstPage: false,
    info: { Title: "Member Records Request", Author: "Unicorn Warehouse Member Records", Subject: account.name },
  });
  const chunks: Buffer[] = [];
  const bytes = new Promise<Buffer>((resolve, reject) => {
    document.on("data", (chunk: Buffer) => chunks.push(chunk));
    document.once("end", () => resolve(Buffer.concat(chunks)));
    document.once("error", reject);
  });
  const balances = getTokenBalances(account);
  const employment = getEmployeeRecord(account);
  const ledger = [...account.ledger].sort((a, b) => a.date.localeCompare(b.date));
  let page = 0;
  let y = 0;

  const text = (value: string, x: number, top: number, size: number, color = ink, bold = false, options: PDFKit.Mixins.TextOptions = { lineBreak: false }) =>
    document.font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(size).fillColor(color).text(value, x, top, options);

  function addPage() {
    document.addPage();
    page += 1;
    document.rect(0, 0, 612, 132).fill(lilac);
    document.circle(544, 40, 40).fill("#ead4f7");
    document.circle(569, 63, 29).fill("#dbb8ef");
    document.moveTo(568, 30).lineTo(573, 48).lineTo(591, 54).lineTo(573, 59)
      .lineTo(568, 78).lineTo(562, 59).lineTo(544, 54).lineTo(562, 48).closePath().fill("#fff9fe");
    text("UNICORN WAREHOUSE  /  MEMBER RECORDS", left, 30, 9, purple, true, { characterSpacing: 1.4, lineBreak: false });
    text(page === 1 ? "Member Records Request" : "Token statement, continued", left, 54, 30, ink, true);
    text(`${account.id}   /   Account day ${account.date}`, left, 101, 11, dim);

    document.moveTo(left, footerY).lineTo(left + width, footerY).lineWidth(1).stroke("#dfc8e8");
    text("Keep this original statement to reopen your account.", left, footerY + 14, 9, dim);
    text(`Page ${page}`, left + width - 65, footerY + 14, 9, dim, false, { width: 65, align: "right" });
    y = 155;
  }

  function tableHeader() {
    document.roundedRect(left, y, width, 26, 6).fill(lilac);
    text("DATE", left + 9, y + 8, 8, purple, true);
    text("TRANSACTION", left + 99, y + 8, 8, purple, true);
    text("STATUS", left + 379, y + 8, 8, purple, true);
    text("TOKENS", left + 460, y + 8, 8, purple, true, { width: 54, align: "right" });
    y += 31;
  }

  addPage();
  text("PREPARED FOR", left, y, 9, purple, true);
  const name = printable(account.name);
  const nameOptions = { width, lineGap: 2 };
  text(name, left, y + 17, 23, ink, true, nameOptions);
  y += document.heightOfString(name, nameOptions) + 24;
  text(`${printable(employment.position.title)}  /  ${printable(employment.track.name)}  /  ${printable(employment.hornRank.title)}`,
    left, y, 11, dim, false, { width });
  y += 22;
  const home = getStarterHome(game.home?.homeId);
  if (home) {
    text(`${printable(starterHomeAddress(home))}  /  ${printable(home.name)}  /  ${home.weeklyRent} Tokens weekly`, left, y, 11, dim, false, { width });
    y += 22;
  }
  const completed = game.objectives.filter((objective) => objective.completed).length;
  text(`${completed} of ${game.objectives.length} onboarding objectives complete`, left, y, 10, dim);
  y += 27;

  const cards = [
    ["Available", balances.available, green],
    ["Pending", balances.pending, lilac],
    ["Held", balances.held, lilac],
    ["Spent", balances.spent, lilac],
  ] as const;
  for (const [index, [label, amount, color]] of cards.entries()) {
    const x = left + index * 133;
    document.roundedRect(x, y, 125, 62, 9).fill(color);
    text(label, x + 13, y + 11, 10, dim, true);
    text(amount.toLocaleString("en-US"), x + 13, y + 29, 22, ink, true);
  }
  y += 82;
  text("Token statement", left, y, 17, ink, true);
  y += 26;
  tableHeader();

  for (const [index, entry] of ledger.entries()) {
    const label = printable(entry.label);
    const options = { width: 265, lineGap: 2 };
    const height = Math.max(26, document.font("Helvetica").fontSize(10).heightOfString(label, options) + 14);
    if (y + height > footerY - 16) {
      addPage();
      tableHeader();
    }
    if (index % 2 === 0) document.roundedRect(left, y, width, height, 4).fill("#fbf6fc");
    text(entry.date, left + 9, y + 8, 9, dim);
    text(label, left + 99, y + 7, 10, ink, false, options);
    text(statusLabels[entry.status], left + 379, y + 8, 9, dim);
    const sign = entry.status === "posted" ? "+" : entry.status === "spent" ? "-" : "";
    text(sign + entry.amount.toLocaleString("en-US"), left + 450, y + 7, 10, ink, true, { width: 64, align: "right" });
    y += height;
  }

  document.end();
  return bytes;
}
