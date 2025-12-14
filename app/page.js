"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";

export const ritualFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

/* ---------------- ROLES ---------------- */

const ROLES = [
  "Community",
  "Blessed or Cursed",
  "Ascendant",
  "Ritty-Bitty",
  "Ritty",
  "Ritualist",
  "Zealot",
];

/* ---------------- SHUFFLE HELPERS ---------------- */

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const prepareQuestions = (qs) =>
  qs.map((q) => {
    const correct = q.options[q.a];
    const options = shuffle(q.options);
    return { q: q.q, options, a: options.indexOf(correct) };
  });

/* ---------------- MIXED QUESTION SETS ---------------- */

/* Community + Blessed or Cursed */
const ENTRY = [
  { q: "Why does Ritual exist?", options: ["Centralized AI infrastructure is broken", "To reduce gas fees", "To build NFTs", "To replace wallets"], a: 0 },
  { q: "Ritual connects blockchains with?", options: ["AI", "Gaming", "Social feeds", "Payments"], a: 0 },
  { q: "Which value matters most to Ritual?", options: ["Censorship resistance", "Speculation", "Closed access", "Speed only"], a: 0 },
  { q: "Ritual is best described as?", options: ["Open AI infrastructure network", "AI company", "GPU marketplace", "Wallet"], a: 0 },
  { q: "Who is Ritual mainly built for?", options: ["Builders", "Traders", "Influencers", "Validators"], a: 0 },
  { q: "AI today mostly relies on?", options: ["Centralized APIs", "On-chain compute", "DA layers", "Rollups"], a: 0 },
  { q: "Ritual helps smart contracts use?", options: ["AI capabilities", "NFT royalties", "Bridges", "Faster swaps"], a: 0 },
  { q: "Ritual believes AI should be?", options: ["Permissionless", "Closed", "Geo-restricted", "Opaque"], a: 0 },
  { q: "Ritual challenges which status quo?", options: ["Centralized AI control", "Open source", "Composability", "DeFi"], a: 0 },
  { q: "Ritual’s long-term goal is decentralizing?", options: ["Artificial Intelligence", "Liquidity", "Trading", "Wallets"], a: 0 },
];

/* Ascendant */
const ASCENDANT = [
  { q: "Why is AI hard to run fully on-chain?", options: ["Compute cost", "Smart contract bugs", "Wallet UX", "Consensus rules"], a: 0 },
  { q: "Ritual acts as a bridge between?", options: ["On-chain logic & off-chain compute", "NFTs & wallets", "L1 & L2", "DA & consensus"], a: 0 },
  { q: "Which AI workload does Ritual focus on first?", options: ["Inference", "Training", "Scraping", "Labeling"], a: 0 },
  { q: "Ritual reduces trust by making AI outputs?", options: ["Verifiable", "Faster", "Cheaper", "Private"], a: 0 },
  { q: "Ritual avoids dependence on?", options: ["Centralized AI APIs", "Validators", "Users", "Sequencers"], a: 0 },
  { q: "Ritual fits into which infra trend?", options: ["Modular systems", "Monolithic chains", "Closed stacks", "Permissioned AI"], a: 0 },
  { q: "Ritual makes AI compute?", options: ["Composable", "Opaque", "Static", "Closed"], a: 0 },
  { q: "Ritual returns what to blockchains?", options: ["Verified AI results", "Raw models", "APIs", "Logs"], a: 0 },
  { q: "Ritual improves which property most?", options: ["Trust minimization", "UI polish", "Gas fees", "Latency"], a: 0 },
  { q: "Ascendant means understanding?", options: ["The problem + direction", "Tokenomics", "Low-level internals", "Marketing"], a: 0 },
];

