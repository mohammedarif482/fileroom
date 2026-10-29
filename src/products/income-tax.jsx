import { Scribble } from '../components/ui.jsx';
import { digits, inr } from '../utils.js';

// FY 2025-26 (AY 2026-27) slabs as [upper limit, rate]
const OLD_SLABS = [[250000, 0], [500000, 0.05], [1000000, 0.2], [Infinity, 0.3]];
const NEW_SLABS = [[400000, 0], [800000, 0.05], [1200000, 0.1], [1600000, 0.15], [2000000, 0.2], [2400000, 0.25], [Infinity, 0.3]];

const SALARY = 1800000;

// Slab tax plus 4% cess. No rebate applies at this income.
const taxOn = (income, slabs) => {
  let tax = 0;
  let floor = 0;
  for (const [limit, rate] of slabs) {
    if (income > floor) tax += (Math.min(income, limit) - floor) * rate;
    floor = limit;
  }
  return Math.round(tax * 1.04);
};

const NEW_TAX = taxOn(SALARY - 75000, NEW_SLABS);

export default {
  key: 'income-tax',
  name: 'Income Tax',
  short: 'income tax',
  region: 'India',
  label: 'Income Tax',
  path: '/income-tax/',
  sub: 'ITR-1, 2 and 4, both regimes',
  blurb: 'Check Form 16 against AIS, compare both regimes and file ITR-1, 2 or 4.',
  chips: ['ITR-1', 'ITR-2', 'ITR-4', 'AIS', 'Challan 280'],
  ask: "I'd like to book a demo of your income tax practice portal",

  hero: {
    title: <>Old regime or new? Your students should know before the client <Scribble>asks.</Scribble></>,
    lede: "Fileroom's income tax room is a practice e-filing portal. Students check Form 16 against AIS, claim deductions, compare both regimes and file ITR-1, 2 or 4, all with practice data.",
    facts: [
      ['ITR-1, 2 and 4', 'salary, capital gains and presumptive business'],
      ['Both regimes', 'worked out for every return'],
      ['E-verified', 'with a practice OTP and an acknowledgement'],
    ],
  },

  sim: {
    tab: 'ITR-1',
    form: 'ITR-1',
    period: 'AY 2026-27',
    entity: { initials: 'PN', name: 'Priya Nair', idLabel: 'PAN', id: 'ABKPN4821Q' },
    itemsLabel: 'Deductions on a ₹18 lakh salary',
    items: [
      { no: 'HRA', party: 'Rent exemption', value: 290000 },
      { no: '80C', party: 'PPF and ELSS', value: 150000 },
      { no: '24(b)', party: 'Home loan interest', value: 200000 },
      { no: '80D', party: 'Health insurance', value: 25000 },
    ],
    fmt: inr,
    refLabel: 'Ack',
    newRef: () => digits(15),
    hint: 'With every deduction the old regime wins. Untick 80D and the new one does. Pick, then file.',
    callback: "You just chose a regime for Priya Nair. Your students will do it for every client, every July.",
    compute(rows) {
      const deductions = rows.reduce((s, r) => s + r.value, 0);
      const old = taxOn(Math.max(0, SALARY - 50000 - deductions), OLD_SLABS);
      const oldWins = old < NEW_TAX;
      const saving = Math.abs(old - NEW_TAX);
      const result = saving
        ? `The ${oldWins ? 'old' : 'new'} regime saves ${inr(saving)}. ITR-1 filed and e-verified.`
        : 'Both regimes come to the same tax. ITR-1 filed and e-verified.';
      return {
        split: [['Deductions', deductions], ['Old regime', old], ['New regime', NEW_TAX]],
        total: [`Tax for the year, ${oldWins ? 'old' : 'new'} regime`, Math.min(old, NEW_TAX)],
        result,
      };
    },
  },

  compare: {
    title: 'Most ITR classes file',
    dim: 'one easy return.',
    lede: "Real clients bring a Form 16 that doesn't match AIS, three deductions with missing proof and a question about which regime to pick. Fileroom gives students those clients.",
    rows: [
      ['One taxpayer, one regime', 'Both regimes worked out side by side for every return'],
      ['Form 16 handed over as a PDF', 'Form 16, AIS and 26AS that students check against each other first'],
      ['Filing ends at "submit"', 'E-verification and an acknowledgement, as on the portal'],
      ['ITR-1 only', 'ITR-1, ITR-2 and ITR-4 cases'],
      ["The teacher can't see who did what", 'Every return, computation and mistake visible per student'],
    ],
  },

  cycle: {
    title: "A client's return, start to finish.",
    lede: 'What a tax practitioner does for every salaried client in July. Students do it for a practice client and watch the tax change at each step.',
    entity: { initials: 'PN', name: 'Priya Nair', period: 'AY 2026-27' },
    fmt: inr,
    steps: [
      { title: 'Read Form 16, AIS and 26AS', body: 'Salary, TDS and interest come from the documents a real client would hand over. Students check them against each other first.' },
      { title: 'Claim deductions', body: 'HRA, 80C, home loan interest, health insurance. Each one has a limit, and each one needs proof.' },
      { title: 'Pick the regime', body: 'The portal works out both. Students see which one is lower, and why.' },
      { title: 'File and e-verify', body: 'The return is submitted, verified with a practice OTP, and an acknowledgement is issued.' },
    ],
    rows: [
      ['income', 'Gross salary', 'From Form 16'],
      ['deductions', 'Deductions', 'Old regime only'],
      ['tax', 'Tax payable', 'Including 4% cess'],
    ],
    statuses: [['ITR-1 filed', 'ITR-1 not filed'], ['E-verified', 'Not verified']],
    states: [
      { values: { income: 1800000, deductions: 0, tax: 0 }, hot: 'income', done: [false, false], note: 'Form 16 matches AIS. Salary of ₹18,00,000, nothing missing.' },
      { values: { income: 1800000, deductions: 665000, tax: 0 }, hot: 'deductions', done: [false, false], note: 'Four deductions claimed, ₹6,65,000 in all.' },
      { values: { income: 1800000, deductions: 665000, tax: 143520 }, hot: 'tax', done: [false, false], note: 'Old regime ₹1,43,520, new regime ₹1,50,800. The old one saves ₹7,280.' },
      { values: { income: 1800000, deductions: 665000, tax: 143520 }, hot: null, done: [true, true], note: 'Filed and e-verified. Acknowledgement 284019374651027.' },
    ],
  },

  coverage: {
    title: 'Every return a practitioner files in July.',
    lede: 'From a first PAN to an updated return, for salaried people, investors and small businesses.',
    groups: [
      {
        title: 'Returns', icon: 'calendar',
        forms: [
          ['ITR-1', 'Salary, one house, interest'],
          ['ITR-2', 'Capital gains, more than one house'],
          ['ITR-4', 'Presumptive business income'],
          ['Revised return', 'Fixing a filed return'],
          ['ITR-U', 'Updated return'],
        ],
      },
      {
        title: 'Registration', icon: 'doc',
        forms: [
          ['PAN', 'New application'],
          ['e-Filing account', 'Registering and logging in'],
          ['Profile', 'Bank account and contact details'],
        ],
      },
      {
        title: 'Computation', icon: 'pillar',
        forms: [
          ['Regimes', 'Old and new, side by side'],
          ['Deductions', '80C, 80D, HRA, 24(b)'],
          ['Capital gains', 'Short and long term'],
          ['Advance tax', 'Instalments and interest'],
        ],
      },
      {
        title: 'Documents and payments', icon: 'card',
        forms: [
          ['Form 16', 'From the employer'],
          ['AIS / 26AS', 'What the department already knows'],
          ['Challan 280', 'Self-assessment and advance tax'],
          ['E-verification', 'OTP and acknowledgement'],
          ['Refund status', 'Tracking what is owed back'],
        ],
      },
    ],
  },

  dash: {
    title: 'ITR',
    range: 'Four client cases',
    periods: ['Salary', 'House', 'Gains', 'Business'],
    late: 'late fee charged',
    task: '"File Priya Nair\'s ITR-1 under whichever regime costs her less."',
  },

  pricing: 'The income tax room on its own. Every plan includes ITR-1, 2 and 4, the instructor panel and updates after every budget.',

  faqs: [
    ['Is it connected to the e-filing portal?', 'No. Fileroom is an independent training platform. Nothing a student files reaches the Income Tax Department, and no real OTP, Aadhaar or payment checks happen.'],
    ['Which returns are covered?', 'ITR-1 for salaried people, ITR-2 for capital gains and more than one house, and ITR-4 for presumptive business income. Revised and updated returns too.'],
    ['Do students see both regimes?', 'Yes, on every return. They see the tax under each and the reason one is lower.'],
    ['What happens after the budget?', 'We update slabs, limits and forms on our side. Your students see the change the next time they log in, with nothing to install.'],
    ['How long does setup take?', "Most institutes run their first class within a week. Upload your student list, pick a case study, and you're ready."],
  ],

  demo: {
    title: <>Bring a working e-filing portal to your <Scribble>next batch.</Scribble></>,
    lede: "We'll walk you through a client's return on a live practice account, and set up a free trial batch for your faculty.",
    points: ['A full ITR on a live practice account', 'A free trial batch set up for your faculty'],
  },
};
