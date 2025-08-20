(function(){
  const $ = (id) => document.getElementById(id);

  const els = {
    baseSalary: $('baseSalary'),
    revenue: $('revenue'),
    dealAmount: $('dealAmount'),
    target: $('target'),
    rate: $('rate'),
    finalSalary: $('finalSalary'),
    hint: $('hint'),
    resetBtn: $('resetBtn')
  };

  const STORAGE_KEY = 'salary-calc-v1';

  function loadSaved(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return;
      const data = JSON.parse(raw);
      ['baseSalary','revenue','dealAmount','target'].forEach(k=>{
        if(data[k] != null) els[k].value = String(data[k]);
      });
    }catch(e){}
  }
  function save(){
    const data = {
      baseSalary: els.baseSalary.value.trim(),
      revenue: els.revenue.value.trim(),
      dealAmount: els.dealAmount.value.trim(),
      target: els.target.value.trim()
    };
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }catch(e){}
  }

  function parseDecimal(v){
    if(typeof v !== 'string') return 0;
    // 允许输入中含有逗号或空格
    const s = v.replace(/,/g,'').trim();
    // 匹配开头可选符号、整数/小数
    const m = s.match(/^[-+]?\d*\.?\d*$/);
    if(!m || s === '' || s === '.' || s === '-' || s === '+') return 0;
    const n = parseFloat(s);
    return isFinite(n) ? n : 0;
  }

  function formatCurrency(n){
    try{
      return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n || 0);
    }catch{
      return '¥' + (n || 0).toFixed(2);
    }
  }

  function formatPercent(n){
    if(!isFinite(n)) n = 0;
    return (n*100).toFixed(2) + '%';
  }

  function compute(){
    const baseSalary = parseDecimal(els.baseSalary.value);
    const revenue = parseDecimal(els.revenue.value);
    const dealAmount = parseDecimal(els.dealAmount.value);
    const target = parseDecimal(els.target.value);

    let hintMsg = '';

    let rate = 0;
    if(target > 0){
      rate = revenue / target;
    }else{
      rate = 0;
      if(revenue > 0){
        hintMsg = '提示：业绩目标为 0 时，达标率按 0 计算。';
      }
    }

    // 实际工资 = (营业额×0.7% + 谈单额×1.4%) × 达标率 + 保底工资
    const part = revenue * 0.007 + dealAmount * 0.014;
    const finalSalary = part * rate + baseSalary;

    els.rate.textContent = formatPercent(rate);
    els.finalSalary.textContent = formatCurrency(finalSalary);
    els.hint.textContent = hintMsg;

    save();
  }

  function bind(){
    ['input','change'].forEach(evt=>{
      els.baseSalary.addEventListener(evt, compute, { passive: true });
      els.revenue.addEventListener(evt, compute, { passive: true });
      els.dealAmount.addEventListener(evt, compute, { passive: true });
      els.target.addEventListener(evt, compute, { passive: true });
    });

    els.resetBtn.addEventListener('click', ()=>{
      ['baseSalary','revenue','dealAmount','target'].forEach(k=> els[k].value = '');
      compute();
    });
  }

  function init(){
    loadSaved();
    bind();
    compute();
  }

  // iOS: 防止双击缩放副作用（简单处理）
  let lastTouch = 0;
  document.addEventListener('touchend', function(e){
    const now = Date.now();
    if(now - lastTouch <= 300) e.preventDefault();
    lastTouch = now;
  }, { passive: false });

  document.addEventListener('DOMContentLoaded', init);
})();