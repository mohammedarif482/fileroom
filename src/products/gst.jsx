import { Scribble } from '../components/ui.jsx';
import { digits, inr } from '../utils.js';

const RATE = 0.09;
const ITC_EACH = 27000; // CGST and SGST credit available in the ledger

export default {
  key: 'gst',
  name: 'GST',
  short: 'GST',
  region: 'India',
  path: '/gst/',
  featured: true,
  sub: 'Registration, GSTR-1 and 3B, challans, e-way bills',
  blurb: 'Register a business, file GSTR-1 and 3B, pay the gap by challan and close the year with GSTR-9.',
  chips: ['GSTR-3B', 'GSTR-1', 'PMT-06', 'EWB-01', 'GSTR-9'],
  ask: "I'd like to book a demo of your GST practice portal",

  hero: {
    title: <>The first real GST return your students file shouldn't <Scribble>fail.</Scribble></>,
    lede: 'Fileroom is a practice GST portal for institutes and colleges. Students register a business, raise invoices, file GSTR-1 and 3B, pay challans and watch their ledgers update, all with practice data.',
    facts: [
      ['Every return', 'a regular, QRMP, composition or TDS/TCS taxpayer files'],
      ['Ledgers that move', 'the moment a return is filed'],
      ['Built for batches', 'of 30 to 3,000 students'],
    ],
  },

  sim: {
    tab: 'GSTR-3B',
    form: 'GSTR-3B',
    period: 'October 2026',
    entity: { initials: 'AT', name: 'Anand Traders', idLabel: 'GSTIN', id: '32AABFA1234K1Z5' },
    itemsLabel: 'Outward supplies from GSTR-1',
    items: [
      { no: 'INV-1041', party: 'Kochi Spices', value: 160000 },
      { no: 'INV-1042', party: 'Malabar Foods', value: 135000 },
      { no: 'INV-1043', party: 'Thrissur Retail', value: 125000 },
    ],
    fmt: inr,
    refLabel: 'ARN',
    newRef: () => 'AA321026' + digits(7),
    hint: 'Untick an invoice and the tax, credit and challan all recalculate. Then file it.',
    callback: 'You just filed October for Anand Traders. Your students have the other eleven months.',
    compute(rows) {
      const taxable = rows.reduce((s, r) => s + r.value, 0);
      const tax = Math.round(taxable * RATE);
      const fromItc = Math.min(ITC_EACH, tax);
      const cash = (tax - fromItc) * 2;
      let result;
      if (!tax) result = 'Nil return filed. Nothing to pay, nothing to set off.';
      else if (!cash) result = `${inr(fromItc * 2)} set off entirely from credit. No challan needed.`;
      else result = `${inr(fromItc * 2)} set off from credit, ${inr(cash)} paid in cash. October is locked.`;
      return {
        split: [['Taxable value', taxable], ['CGST 9%', tax], ['SGST 9%', tax]],
        bars: {
          label: 'Payment of tax',
          legend: ['From credit', 'In cash'],
          rows: ['CGST', 'SGST'].map((head) => ({ head, a: fromItc, b: tax - fromItc })),
        },
        total: ['Cash to pay by challan', cash],
        result,
      };
    },
  },

  compare: {
    title: 'Most practice tools are screenshots',
    dim: 'with buttons.',
    lede: 'Students learn the menus, but nothing they type changes anything. Fileroom runs a working tax engine underneath, so every entry has a consequence.',
    rows: [
      ['Static pages that look like the portal', 'Live forms that save, validate and file'],
      ['Numbers typed into a form go nowhere', 'GSTR-1 fills 3B, 3B moves the ledgers, the year rolls into GSTR-9'],
      ['One kind of taxpayer', 'Regular, QRMP, composition, TDS deductor and e-commerce operator'],
      ["The teacher can't see who did what", 'Every filing, challan and mistake visible per student'],
      ['No emails, so students never see what the portal sends', 'Real emails for every ARN, challan and acknowledgement, just like the GST Portal'],
      ['Out of date after the next rate change', 'Rates and forms updated as GST changes'],
    ],
  },

  portal: true,

  cycle: {
    title: 'A month of compliance, start to finish.',
    lede: 'The cycle every accountant runs twelve times a year. Students run it on their own practice business and see each step land in the ledgers.',
    entity: { initials: 'AT', name: 'Anand Traders', period: 'October 2026' },
    fmt: inr,
    steps: [
      { title: "Raise the month's invoices", body: "Sales and purchases come from the instructor's case study. Purchase tax lands in the credit ledger as input tax credit." },
      { title: 'File GSTR-1', body: 'Sales go into B2B, B2C and HSN tables. Once filed, the tax on those sales is drafted straight into GSTR-3B.' },
      { title: 'Pay the gap by challan', body: "Credit covers part of the tax. Students create a challan for the rest, and the cash ledger is credited once it's paid." },
      { title: 'File GSTR-3B', body: 'Credit is set off in the legal order, cash clears the balance, the return gets an ARN, and the period locks.' },
    ],
    rows: [
      ['payable', 'Tax payable', 'CGST + SGST'],
      ['credit', 'Credit ledger', 'IGST, CGST, SGST'],
      ['cash', 'Cash ledger', 'Paid by challan'],
    ],
    statuses: [['GSTR-1 filed', 'GSTR-1 not filed'], ['GSTR-3B filed', 'GSTR-3B not filed']],
    states: [
      { values: { payable: 0, credit: 54000, cash: 0 }, hot: 'credit', done: [false, false], note: '12 purchase invoices booked. ₹54,000 of input tax credit available.' },
      { values: { payable: 75600, credit: 54000, cash: 0 }, hot: 'payable', done: [true, false], note: 'GSTR-1 filed. ₹75,600 of output tax drafted into GSTR-3B.' },
      { values: { payable: 75600, credit: 54000, cash: 21600 }, hot: 'cash', done: [true, false], note: 'Challan paid. ₹21,600 credited to the cash ledger.' },
      { values: { payable: 0, credit: 0, cash: 0 }, hot: null, done: [true, true], note: 'GSTR-3B filed with ARN AA3210260483127. October is locked.' },
    ],
  },

  coverage: {
    title: 'Every form a student will meet at work.',
    lede: 'From the day a business registers to the year-end reconciliation, across every kind of taxpayer.',
    groups: [
      {
        title: 'Monthly and quarterly', icon: 'calendar',
        forms: [
          ['GSTR-1 / IFF', 'Outward supplies'],
          ['GSTR-2A / 2B', 'Inward supplies and ITC'],
          ['GSTR-3B', 'Summary return and payment'],
          ['IMS', 'Accept or reject supplier invoices'],
          ['CMP-08', 'Composition payment'],
        ],
      },
      {
        title: 'Registration', icon: 'doc',
        forms: [
          ['REG-01', 'New registration and GSTIN'],
          ['REG-06', 'Registration certificate'],
          ['REG-16', 'Cancellation'],
          ['Amendments', 'Core and non-core fields'],
        ],
      },
      {
        title: 'Annual and special', icon: 'pillar',
        forms: [
          ['GSTR-9 / 9C', 'Annual return and reconciliation'],
          ['GSTR-4', 'Composition annual return'],
          ['GSTR-7 / 8', 'TDS and TCS returns'],
          ['GSTR-10', 'Final return'],
        ],
      },
      {
        title: 'Payments, refunds and movement', icon: 'card',
        forms: [
          ['PMT-06', 'Challan and payment'],
          ['RFD-01', 'Refund application'],
          ['EWB-01', 'e-Way Bill'],
          ['e-Invoice', 'IRN and signed QR'],
          ['DRC-03', 'Voluntary payment'],
        ],
      },
    ],
  },

  dash: {
    title: 'GSTR-3B',
    range: 'Jul to Oct 2026',
    periods: ['Jul', 'Aug', 'Sep', 'Oct'],
    late: 'interest charged',
    task: '"File October GSTR-1 and 3B for Anand Traders by Friday."',
  },

  pricing: 'The GST room on its own. Every plan includes every GST form, the instructor panel and updates when GST rules change.',

  faqs: [
    ['Is Fileroom connected to the real GST portal?', 'No. Fileroom is an independent training platform. Nothing a student files reaches the government, and no real payments, Aadhaar or OTP checks happen.'],
    ['Whose data do students use?', 'Practice data only. Businesses, GSTINs, invoices and bank details are fictitious, either from our case studies or your own uploaded through the instructor panel.'],
    ['What happens when GST rules or rates change?', 'We update rates, forms and calculations on our side. Your students see the change the next time they log in, with nothing to install.'],
    ['Can students practise from home?', 'Yes. Fileroom runs in the browser on any laptop or desktop. Each student has their own account, so their work is waiting where they left it.'],
    ['How long does setup take?', "Most institutes run their first class within a week. Upload your student list, pick a case study, and you're ready."],
  ],

  demo: {
    title: <>Bring a working GST portal to your <Scribble>next batch.</Scribble></>,
    lede: "We'll walk you through a full filing month on a live practice account, and set up a free trial batch for your faculty.",
    points: ['A full filing month on a live practice account', 'A free trial batch set up for your faculty'],
  },
};
