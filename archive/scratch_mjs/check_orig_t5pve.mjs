async function fetchOriginalT5PVE() {
  const url = 'https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/T5PVEAy5F.D5-RUb5a.mjs';
  const res = await fetch(url);
  const text = await res.text();
  console.log('Original T5PVE length:', text.length);

  // Look for Squaremeter in original
  const idx = text.indexOf('Squaremeter');
  console.log('Squaremeter snippet in original:');
  console.log(text.substring(idx - 100, idx + 800));
}

fetchOriginalT5PVE();
