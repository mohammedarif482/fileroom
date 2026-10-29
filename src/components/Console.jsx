import { forwardRef, useState } from 'react';
import { Amount, Check } from './ui.jsx';

// One return on one screen: untick what goes in, watch the numbers move, file it.
// `sim` supplies the taxpayer, the line items and a compute() for the totals.
const Console = forwardRef(function Console({ sim, onFiled }, ref) {
  const { entity, items, fmt } = sim;
  const [included, setIncluded] = useState(items.map(() => true));
  const [ack, setAck] = useState(null);
  const filed = ack !== null;

  const out = sim.compute(items.filter((_, i) => included[i]));
  const [totalLabel, total] = out.total;

  const toggle = (i) => setIncluded((cur) => cur.map((v, j) => (j === i ? !v : v)));

  const file = () => {
    const next = sim.newRef();
    setAck(next);
    onFiled?.({ sim, ref: next });
  };

  const reset = () => {
    setAck(null);
    setIncluded(items.map(() => true));
  };

  return (
    <div className={`console${filed ? ' is-filed' : ''}`} ref={ref}>
      <div className="console-bar">
        <div className="who">
          <span className="avatar" aria-hidden="true">{entity.initials}</span>
          <div><strong>{entity.name}</strong><span>{entity.idLabel} <span className="code">{entity.id}</span></span></div>
        </div>
        <span className={`pill${filed ? ' filed' : ''}`} role="status">{filed ? 'Filed' : 'Draft'}</span>
      </div>

      <div className="console-body">
        <div className="c-title"><h3>{sim.form}</h3><span>{sim.period}</span></div>

        <fieldset className="inv" disabled={filed}>
          <legend className="c-label">{sim.itemsLabel}</legend>
          {items.map((it, i) => (
            <label className={`inv-row${included[i] ? '' : ' off'}`} key={it.no}>
              <input type="checkbox" checked={included[i]} onChange={() => toggle(i)} />
              <span className="box" aria-hidden="true"><Check /></span>
              <span className="inv-no">{it.no}</span>
              <span className="party">{it.party}</span>
              <span className="inv-amt num">{fmt(it.value)}</span>
            </label>
          ))}
        </fieldset>

        <div className="split num">
          {out.split.map(([label, value]) => (
            <div key={label}><small>{label}</small><b><Amount value={value} fmt={fmt} from={0} duration={0.9} /></b></div>
          ))}
        </div>

        {out.bars && (
          <div className="setoff">
            <div className="c-label">{out.bars.label}</div>
            {out.bars.rows.map(({ head, a, b }) => {
              const pct = a + b ? (a / (a + b)) * 100 : 0;
              return (
                <div className="bar-row num" key={head}>
                  <span className="head">{head}</span>
                  <div className="bar">
                    <i className="itc" style={{ width: `${pct}%` }} />
                    <i className="cash" style={{ width: `${a + b ? 100 - pct : 0}%` }} />
                  </div>
                  <span className="amt"><Amount value={a + b} fmt={fmt} from={0} duration={0.9} /></span>
                </div>
              );
            })}
            <div className="legend"><span>{out.bars.legend[0]}</span><span className="cash">{out.bars.legend[1]}</span></div>
          </div>
        )}

        <div className="c-foot num">
          <div className="total">
            <small>{filed ? `${sim.refLabel} ${ack}` : totalLabel}</small>
            <b><Amount value={total} fmt={fmt} from={0} duration={1.1} /></b>
          </div>
          {filed
            ? <button type="button" className="btn btn-ghost-dark" onClick={reset}>Start over</button>
            : <button type="button" className="btn btn-lime" onClick={file}>{sim.fileLabel || 'File return'}</button>}
        </div>
        {filed && <p className="c-result" role="status">{out.result}</p>}
      </div>

      {filed && (
        <div className="stamp" aria-hidden="true">
          <b>{sim.stamp || 'FILED'}</b>
          <span className="code">{ack}</span>
        </div>
      )}
    </div>
  );
});

export default Console;
