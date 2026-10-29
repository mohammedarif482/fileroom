import { Scribble } from '../components/ui.jsx';
import { digits, inr } from '../utils.js';

const CEILING = 15000; // EPS and EDLI wages stop here

export default {
  key: 'epfo',
  name: 'EPFO',
  short: 'EPFO',
  region: 'India',
  label: 'EPFO',
  path: '/epfo/',
  sub: 'ECR, challans, member passbooks',
  blurb: "Prepare the ECR, pay the challan and see every member's passbook update.",
  chips: ['ECR', 'UAN', 'TRRN', 'Passbook'],
  ask: "I'd like to book a demo of your EPFO practice portal",

  hero: {
    title: <>Payroll isn't finished until the PF is <Scribble>paid.</Scribble></>,
    lede: "Fileroom's EPFO room is a practice employer portal. Students register members, prepare the ECR, pay the challan and see each member's passbook update, all with practice data.",
    facts: [
      ['Every member', 'with EPF, EPS and EDLI worked out one by one'],
      ['The ₹15,000 ceiling', 'applied the way EPFO applies it'],
      ['Passbooks', 'that show what the employee sees'],
    ],
  },

  sim: {
    tab: 'ECR',
    form: 'ECR',
    period: 'October 2026',
    entity: { initials: 'AT', name: 'Anand Traders', idLabel: 'Est. ID', id: 'KRKCH0012345000' },
    itemsLabel: 'Members and EPF wages',
    items: [
      { no: 'Arun K', party: 'UAN 100987654321', value: 15000 },
      { no: 'Meera S', party: 'UAN 100987654322', value: 24000 },
      { no: 'Joseph P', party: 'UAN 100987654323', value: 12500 },
    ],
    fmt: inr,
    refLabel: 'TRRN',
    newRef: () => '40610' + digits(8),
    stamp: 'PAID',
    fileLabel: 'Pay challan',
    hint: "Untick a member and both shares, the pension split and the challan recalculate. Meera's pension stops at the ceiling.",
    callback: "You just paid October's PF for Anand Traders. Your students run it every month, plus joiners and leavers.",
    compute(rows) {
      const wages = rows.reduce((s, r) => s + r.value, 0);
      const capped = rows.reduce((s, r) => s + Math.min(r.value, CEILING), 0);
      const employee = rows.reduce((s, r) => s + Math.round(r.value * 0.12), 0);
      const pension = rows.reduce((s, r) => s + Math.round(Math.min(r.value, CEILING) * 0.0833), 0);
      const fund = employee - pension;
      const admin = rows.length ? Math.max(500, Math.round(wages * 0.005)) : 0;
      const edli = Math.round(capped / 200);
      const total = employee + pension + fund + admin + edli;
      const result = rows.length
        ? `${inr(total)} paid, including ${inr(admin + edli)} of admin charges and EDLI. ${rows.length} passbook${rows.length > 1 ? 's' : ''} credited.`
        : 'No members in this ECR, so there is nothing to pay.';
      return {
        split: [['EPF wages', wages], ['Employee 12%', employee], ['Employer 12%', pension + fund]],
        bars: {
          label: 'Employer share',
          legend: ['Pension, EPS', 'Provident fund'],
          rows: [{ head: 'ER', a: pension, b: fund }],
        },
        total: ['Challan total', total],
        result,
      };
    },
  },

  compare: {
    title: 'Most payroll classes treat PF as',
    dim: 'a percentage.',
    lede: "12% of wages fits on one slide. At work it's an ECR, a ceiling, a pension split, admin charges and a deadline on the 15th. Fileroom teaches the work, not just the slide.",
    rows: [
      ['Contribution maths on a whiteboard', 'An ECR that splits EPF, EPS and EDLI for every member'],
      ['The ₹15,000 ceiling as a footnote', 'The ceiling applied, member by member'],
      ['No idea what the employee sees', 'The member passbook, updated after each challan'],
      ['Joiners and leavers skipped', 'UAN, KYC and date of exit, the way HR handles them'],
      ["The teacher can't see who did what", 'Every ECR, challan and mistake visible per student'],
    ],
  },

  cycle: {
    title: 'A month of PF, start to finish.',
    lede: 'What every payroll team does by the 15th. Students do it for their own practice company and watch the amount due move at each step.',
    entity: { initials: 'AT', name: 'Anand Traders', period: 'October 2026' },
    fmt: inr,
    steps: [
      { title: 'Register members', body: 'New joiners get a UAN and their KYC is linked. Students do it the way an HR team does.' },
      { title: 'Upload the ECR', body: 'Wages, EPF wages and EPS wages for every member, uploaded as one return. EPS stops at the ₹15,000 ceiling.' },
      { title: 'Pay the challan', body: "One challan covers both shares, admin charges and EDLI. It's due by the 15th." },
      { title: 'Passbooks update', body: "Each member's passbook shows the month's credit. Students see exactly what the employee will see." },
    ],
    rows: [
      ['wages', 'EPF wages', 'Three members'],
      ['contrib', 'Contributions', 'Employee and employer'],
      ['due', 'Challan due', 'By 15 November'],
    ],
    statuses: [['ECR uploaded', 'ECR not uploaded'], ['Challan paid', 'Challan not paid']],
    states: [
      { values: { wages: 0, contrib: 0, due: 0 }, hot: null, done: [false, false], note: 'Three members registered, each with a UAN and KYC.' },
      { values: { wages: 51500, contrib: 12360, due: 13073 }, hot: 'due', done: [true, false], note: "ECR uploaded. Meera's pension is worked out on ₹15,000, not ₹24,000." },
      { values: { wages: 51500, contrib: 12360, due: 0 }, hot: 'contrib', done: [true, true], note: 'Challan paid. TRRN 4061026001873.' },
      { values: { wages: 51500, contrib: 12360, due: 0 }, hot: null, done: [true, true], note: 'Passbooks credited for Arun, Meera and Joseph.' },
    ],
  },

  coverage: {
    title: 'Everything an employer does on the PF portal.',
    lede: "From a new joiner's UAN to a leaver's exit, and what each member sees on their side.",
    groups: [
      {
        title: 'Monthly', icon: 'calendar',
        forms: [
          ['ECR', 'Electronic challan cum return'],
          ['Challan', 'Payment and TRRN'],
          ['Arrears', 'Contributions on back pay'],
          ['Admin and EDLI', 'Charges on every challan'],
        ],
      },
      {
        title: 'Registration', icon: 'doc',
        forms: [
          ['Establishment', 'Code and employer login'],
          ['UAN', 'For new joiners'],
          ['KYC', 'Aadhaar, PAN and bank'],
          ['Date of exit', 'Marking a leaver'],
        ],
      },
      {
        title: 'Calculations', icon: 'pillar',
        forms: [
          ['EPF 12%', 'Employee share'],
          ['EPS 8.33%', 'On wages up to ₹15,000'],
          ['EPF 3.67%', 'The rest of the employer share'],
          ['EDLI 0.5%', 'Insurance'],
        ],
      },
      {
        title: 'Member side', icon: 'card',
        forms: [
          ['Passbook', 'Monthly credits'],
          ['Transfer', 'Moving PF to a new employer'],
          ['Claims', 'Withdrawals and advances'],
          ['Nomination', 'e-Nomination'],
        ],
      },
    ],
  },

  dash: {
    title: 'ECR',
    range: 'Jul to Oct 2026',
    periods: ['Jul', 'Aug', 'Sep', 'Oct'],
    late: 'damages charged',
    task: '"Upload the October ECR for Anand Traders and pay it before the 15th."',
  },

  pricing: 'The EPFO room on its own. Every plan includes ECRs, challans, the member side, the instructor panel and updates when EPFO rules change.',

  faqs: [
    ['Is it connected to the EPFO portal?', 'No. Fileroom is an independent training platform. Nothing a student files reaches EPFO, and no real payments, Aadhaar or OTP checks happen.'],
    ['Does it handle the ₹15,000 ceiling?', 'Yes. EPS and EDLI are worked out on wages up to the ceiling, and the rest of the employer share goes to EPF, member by member.'],
    ['Can students see the employee side?', 'Yes. Each member has a passbook, and students can practise transfers, claims and nominations from the member side.'],
    ['What happens when EPFO changes a rule?', 'We update rates, ceilings and forms on our side. Your students see the change the next time they log in, with nothing to install.'],
    ['How long does setup take?', "Most institutes run their first class within a week. Upload your student list, pick a case study, and you're ready."],
  ],

  demo: {
    title: <>Bring a working PF portal to your <Scribble>next batch.</Scribble></>,
    lede: "We'll walk you through a month of PF on a live practice account, and set up a free trial batch for your faculty.",
    points: ['A full PF month on a live practice account', 'A free trial batch set up for your faculty'],
  },
};
