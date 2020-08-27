function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
 
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    const thisAmount = getAmount(play, perf);
    const credit = getCredit(perf, play);
    //print line for this order
    volumeCredits +=credit
    result += ` ${play.name}: ${formatUSD(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${formatUSD(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;

  
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
  // add volume credits
  credit += Math.max(perf.audience - 30, 0);
  // add extra credit for every ten comedy attendees
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
