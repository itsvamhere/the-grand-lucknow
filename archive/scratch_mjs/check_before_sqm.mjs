async function printBeforeSquaremeter() {
  const url = 'https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/T5PVEAy5F.D5-RUb5a.mjs';
  const res = await fetch(url);
  const text = await res.text();
  const idx = text.indexOf('Squaremeter');
  console.log(text.substring(idx - 1000, idx));
}

printBeforeSquaremeter();
