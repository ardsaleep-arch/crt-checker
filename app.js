(function () {
  const I18N = {
    en: {
      title: 'Chinese Remainder Theorem Checker',
      subtitle: 'Solve a system of congruences, see the working, and verify the answer.',
      systemHeading: 'System of congruences',
      addRow: '+ Add congruence',
      example: 'Load example',
      solve: 'Solve & verify',
      candidate: 'Check my answer (optional)',
      resultHeading: 'Result',
      verifyHeading: 'Verification',
      stepsHeading: 'Step-by-step',
      footer: 'Exact arithmetic with BigInt. Moduli need not be coprime.',
      remove: 'Remove',
      invalidInt: 'Row {n}: enter whole numbers only.',
      invalidMod: 'Row {n}: the modulus must be at least 2.',
      invalidCand: 'The answer to check must be a whole number.',
      solution: 'Solution',
      general: 'All solutions',
      coprimeYes: 'The moduli are pairwise coprime, so the classic CRT applies.',
      coprimeNo: 'The moduli are not pairwise coprime; the generalized CRT (merging congruences) is used.',
      noSolution: 'No solution',
      conflict: 'The system is inconsistent: after merging the first {k} congruences (x ≡ {x} mod {M}), congruence {n} requires {a} ≡ x (mod {m}), but {a} − {x} is not divisible by gcd({M}, {m}) = {g}.',
      allOk: 'All congruences are satisfied.',
      candOk: 'Your x = {x} is correct: it satisfies every congruence and x ≡ {x0} (mod {M}).',
      candBad: 'Your x = {x} is not a solution: it fails at least one congruence (see ✗ above).',
      candOkOnly: 'The system has no solution, so no x can be correct.',
      classicM: 'M = m₁ × … × mₙ = {M}',
      classicTerm: 'm = {m}: Mᵢ = M / m = {Mi}, yᵢ = Mᵢ⁻¹ mod {m} = {yi}, term aᵢ·Mᵢ·yᵢ = {a} × {Mi} × {yi} = {term}',
      classicSum: 'x = Σ aᵢ·Mᵢ·yᵢ = {sum} ≡ {x} (mod {M})',
      mergeStart: 'Start with x ≡ {x} (mod {M}).',
      merge: 'Merge with x ≡ {a} (mod {m}): g = gcd({pm}, {m}) = {g}; write x = {px} + {pm}·k, solve for k ≡ {k} → x ≡ {nx} (mod {nm}).',
      noteNormalized: 'Residues are reduced into [0, m).',
    },
    th: {
      title: 'ตัวตรวจสอบทฤษฎีบทเศษเหลือจีน (CRT)',
      subtitle: 'แก้ระบบสมภาค แสดงขั้นตอนการคำนวณ และตรวจสอบคำตอบ',
      systemHeading: 'ระบบสมภาค',
      addRow: '+ เพิ่มสมภาค',
      example: 'โหลดตัวอย่าง',
      solve: 'แก้และตรวจสอบ',
      candidate: 'ตรวจคำตอบของฉัน (ไม่บังคับ)',
      resultHeading: 'ผลลัพธ์',
      verifyHeading: 'การตรวจสอบ',
      stepsHeading: 'ขั้นตอนการคำนวณ',
      footer: 'คำนวณด้วย BigInt อย่างแม่นยำ มอดุลัสไม่จำเป็นต้องเป็นจำนวนเฉพาะสัมพัทธ์กัน',
      remove: 'ลบ',
      invalidInt: 'แถวที่ {n}: กรอกจำนวนเต็มเท่านั้น',
      invalidMod: 'แถวที่ {n}: มอดุลัสต้องไม่น้อยกว่า 2',
      invalidCand: 'คำตอบที่จะตรวจต้องเป็นจำนวนเต็ม',
      solution: 'คำตอบ',
      general: 'คำตอบทั้งหมด',
      coprimeYes: 'มอดุลัสเป็นจำนวนเฉพาะสัมพัทธ์กันทุกคู่ จึงใช้ CRT แบบมาตรฐานได้',
      coprimeNo: 'มอดุลัสไม่เป็นจำนวนเฉพาะสัมพัทธ์กันทุกคู่ จึงใช้ CRT แบบทั่วไป (รวมสมภาคทีละคู่)',
      noSolution: 'ไม่มีคำตอบ',
      conflict: 'ระบบขัดแย้งกัน: หลังรวมสมภาคแรก {k} ข้อได้ x ≡ {x} (mod {M}) แต่สมภาคที่ {n} ต้องการ x ≡ {a} (mod {m}) และ {a} − {x} หารด้วย gcd({M}, {m}) = {g} ไม่ลงตัว',
      allOk: 'ทุกสมภาคเป็นจริง',
      candOk: 'x = {x} ของคุณถูกต้อง: สอดคล้องกับทุกสมภาค และ x ≡ {x0} (mod {M})',
      candBad: 'x = {x} ของคุณไม่ใช่คำตอบ: ไม่สอดคล้องอย่างน้อยหนึ่งสมภาค (ดูเครื่องหมาย ✗ ด้านบน)',
      candOkOnly: 'ระบบนี้ไม่มีคำตอบ จึงไม่มี x ใดถูกต้อง',
      classicM: 'M = m₁ × … × mₙ = {M}',
      classicTerm: 'm = {m}: Mᵢ = M / m = {Mi}, yᵢ = Mᵢ⁻¹ mod {m} = {yi}, พจน์ aᵢ·Mᵢ·yᵢ = {a} × {Mi} × {yi} = {term}',
      classicSum: 'x = Σ aᵢ·Mᵢ·yᵢ = {sum} ≡ {x} (mod {M})',
      mergeStart: 'เริ่มจาก x ≡ {x} (mod {M})',
      merge: 'รวมกับ x ≡ {a} (mod {m}): g = gcd({pm}, {m}) = {g}; เขียน x = {px} + {pm}·k แก้ได้ k ≡ {k} → x ≡ {nx} (mod {nm})',
      noteNormalized: 'ปรับเศษให้อยู่ในช่วง [0, m)',
    },
  };

  let lang = (navigator.language || '').startsWith('th') ? 'th' : 'en';
  try { const s = localStorage.getItem('crt-lang'); if (s === 'en' || s === 'th') lang = s; } catch (e) {}

  const $ = (id) => document.getElementById(id);
  const t = (key, vars) =>
    I18N[lang][key].replace(/\{(\w+)\}/g, (_, k) => (vars && k in vars ? String(vars[k]) : ''));

  const rowsEl = $('rows');

  function addRow(a = '', m = '') {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML =
      '<span class="lbl">x ≡</span>' +
      '<input class="a" inputmode="numeric" autocomplete="off" aria-label="a">' +
      '<span class="lbl">(mod</span>' +
      '<input class="m" inputmode="numeric" autocomplete="off" aria-label="m">' +
      '<span class="lbl">)</span>' +
      '<button type="button" class="icon rm" aria-label="">✕</button>';
    row.querySelector('.a').value = a;
    row.querySelector('.m').value = m;
    row.querySelector('.rm').addEventListener('click', () => {
      if (rowsEl.children.length > 1) row.remove();
    });
    rowsEl.appendChild(row);
    applyRemoveLabels();
  }

  function applyRemoveLabels() {
    rowsEl.querySelectorAll('.rm').forEach((b) => b.setAttribute('aria-label', t('remove')));
  }

  function loadExample() {
    rowsEl.innerHTML = '';
    [['2', '3'], ['3', '5'], ['2', '7']].forEach(([a, m]) => addRow(a, m));
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.title = t('title');
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $('lang').textContent = lang === 'en' ? 'ไทย' : 'English';
    applyRemoveLabels();
    if (lastRun) render(lastRun);
  }

  const INT = /^[+-]?\d+$/;
  let lastRun = null;

  function showError(msg) {
    const el = $('error');
    el.hidden = !msg;
    el.textContent = msg || '';
  }

  function run() {
    showError('');
    const eqs = [];
    let err = null;
    [...rowsEl.children].forEach((row, i) => {
      const aEl = row.querySelector('.a');
      const mEl = row.querySelector('.m');
      aEl.classList.remove('invalid');
      mEl.classList.remove('invalid');
      const aS = aEl.value.trim();
      const mS = mEl.value.trim();
      if (!INT.test(aS)) { aEl.classList.add('invalid'); err = err || { k: 'invalidInt', n: i + 1 }; return; }
      if (!INT.test(mS)) { mEl.classList.add('invalid'); err = err || { k: 'invalidInt', n: i + 1 }; return; }
      const m = BigInt(mS);
      if (m < 2n) { mEl.classList.add('invalid'); err = err || { k: 'invalidMod', n: i + 1 }; return; }
      eqs.push({ a: BigInt(aS), m });
    });
    const candS = $('candidate').value.trim();
    if (!err && candS && !INT.test(candS)) { $('candidate').classList.add('invalid'); err = { k: 'invalidCand', n: 0 }; }
    else $('candidate').classList.remove('invalid');
    if (err) { lastRun = null; $('result').hidden = true; showError(t(err.k, { n: err.n })); return; }

    lastRun = { eqs, cand: candS ? BigInt(candS) : null, res: CRT.solve(eqs) };
    render(lastRun);
  }

  function render({ eqs, cand, res }) {
    $('result').hidden = false;
    const s = $('summary'), v = $('verify'), c = $('candidateOut'), st = $('steps');
    v.innerHTML = ''; c.innerHTML = ''; st.innerHTML = ''; s.innerHTML = '';
    const p = (cls, html) => { const d = document.createElement('p'); if (cls) d.className = cls; d.innerHTML = html; return d; };

    s.appendChild(p('note', t(res.coprime ? 'coprimeYes' : 'coprimeNo')));

    if (!res.ok) {
      const cf = res.conflict;
      const prev = res.merges.length ? res.merges[res.merges.length - 1] : null;
      const px = prev ? prev.newX : res.normalized[0].a;
      const pM = prev ? prev.newM : res.normalized[0].m;
      const q = res.normalized[cf.i];
      s.appendChild(p('bad', t('noSolution')));
      s.appendChild(p('', t('conflict', { k: cf.i, x: px, M: pM, n: cf.i + 1, a: q.a, m: q.m, g: cf.g })));
      if (cand !== null) c.appendChild(p('bad', t('candOkOnly')));
    } else {
      const big = document.createElement('div');
      big.className = 'big';
      big.textContent = `x ≡ ${res.x} (mod ${res.M})`;
      s.appendChild(p('', `<strong>${t('solution')}</strong>`));
      s.appendChild(big);
      s.appendChild(p('note', `${t('general')}: x = ${res.x} + ${res.M}·k, k ∈ ℤ`));

      CRT.verify(res.x, eqs).forEach((r, i) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="${r.ok ? 'ok' : 'bad'}">${r.ok ? '✓' : '✗'}</span> ${res.x} mod ${r.m} = ${r.r} ${r.ok ? '=' : '≠'} ${CRT.mod(r.a, r.m)}`;
        v.appendChild(li);
      });
      v.appendChild(p('ok', t('allOk')));

      if (cand !== null) {
        const chk = CRT.verify(cand, eqs);
        const good = chk.every((r) => r.ok);
        c.appendChild(p('', ''));
        chk.forEach((r) => {
          const d = document.createElement('div');
          d.style.fontFamily = 'ui-monospace, Menlo, monospace';
          d.innerHTML = `<span class="${r.ok ? 'ok' : 'bad'}">${r.ok ? '✓' : '✗'}</span> ${cand} mod ${r.m} = ${r.r} ${r.ok ? '=' : '≠'} ${CRT.mod(r.a, r.m)}`;
          c.appendChild(d);
        });
        c.appendChild(p(good ? 'ok' : 'bad', t(good ? 'candOk' : 'candBad', { x: cand, x0: res.x, M: res.M })));
      }

      // steps
      st.appendChild(p('note', t('noteNormalized')));
      if (res.classic) {
        st.appendChild(p('', t('classicM', { M: res.M })));
        res.classic.terms.forEach((x) => st.appendChild(p('', `<code>${t('classicTerm', x)}</code>`)));
        st.appendChild(p('', `<code>${t('classicSum', { sum: res.classic.sum, x: res.classic.x, M: res.M })}</code>`));
      } else {
        const first = res.normalized[0];
        st.appendChild(p('', `<code>${t('mergeStart', { x: first.a, M: first.m })}</code>`));
        res.merges.forEach((mg) =>
          st.appendChild(p('', `<code>${t('merge', { a: mg.a, m: mg.m, pm: mg.prevM, px: mg.prevX, g: mg.g, k: mg.k, nx: mg.newX, nm: mg.newM })}</code>`))
        );
      }
    }
  }

  $('add').addEventListener('click', () => addRow());
  $('example').addEventListener('click', () => { loadExample(); run(); });
  $('solve').addEventListener('click', run);
  document.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') run(); });
  $('lang').addEventListener('click', () => {
    lang = lang === 'en' ? 'th' : 'en';
    try { localStorage.setItem('crt-lang', lang); } catch (e) {}
    applyLang();
  });

  loadExample();
  applyLang();
})();
