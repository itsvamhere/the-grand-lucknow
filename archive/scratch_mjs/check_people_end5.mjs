async function printPeopleEnd5() {
  const url = 'https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/T5PVEAy5F.D5-RUb5a.mjs';
  const res = await fetch(url);
  const text = await res.text();
  const idx = text.indexOf('"data-framer-name":`People`');
  console.log(text.substring(idx + 4200, idx + 5200));
}

printPeopleEnd5();
