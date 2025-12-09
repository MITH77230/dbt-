interface RiskResult {
  score: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  flags: string[];
}

export const analyzeRisk = (bankAcc: string, ifsc: string): RiskResult => {
  let score = 10; // Base Score
  const flags: string[] = [];

  // Rule 1: Suspicious Bank Account Patterns (e.g., "123456", "111111")
  if (/^(\d)\1+$/.test(bankAcc) || bankAcc === '1234567890' || bankAcc.length < 8) {
    score += 50;
    flags.push("Pattern Anomaly: Suspicious Account Number sequence");
  }

  // Rule 2: IFSC Validity Heuristic
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  if (!ifscRegex.test(ifsc)) {
    score += 30;
    flags.push("Data Integrity: Invalid IFSC Format");
  }

  // Rule 3: High-Risk Region Code (Simulation)
  if (ifsc.startsWith("TEST")) {
    score += 20;
    flags.push("Geo-Fencing: Restricted Banking Zone");
  }

  // Determine Level
  let level: RiskResult['level'] = 'LOW';
  if (score >= 80) level = 'CRITICAL';
  else if (score >= 50) level = 'HIGH';
  else if (score >= 30) level = 'MEDIUM';

  return { score, level, flags };
};