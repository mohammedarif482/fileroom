import { Scribble } from '../components/ui.jsx';
import { digits, inr } from '../utils.js';

const DEPOSITED = 24600; // January and February challans, already paid

export default {
  key: 'tds',
  name: 'TDS',
  short: 'TDS',
  region: 'India',
  path: '/tds/',
  sub: 'Challan 281, 24Q and 26Q, TRACES',
  blurb: 'Deduct under the right section, deposit by challan 281, file 26Q and issue Form 16A.',
  chips: ['26Q', '24Q', 'Challan 281', 'FVU', 'Form 16A'],
  ask: "I'd like to book a demo of your TDS practice portal",

  hero: {
    title: <>Every TDS mistake costs interest. Make the first few <Scribble>free.</Scribble></>,
    lede: "Fileroom's TDS room covers everything a deductor does. Students deduct under the right section, deposit by challan 281, validate a 26Q into an FVU file and download Form 16A from a practice TRACES, all with practice data.",
    facts: [
      ['24Q, 26Q, 27Q and 27EQ', 'every statement a deductor files'],
      ['An FVU that fails', 'on a wrong PAN or a missing challan'],
      ['TRACES included', 'for Form 16 and Form 16A'],
    ],
  },

  sim: {
    tab: '26Q',
    form: 'Form 26Q',
    period: 'Q4, Jan to Mar 2026',
    entity: { initials: 'AT', name: 'Anand Traders', idLabel: 'TAN', id: 'TVDA01234B' },
    itemsLabel: 'Payments to deductees',
    items: [
      { no: '194C', party: 'Malabar Logistics Pvt Ltd', value: 480000, rate: 0.02 },
      { no: '194J', party: 'Varma & Associates', value: 150000, rate: 0.1 },
      { no: '194-I', party: 'Periyar Estates', value: 300000, rate: 0.1 },
    ],
    fmt: inr,
    refLabel: 'Token',
    newRef: () => digits(15),
    hint: 'Untick a payment and the TDS and the balance to deposit both recalculate. Then file the statement.',
    callback: 'You just filed Q4 for Anand Traders. Your students still have to issue three Form 16As.',
    compute(rows) {
      const paid = rows.reduce((s, r) => s + r.value, 0);
      const tds = rows.reduce((s, r) => s + Math.round(r.value * r.rate), 0);
      const covered = Math.min(DEPOSITED, tds);
      const balance = tds - covered;
      let result;
      if (!tds) result = 'No tax deducted this quarter, so there is nothing to report.';
      else if (!balance) result = `Earlier challans already cover it, with ${inr(DEPOSITED - tds)} left unclaimed. 26Q filed.`;
      else result = `${inr(balance)} paid on challan 281 for March. 26Q filed, and Form 16A is ready for ${rows.length} deductee${rows.length > 1 ? 's' : ''}.`;
      return {
        split: [['Payments', paid], ['TDS deducted', tds], ['Already deposited', DEPOSITED]],
        bars: {
          label: 'TDS deducted',
          legend: ['Deposited', 'Still to deposit'],
          rows: [{ head: 'TDS', a: covered, b: balance }],
        },
        total: ['Balance, challan 281', balance],
        result,
      };
    },
  },

  compare: {
    title: 'Most TDS classes stop at the',
    dim: 'rate chart.',
    lede: 'Students memorise sections and rates. Then their first FVU file fails validation and nobody in the office has time to explain why. Fileroom lets it fail in class first.',
    rows: [
      ['Rates memorised from a table', 'Section and rate picked per payment, with the threshold checked'],
      ['The FVU explained, never run', 'Students validate a file and fix whatever fails'],
      ['TRACES shown in a screenshot', 'A practice TRACES login that issues Form 16 and 16A'],
      ['Interest worked out on paper', 'Interest added the day a deposit is late'],
      ["The teacher can't see who did what", 'Every challan, statement and mistake visible per student'],
    ],
  },

  cycle: {
    title: 'A TDS quarter, start to finish.',
    lede: 'The cycle every deductor runs four times a year. Students run it for their own practice business and see the balance owed change at each step.',
    entity: { initials: 'AT', name: 'Anand Traders', period: 'Q4, Jan to Mar 2026' },
    fmt: inr,
    steps: [
      { title: 'Deduct when you pay', body: 'Each payment to a contractor, professional or landlord is booked with its section and rate. The tax is held back from the payment.' },
      { title: 'Deposit by challan 281', body: "Tax deducted in a month is paid by the 7th of the next. A late deposit adds interest, and the ledger shows it." },
      { title: 'File 26Q', body: 'Students fill the statement, validate it into an FVU file and upload it. A wrong PAN or a missing challan fails validation.' },
      { title: 'Issue Form 16A', body: 'Once the statement is processed, students log in to TRACES and download a certificate for each deductee.' },
    ],
    rows: [
      ['deducted', 'TDS deducted', '194C, 194J, 194-I'],
      ['deposited', 'Deposited', 'Challan 281'],
      ['pending', 'Not deposited', 'Interest at 1.5% a month'],
    ],
    statuses: [['26Q filed', '26Q not filed'], ['16A issued', '16A not issued']],
    states: [
      { values: { deducted: 54600, deposited: 0, pending: 54600 }, hot: 'deducted', done: [false, false], note: 'Three payments booked. ₹54,600 held back from deductees.' },
      { values: { deducted: 54600, deposited: 54600, pending: 0 }, hot: 'deposited', done: [false, false], note: 'Three challans paid, one a month, each by the 7th.' },
      { values: { deducted: 54600, deposited: 54600, pending: 0 }, hot: null, done: [true, false], note: '26Q validated and filed. Token 482910374561028.' },
      { values: { deducted: 54600, deposited: 54600, pending: 0 }, hot: null, done: [true, true], note: 'Form 16A downloaded for all three deductees.' },
    ],
  },

  coverage: {
    title: 'Every statement a deductor files.',
    lede: 'From getting a TAN to issuing the last certificate, for salary, non-salary, non-resident and TCS.',
    groups: [
      {
        title: 'Quarterly statements', icon: 'calendar',
        forms: [
          ['24Q', 'TDS on salary'],
          ['26Q', 'Payments to residents'],
          ['27Q', 'Payments to non-residents'],
          ['27EQ', 'Tax collected at source'],
          ['Corrections', 'Revising a filed statement'],
        ],
      },
      {
        title: 'Registration', icon: 'doc',
        forms: [
          ['TAN', 'Form 49B application'],
          ['TRACES', 'Deductor registration and login'],
          ['e-Filing', 'Registering the TAN'],
        ],
      },
      {
        title: 'Certificates', icon: 'pillar',
        forms: [
          ['Form 16', 'TDS on salary'],
          ['Form 16A', 'TDS on everything else'],
          ['Form 27D', 'TCS certificate'],
          ['Justification report', 'Understanding a default'],
        ],
      },
      {
        title: 'Challans, files and defaults', icon: 'card',
        forms: [
          ['Challan 281', 'Depositing TDS'],
          ['Utility', 'Preparing the statement'],
          ['FVU', 'Validating and uploading'],
          ['Interest', 'Late deduction and late deposit'],
          ['Late fee', 'For statements filed late'],
        ],
      },
    ],
  },

  dash: {
    title: '26Q',
    range: 'FY 2025-26',
    periods: ['Q1', 'Q2', 'Q3', 'Q4'],
    late: 'late fee charged',
    task: '"Deposit March TDS for Anand Traders and file Q4 26Q by Friday."',
  },

  pricing: 'The TDS room on its own. Every plan includes every statement, TRACES, the instructor panel and updates when the rules change.',

  faqs: [
    ['Is it connected to TRACES or the e-filing portal?', 'No. Fileroom is an independent training platform. Nothing a student files reaches the Income Tax Department, and no real challans are paid.'],
    ['Do students use a real utility and FVU?', 'They use a practice version that works the same way. Students fill the statement, validate it, fix what fails and upload the file it produces.'],
    ['Whose data do students use?', 'Practice data only. Deductors, deductees, PANs and payments are fictitious, either from our case studies or your own uploaded through the instructor panel.'],
    ['What happens when sections or rates change?', 'We update sections, rates and forms on our side. Your students see the change the next time they log in, with nothing to install.'],
    ['How long does setup take?', "Most institutes run their first class within a week. Upload your student list, pick a case study, and you're ready."],
  ],

  demo: {
    title: <>Bring a working TDS desk to your <Scribble>next batch.</Scribble></>,
    lede: "We'll walk you through a full TDS quarter on a live practice account, and set up a free trial batch for your faculty.",
    points: ['A full TDS quarter on a live practice account', 'A free trial batch set up for your faculty'],
  },
};
