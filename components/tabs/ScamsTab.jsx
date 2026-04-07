"use client";

const QUESTIONS = [
  "Did they ask for gift cards, wire transfer, or your Social Security number?",
  "Did they say you'd be arrested, fined, or lose benefits if you don't act now?",
  "Did they ask you to keep the call secret from family or friends?",
  "Did they call you out of the blue — you weren't expecting this call?",
];

export default function ScamsTab({ scamAlerts, scamChecks, onScamCheck }) {
  const checkedCount = scamChecks.filter(Boolean).length;
  let resultClass = "checker-result";
  let resultText = "";
  if (checkedCount >= 2) {
    resultClass = "checker-result scam";
    resultText = "🚨 This is very likely a SCAM. Hang up immediately. Call Pampered Companion Care or a trusted family member.";
  } else if (checkedCount === 1) {
    resultClass = "checker-result scam";
    resultText = "⚠️ This call has warning signs. Do NOT share personal info. Hang up and verify by calling the organization directly.";
  }

  return (
    <div className="tab-panel">
      <div className="section-header">🚨 Scam Alerts</div>
      <div className="section-sub">Active warnings for scams targeting seniors in our area right now.</div>

      <div className="scam-list">
        {scamAlerts.map((scam) => (
          <div key={scam.id} className={`scam-card ${scam.level}`}>
            <div className="scam-level">{scam.level_label}</div>
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
            <input type="checkbox" checked={scamChecks[i]} onChange={() => onScamCheck(i)} />
            {q}
          </div>
        ))}
        {checkedCount > 0 && <div className={resultClass}>{resultText}</div>}
      </div>
    </div>
  );
}