/* Ritty-Bitty */
const RITTY_BITTY = [
  { q: "What is Infernet?", options: ["Decentralized compute network", "Rollup", "Wallet", "Storage layer"], a: 0 },
  { q: "Infernet exists mainly for?", options: ["AI workloads", "Consensus", "Payments", "Storage"], a: 0 },
  { q: "Why is Infernet off-chain?", options: ["Compute efficiency", "UX", "Regulation", "Latency"], a: 0 },
  { q: "Infernet outputs are delivered?", options: ["Back on-chain", "Via API", "Via UI", "Off-ledger"], a: 0 },
  { q: "Infernet nodes are?", options: ["Permissionless", "Enterprise-only", "Private", "Foundation-run"], a: 0 },
  { q: "Infernet reduces reliance on?", options: ["Centralized servers", "Wallets", "RPCs", "DA layers"], a: 0 },
  { q: "Infernet connects?", options: ["Web2 AI & Web3", "L1 & L2", "NFTs & DeFi", "DA & consensus"], a: 0 },
  { q: "Infernet prioritizes?", options: ["Trust minimization", "Speed only", "Cost only", "UX only"], a: 0 },
  { q: "Infernet supports which task best?", options: ["ML inference", "Training", "Governance", "Storage"], a: 0 },
  { q: "Ritty-Bitty implies understanding?", options: ["High-level architecture", "Just vision", "Marketing", "Tokenomics"], a: 0 },
];

/* Ritty */
const RITTY = [
  { q: "What is the Ritual Superchain?", options: ["AI coprocessor for blockchains", "L2", "Wallet mesh", "Oracle"], a: 0 },
  { q: "Why does Ritual need a coprocessor?", options: ["AI compute is heavy", "Gas is expensive", "Validators are slow", "Storage is limited"], a: 0 },
  { q: "EVM++ is?", options: ["Backward-compatible EVM extension", "New VM", "Sidechain", "Rollup"], a: 0 },
  { q: "Stateful Precompiles exist because?", options: ["AI needs optimized operations", "NFTs need storage", "Tokens need speed", "Voting needs privacy"], a: 0 },
  { q: "Ritual execution model is?", options: ["Heterogeneous", "Monolithic", "Static", "Single-purpose"], a: 0 },
  { q: "Scheduling removes reliance on?", options: ["External keepers", "Validators", "DA layers", "Bridges"], a: 0 },
  { q: "Ritual pricing is based on?", options: ["Compute complexity", "Gas only", "Blockspace", "Token supply"], a: 0 },
  { q: "Ritual allows developers to choose?", options: ["Different guarantees", "Token prices", "Validators", "Chains"], a: 0 },
  { q: "Ritty means understanding?", options: ["Execution design", "Just names", "Marketing", "Community"], a: 0 },
  { q: "Ritual enables which apps?", options: ["AI-native dApps", "Only DeFi", "Only NFTs", "Only games"], a: 0 },
];

/* Ritualist */
const RITUALIST = [
  { q: "What does Resonance handle?", options: ["Fee markets for compute", "Consensus", "Storage", "Sequencing"], a: 0 },
  { q: "Why is gas pricing insufficient for AI?", options: ["AI compute varies widely", "Gas is cheap", "Blocks are slow", "Validators refuse AI"], a: 0 },
  { q: "What ensures AI integrity?", options: ["Proof systems", "Validators", "Wallets", "RPCs"], a: 0 },
  { q: "Why is verifiability critical?", options: ["Trust minimization", "UX", "Speed", "Marketing"], a: 0 },
  { q: "vTune focuses on?", options: ["Model provenance", "Gas pricing", "Consensus", "Sequencing"], a: 0 },
  { q: "Ritual treats models as?", options: ["First-class objects", "APIs", "Black boxes", "Files"], a: 0 },
  { q: "Why multiple proof systems?", options: ["Different workloads need different guarantees", "Cheaper fees", "Faster blocks", "Simpler UX"], a: 0 },
  { q: "Ritual optimizes for?", options: ["Long-term AI sustainability", "Speculation", "Fast trading", "High leverage"], a: 0 },
  { q: "Ritualist implies understanding?", options: ["Economics + guarantees", "Only vision", "Only architecture", "Only community"], a: 0 },
  { q: "Ritual enables which future?", options: ["Trust-minimized AI", "Closed AI", "Centralized inference", "Permissioned compute"], a: 0 },
];

