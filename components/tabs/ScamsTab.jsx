"use client";

const SCAMS = [
  {
    level: "high",
    levelLabel: "⚠️ High Alert — Active Now",
    title: "Medicare Card Replacement Scam",
    body: "Callers claiming to be Medicare say your card is expiring and they need your Social Security number and bank info to send a new one. Medicare will NEVER call you asking for this.",
    rule: "🛑 Rule: Hang up. Call Medicare directly at 1-800-MEDICARE.",
  },
  {
    level: "high",
    levelLabel: "⚠️ High Alert — Spreading Fast",
    title: "Grandchild Emergency Scam",
    body: "You receive a frantic call from someone pretending to be your grandchild saying they're in trouble and need you to wire money or buy gift cards immediately. They ask you not to tell anyone.",
    rule: "🛑 Rule: Hang up and call your grandchild directly on their real number.",
  },
  {
    level: "medium",
    levelLabel: "⚡ Medium Alert",
    title: "Computer Virus Pop-Up Scam",
    body: "A scary pop-up says your computer has a virus and tells you to call a number immediately. This is fake. Closing the window or turning off your computer will fix it.",
    rule: "💡 Rule: Close the browser. Don't call the number. Call Pampered Companion Care if you need help.",
  },
  {
    level: "medium",
    levelLabel: "⚡ Medium Alert",
    title: "IRS Tax Debt Phone Call",
    body: "Callers say you owe back taxes and will be arrested if you don't pay immediately by gift card or wire transfer. The real IRS only contacts you by mail first.",
    rule: "💡 Rule: The IRS never calls first. Hang up immediately.",
  },
];

const QUESTIONS = [
  "Did they ask for gift cards, wire transfer, or your Social Security number?",
  "Did they say you'd be arrested, fined, or lose benefits if you don't act now?",
  "Did they ask you to keep the call secret from family or friends?",
  "Did they call you out of the blue — you weren't expecting this call?",
];

export default function ScamsTab({ scamChecks, onScamCheck }) {
  const checkedCount = scamChecks.filter(Boolean).length;
  let resultClass = "checker-result";
  let resultText = "";
  if (checkedCount >= 2) {
    resultClass = "checker-result scam";
    resultText =
      "🚨 This is very likely a SCAM. Hang up immediately. Call Pampered Companion Care or a trusted family member.";
  } else if (checkedCount === 1) {
    resultClass = "checker-result scam";
    resultText =
      "⚠️ This call has warning signs. Do NOT share personal info. Hang up and verify by calling the organization directly.";
  }

  return (
    <div className="tab-panel">
      <div className="section-header">🚨 Scam Alerts</div>
      <div className="section-sub">
        Active warnings for scams targeting seniors in our area right now.
      </div>

      <div className="scam-list">
        {SCAMS.map((scam) => (
          <div key={scam.title} className={`scam-card ${scam.level}`}>
            <div className="scam-level">{scam.levelLabel}</div>
            <div className="scam-title">{scam.title}</div>
            <div className="scam-body">{scam.body}</div>
            <div className="scam-rule">{scam.rule}</div>
          </div>
        ))}
      </div>

      <div className="divider-label">Suspicious Call Checker</div>
      <div className="checker-box">
        <div className="checker-title">🤔 Not Sure If a Call Is a Scam?</div>
        {QUESTIONS.map((q, i) => (
          <div key={i} className="checker-q">
            <input
              type="checkbox"
              checked={scamChecks[i]}
              onChange={() => onScamCheck(i)}
            />
            {q}
          </div>
        ))}
        {checkedCount > 0 && (
          <div className={resultClass}>{resultText}</div>
        )}
      </div>
    </div>
  );
}
