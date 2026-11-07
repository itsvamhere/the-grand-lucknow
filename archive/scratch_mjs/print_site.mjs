async function printSite() {
  const res = await fetch('https://thegrandlucknow.in');
  console.log(await res.text());
}
printSite();