/* Zealot */
const ZEALOT = [
  { q: "Why is AI the next blockchain bottleneck?", options: ["Compute & trust", "Gas fees", "Storage", "Wallet UX"], a: 0 },
  { q: "Ritual’s biggest unlock is?", options: ["Composable AI execution", "Cheaper inference", "Better UI", "More tokens"], a: 0 },
  { q: "Why must AI infra be decentralized?", options: ["Alignment & censorship resistance", "Speed", "Marketing", "Speculation"], a: 0 },
  { q: "Ritual’s trust model is?", options: ["Cryptographic", "Reputation-based", "Enterprise-based", "Social"], a: 0 },
  { q: "Why is heterogeneous compute unavoidable?", options: ["AI workloads differ", "Gas is expensive", "Chains are slow", "Storage is limited"], a: 0 },
  { q: "What breaks without compute-aware pricing?", options: ["Sustainable AI execution", "NFT minting", "Governance", "Consensus"], a: 0 },
  { q: "Ritual is closest to?", options: ["General-purpose AI execution layer", "Single-use protocol", "Vertical app", "Centralized service"], a: 0 },
  { q: "Ritual’s long-term impact is on?", options: ["How intelligence is deployed", "Gas markets", "Wallet UX", "Speculation"], a: 0 },
  { q: "Zealot implies reasoning about?", options: ["System-wide tradeoffs", "Features", "Branding", "Community"], a: 0 },
  { q: "Ritual ultimately enables?", options: ["Permissionless intelligence", "Closed AI", "Centralized inference", "Enterprise-only models"], a: 0 },
];

/* MAP */
const RAW_QUESTIONS = {
  Community: ENTRY,
  "Blessed or Cursed": ENTRY,
  Ascendant: ASCENDANT,
  "Ritty-Bitty": RITTY_BITTY,
  Ritty: RITTY,
  Ritualist: RITUALIST,
  Zealot: ZEALOT,
};
const restartQuiz = () => {
  setStep("start");
  setDiscord("");
  setRole("");
  setIndex(0);
  setScore(0);
  setQuestions([]);
  setSelected(null);
  setLocked(false);
};


/* ---------------- COMPONENT ---------------- */

