function statement (invoice, plays) {
  let totalAmount = getTotalAmount(invoice, plays);
  let volumeCredits = getVolumeCredits(invoice, plays);
  let result = getResult(invoice, plays, totalAmount, volumeCredits);
  return result; 
}

function getResult(invoice, plays, totalAmount, volumeCredits) {
  let result = `Statement for ${invoice.customer}\n`;
  result = getCurrentResult(invoice, plays, result);
  result += `Amount owed is ${formatUSD(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function getTotalAmount(invoice, plays) {
  let totalAmount = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    totalAmount += getAmount(play, perf);
  }
  return totalAmount;
}

function getCurrentResult(invoice, plays, result) {
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    result += ` ${play.name}: ${formatUSD(getAmount(play, perf) / 100)} (${perf.audience} seats)\n`;
  }
  return result;
}

function getVolumeCredits(invoice, plays) {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    volumeCredits += getCredit(perf, play);
  }
  return volumeCredits;
}

function formatUSD(thisAmount){
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  return format(thisAmount)
}

function getCredit(perf, play) {
  let credit = 0;
  credit += Math.max(perf.audience - 30, 0);
  if ('comedy' === play.type)
    credit += Math.floor(perf.audience / 5);
  return credit;
}

function getAmount(play, perf) {
  let thisAmount = 0;
  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

module.exports = {
  statement,
};
