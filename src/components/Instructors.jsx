import { useState } from 'react';
import { Check, Tag } from './ui.jsx';

const LABELS = { ok: 'Filed', late: 'Filed late', todo: 'Not filed' };

const students = [
  ['Aisha Rahman', ['ok', 'ok', 'ok', 'ok'], '#DCE4FF'],
  ['Nikhil Menon', ['ok', 'late', 'ok', 'todo'], '#E9F8B8'],
  ['Fathima Noor', ['ok', 'ok', 'ok', 'ok'], '#FFE2D6'],
  ['Rahul Varghese', ['late', 'ok', 'todo', 'todo'], '#DDF1EA'],
  ['Sneha Pillai', ['ok', 'ok', 'ok', 'late'], '#EEE3FF'],
];

const all = students.flatMap(([, m]) => m);
const onTime = all.filter((s) => s === 'ok').length;
const late = all.filter((s) => s === 'late').length;
const pending = all.filter((s) => s === 'todo').length;
const needsHelp = students.filter(([, m]) => m.some((s) => s !== 'ok'));

const Late = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="8" cy="8" r="5.5" /><path d="M8 5v3.2l2 1.3" /></svg>
);

function Cell({ s }) {
  return (
    <span className={`cell ${s}`} title={LABELS[s]}>
      {s === 'ok' && <Check />}
      {s === 'late' && <Late />}
      <span className="sr-only">{LABELS[s]}</span>
    </span>
  );
}

// `periods` are the four columns of the progress table, `late` says what lateness costs
export default function Instructors({ n, title, range, periods, late: lateCost, task }) {
  const features = [
    ['Load a case study once', 'Upload businesses and their transactions from Excel, then give every student the same starting point.'],
    ['Assign real tasks', task],
    ['Reset a period, not the whole account', 'Let a student redo one period without losing the rest of their year.'],
  ];
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? students : needsHelp;

  return (
    <section id="instructors" aria-labelledby="teach-title">
      <div className="wrap teach-grid">
        <div>
          <Tag n={n}>For instructors</Tag>
          <h2 id="teach-title">Run the whole batch from one screen.</h2>
          <p className="lede" style={{ marginTop: 20 }}>Instructors set the case study, hand out the work and see exactly where each student is stuck.</p>
          <ol className="teach-list">
            {features.map(([title, body], i) => (
              <li key={title}>
                <span className="t-n">{String(i + 1).padStart(2, '0')}</span>
                <div><strong>{title}</strong><span>{body}</span></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="dash">
          <div className="dash-head">
            <div><h3>Batch B-14 · {title}</h3><small>{range}</small></div>
            <div className="seg" role="group" aria-label="Filter students">
              <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All students</button>
              <button type="button" aria-pressed={filter === 'help'} onClick={() => setFilter('help')}>
                Needs attention<em>{needsHelp.length}</em>
              </button>
            </div>
          </div>

          <div className="dash-stats num">
            <div className="d-stat">
              <small>Filed on time</small>
              <b>{onTime}<span> / {all.length}</span></b>
              <div className="ticks" aria-hidden="true">
                {all.map((_, i) => <i key={i} className={i < onTime ? 'on' : ''} />)}
              </div>
            </div>
            <div className="d-stat alert">
              <small>To follow up</small>
              <b>{late + pending}</b>
              <p><i style={{ background: 'var(--red)' }} />{late} late, {lateCost}</p>
              <p><i style={{ border: '1.5px dashed #6E7488' }} />{pending} not filed yet</p>
            </div>
          </div>

          <div className="table-wrap">
            <table className="ptable">
              <thead>
                <tr><th scope="col">Student</th>{periods.map((m) => <th scope="col" key={m}>{m}</th>)}</tr>
              </thead>
              <tbody>
                {shown.map(([name, months, tint]) => (
                  <tr key={name}>
                    <td>
                      <span className="person">
                        <span className="initials" style={{ background: tint }} aria-hidden="true">
                          {name.split(' ').map((w) => w[0]).join('')}
                        </span>
                        {name}
                      </span>
                    </td>
                    {months.map((s, i) => <td key={i}><Cell s={s} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pkey">
            <span><Cell s="ok" />Filed</span>
            <span><Cell s="late" />Filed late, {lateCost}</span>
            <span><Cell s="todo" />Not filed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