export default function RitualQuiz() {
  const [step, setStep] = useState("start");
  const [discord, setDiscord] = useState("");
  const [role, setRole] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [profileLabel, setProfileLabel] = useState("Node");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  /* -------- PREPARE QUESTIONS -------- */
  useEffect(() => {
    if (!role) return;

    setQuestions(prepareQuestions(RAW_QUESTIONS[role]));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setLocked(false);
  }, [role]);

  const current = questions[index];
  const total = questions.length;
  const progress = total ? ((index + 1) / total) * 100 : 0;
  const canStart = discord.trim() && role;

  /* -------- LEVEL -------- */
  const getLevel = () => {
    const percent = total ? (score / total) * 100 : 0;
    if (percent >= 90) return "Protocol Architect";
    if (percent >= 75) return "Infra Builder";
    if (percent >= 50) return "Network Operator";
    return "Curious Newbie";
  };
  const level = getLevel();

  /* -------- ANSWER -------- */
  const handleAnswer = (i) => {
    if (locked) return;
    setSelected(i);
    setLocked(true);

    if (i === current.a) setScore((s) => s + 1);

    setTimeout(() => {
      setSelected(null);
      setLocked(false);
      if (index + 1 < total) setIndex((v) => v + 1);
      else setStep("result");
    }, 650);
  };

  /* -------- PROFILE -------- */
  const handleProfileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImg(URL.createObjectURL(file));
    setProfileLabel("Custom");
  };

  /* -------- SHARE -------- */
  const shareOnX = () => {
    const tweet = `Ritual Net Knowledge Check

Name: ${discord}
Role: ${role}
Level: ${level}
Score: ${score}/${total}

Decentralized AI is inevitable.
Built by @devarshi8539`;

    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`,
      "_blank"
    );
  };

  /* -------- RESTART -------- */
  const restartQuiz = () => {
    setStep("start");
    setDiscord("");
    setRole("");
    setProfileImg(null);
    setProfileLabel("Node");
    setIndex(0);
    setScore(0);
    setQuestions([]);
    setSelected(null);
    setLocked(false);
  };

  return (
    <div
      className={`min-h-screen ${inter.className}
      bg-[radial-gradient(1200px_600px_at_50%_-200px,#e0e7ff,transparent),linear-gradient(to_bottom,#ffffff,#f8fafc)]
      text-slate-900`}
    >
      {/* NAVBAR */}
      <header className="fixed top-4 inset-x-0 z-40 flex justify-center">
        <div className="w-[92%] max-w-4xl bg-white border rounded-2xl px-5 py-4 shadow-md">
          <div className="flex items-center justify-center gap-2">
            <img src="/logo.png" className="w-10 h-10 rounded-lg" />
            <span className={`${ritualFont.className} text-3xl font-semibold text-indigo-900`}>
              Ritual
            </span>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center px-4 pt-36 pb-24">
        {/* START */}
        {step === "start" && (
          <div className="w-full max-w-md bg-white border rounded-3xl p-8 shadow-lg space-y-6">
            <h1 className="text-xl font-semibold text-center text-indigo-900">
              Ritual Net Knowledge Check
            </h1>

            {/* PROFILE */}
            <div className="space-y-3 text-center">
              {profileImg && (
                <img src={profileImg} className="w-16 h-16 rounded-full mx-auto border" />
              )}

            </div>

            <input
              className="w-full p-4 rounded-xl border"
              placeholder="Username (required)"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
            />

            <select
              className="w-full p-4 rounded-xl border"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role (required)</option>
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
<div className="text-center">
   {!profileImg && (
                <label className="block cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleProfileUpload} className="hidden" />
                  <div className="inline-block px-4 py-2 rounded-xl border-2 border-slate-300 text-sm text-slate-500 hover:border-indigo-400 hover:bg-indigo-50">
                    Choose Profile
                  </div>
                </label>
              )}
</div>
             
            <button
              disabled={!canStart}
              onClick={() => setStep("quiz")}
              className={`w-full py-4 rounded-xl font-medium ${
                canStart ? "bg-indigo-600 text-white" : "bg-indigo-200 text-white"
              }`}
            >
              Start Knowledge Check
            </button>
          </div>
        )}

        {/* QUIZ (THIS WAS MISSING ❗) */}
        {step === "quiz" && current && (
          <div className="w-full max-w-2xl bg-white border rounded-3xl p-8 shadow-lg space-y-6">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-indigo-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-sm text-slate-500">
              {role} · Question {index + 1} of {total}
            </p>

            <h2 className="text-lg font-medium">{current.q}</h2>

            <div className="space-y-3">
              {current.options.map((o, i) => {
                let style =
                  "border-slate-300 hover:border-indigo-400";

                if (selected !== null) {
                  if (i === current.a) style = "bg-emerald-500 text-white border-emerald-500";
                  else if (i === selected) style = "bg-rose-500 text-white border-rose-500";
                }

                return (
                  <button
                    key={i}
                    disabled={locked}
                    onClick={() => handleAnswer(i)}
                    className={`w-full p-4 rounded-xl border text-left transition ${style}`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && (
          <div className="w-full max-w-md bg-white border rounded-3xl p-8 shadow-lg text-center space-y-4">
            {profileImg && (
              <img src={profileImg} className="w-20 h-20 rounded-full mx-auto" />
            )}

            <p className="font-medium">{discord}</p>
            <p className="text-sm text-slate-500">{role}</p>
            <p className="text-sm">Level · {level}</p>
            <p className="font-semibold">Score · {score}/{total}</p>

            <button onClick={shareOnX} className="w-full bg-black text-white py-3 rounded-xl">
              Share on X
            </button>

            <button onClick={restartQuiz} className="w-full bg-indigo-600 text-white py-3 rounded-xl">
              Restart Quiz
            </button>
          </div>
        )}
      </main>
    </div>
  );
}














