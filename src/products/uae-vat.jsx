import { Scribble } from '../components/ui.jsx';
import { aed, digits } from '../utils.js';

const INPUT_VAT = 24000; // Box 9, VAT on the quarter's standard-rated expenses

export default {
  key: 'uae-vat',
  name: 'UAE VAT & Corporate Tax',
  short: 'UAE',
  region: 'UAE',
  label: 'UAE VAT',
  path: '/uae-vat/',
  featured: true,
  sub: 'VAT 201 and corporate tax on EmaraTax',
  blurb: 'File VAT 201 by emirate, pay through GIBAN and work out a corporate tax return, on screens laid out like EmaraTax.',
  chips: ['VAT 201', 'CT return', 'GIBAN', 'VAT311'],
  ask: "I'd like to book a demo of your UAE VAT and corporate tax practice portal",

  hero: {
    title: <>Your students are going to the Gulf. Send them with a VAT return <Scribble>already filed.</Scribble></>,
    lede: "Fileroom's UAE room is a practice EmaraTax account. Students register for VAT and corporate tax, file VAT 201 emirate by emirate, pay through GIBAN and file a corporate tax return, all with practice data.",
    facts: [
      ['VAT and corporate tax', 'in one practice EmaraTax account'],
      ['All seven emirates', 'split the way VAT 201 asks for them'],
      ['Penalties that land', 'when a return or a payment is late'],
    ],
  },

  sim: {
    tab: 'VAT 201',
    form: 'VAT 201',
    period: 'Jul to Sep 2026',
    entity: { initials: 'AN', name: 'Al Noor Trading LLC', idLabel: 'TRN', id: '100345678900003' },
    itemsLabel: 'Supplies for the quarter',
    items: [
      { no: 'Box 1b', party: 'Dubai, standard-rated', value: 420000, rate: 0.05 },
      { no: 'Box 1a', party: 'Abu Dhabi, standard-rated', value: 260000, rate: 0.05 },
      { no: 'Box 4', party: 'Exports, zero-rated', value: 180000, rate: 0 },
    ],
    fmt: aed,
    refLabel: 'Ref',
    newRef: () => '2300' + digits(8),
    hint: 'Untick a supply and output VAT, recovery and the amount due all recalculate. Take Dubai out and the business is owed money.',
    callback: 'You just filed Q3 for Al Noor Trading. Your students still have three quarters and a corporate tax return.',
    compute(rows) {
      const sales = rows.reduce((s, r) => s + r.value, 0);
      const output = rows.reduce((s, r) => s + r.value * r.rate, 0);
      const recovered = Math.min(INPUT_VAT, output);
      const net = output - INPUT_VAT;
      let result;
      if (net > 0) result = `${aed(recovered)} recovered from input VAT, ${aed(net)} due through GIBAN by 28 October.`;
      else if (net < 0) result = `${aed(-net)} of excess input VAT. Carry it forward, or ask for a refund.`;
      else result = 'Input VAT covers it exactly. Nothing to pay.';
      return {
        split: [['Total supplies', sales], ['Output VAT 5%', output], ['Recoverable VAT', INPUT_VAT]],
        bars: {
          label: 'Output VAT',
          legend: ['Recovered', 'Payable'],
          rows: [{ head: 'VAT', a: recovered, b: output - recovered }],
        },
        total: [net < 0 ? 'Net VAT refundable' : 'Net VAT payable', Math.abs(net)],
        result,
      };
    },
  },

  compare: {
    title: 'Most UAE tax courses end at the',
    dim: 'slide deck.',
    lede: 'Students learn that VAT is 5% and corporate tax is 9%. Then they sit in front of EmaraTax for the first time at work. Fileroom gives them that first time in class.',
    rows: [
      ['Slides about VAT 201', 'A VAT 201 students fill in, box by box'],
      ['The emirates lumped together', 'Sales split across all seven emirates, as the form asks'],
      ['Corporate tax as a lecture', 'A corporate tax return worked out from a profit and loss account'],
      ['No deadline, no penalty', 'Late filing and late payment penalties when students miss the 28th'],
      ["The teacher can't see who did what", 'Every return, payment and mistake visible per student'],
    ],
  },

  cycle: {
    title: 'A VAT quarter, start to finish.',
    lede: 'What a UAE accountant does every quarter for every client. Students run it on their own practice company and watch the amount due change at each step.',
    entity: { initials: 'AN', name: 'Al Noor Trading LLC', period: 'Jul to Sep 2026' },
    fmt: aed,
    steps: [
      { title: 'Register and get a TRN', body: 'Students apply for VAT on a practice EmaraTax account. Once approved, the business gets a 15-digit TRN and its first tax period.' },
      { title: "Book the quarter's invoices", body: "Sales by emirate, zero-rated exports and purchases come from the instructor's case study. VAT on purchases builds up as recoverable tax." },
      { title: 'File VAT 201', body: 'Output VAT is grouped by emirate, input VAT is recovered, and the return shows what is due.' },
      { title: 'Pay through GIBAN', body: 'Students pay the balance before the 28th. If they miss it, the late payment penalty shows up on the account.' },
    ],
    rows: [
      ['output', 'Output VAT', 'Boxes 1 to 7'],
      ['input', 'Recoverable VAT', 'Boxes 9 and 10'],
      ['due', 'Payable tax', 'Due by the 28th'],
    ],
    statuses: [['VAT 201 filed', 'VAT 201 not filed'], ['Paid', 'Not paid']],
    states: [
      { values: { output: 0, input: 0, due: 0 }, hot: null, done: [false, false], note: 'TRN 100345678900003 issued. First tax period: July to September 2026.' },
      { values: { output: 34000, input: 24000, due: 0 }, hot: 'output', done: [false, false], note: '38 invoices booked. AED 34,000 of output VAT, AED 24,000 recoverable.' },
      { values: { output: 34000, input: 24000, due: 10000 }, hot: 'due', done: [true, false], note: 'VAT 201 filed. AED 10,000 payable by 28 October.' },
      { values: { output: 34000, input: 24000, due: 0 }, hot: null, done: [true, true], note: 'AED 10,000 paid through GIBAN. The quarter is closed.' },
    ],
  },

  coverage: {
    title: 'VAT and corporate tax, on one account.',
    lede: 'From the first registration to the corporate tax return, the way EmaraTax lays it out.',
    groups: [
      {
        title: 'VAT returns', icon: 'calendar',
        forms: [
          ['VAT 201', 'Quarterly or monthly return'],
          ['Emirate split', 'Standard-rated sales by emirate'],
          ['Reverse charge', 'Imports and services from abroad'],
          ['Voluntary disclosure', 'Correcting an earlier return'],
          ['Refunds', 'Claiming back excess input VAT'],
        ],
      },
      {
        title: 'Registration', icon: 'doc',
        forms: [
          ['VAT registration', 'Mandatory or voluntary, and the TRN'],
          ['CT registration', 'Corporate tax TRN'],
          ['Amendments', 'Changing business details'],
          ['Deregistration', 'Closing a registration'],
        ],
      },
      {
        title: 'Corporate tax', icon: 'pillar',
        forms: [
          ['Taxable income', 'Worked out from accounting profit'],
          ['0% and 9%', 'The AED 375,000 threshold'],
          ['Small business relief', 'Revenue up to AED 3m'],
          ['CT return', 'Due nine months after year end'],
        ],
      },
      {
        title: 'Payments and penalties', icon: 'card',
        forms: [
          ['GIBAN', 'Paying the FTA'],
          ['Statement of account', 'What the business owes'],
          ['Late filing', 'Penalty for a missed return'],
          ['Late payment', 'Penalty on unpaid tax'],
        ],
      },
    ],
  },

  dash: {
    title: 'VAT 201',
    range: 'Q4 2025 to Q3 2026',
    periods: ['Q4', 'Q1', 'Q2', 'Q3'],
    late: 'penalty applied',
    task: '"File Q3 VAT 201 for Al Noor Trading and pay it by the 28th."',
  },

  pricing: 'The UAE room on its own. Every plan includes VAT, corporate tax, the instructor panel and updates when FTA rules change.',

  faqs: [
    ['Is this connected to EmaraTax?', "No. Fileroom is independent of the UAE Federal Tax Authority. It follows EmaraTax's screens and the FTA's rules, but nothing filed here reaches the FTA."],
    ["Who is this for if we're in India?", 'Institutes training students for accounting jobs in the UAE. Most of those students will file a VAT return in their first month at work. With Fileroom, that one is already behind them.'],
    ['Does it cover corporate tax?', 'Yes. Students register for corporate tax, work out taxable income from accounting profit, apply the 0% band and small business relief, and file the return.'],
    ['What happens when the FTA changes a rule?', 'We update rates, forms and penalties on our side. Your students see the change the next time they log in, with nothing to install.'],
    ['How long does setup take?', "Most institutes run their first class within a week. Upload your student list, pick a case study, and you're ready."],
  ],

  demo: {
    title: <>Send your next batch to the Gulf <Scribble>ready.</Scribble></>,
    lede: "We'll walk you through a VAT quarter and a corporate tax return on a live practice account, and set up a free trial batch for your faculty.",
    points: ['A full VAT quarter on a live practice account', 'A free trial batch set up for your faculty'],
  },
};
