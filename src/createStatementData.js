function calculateTotalAmount(invoice, plays) {
  let totalAmount = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    totalAmount += calculateAmount(play, perf);
  }
  return totalAmount;
}
function calculateVolumeCredits(invoice, plays) {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    volumeCredits += calculateCredit(perf, play);
  }
  return volumeCredits;
}
function calculateCredit(perf, play) {
  let credit = 0;
  credit += Math.max(perf.audience - 30, 0);
  if ('comedy' === play.type)
    credit += Math.floor(perf.audience / 5);
  return credit;
}
function calculateAmount(play, perf) {
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
function createStatementData(invoice, plays) {
  let totalAmount = calculateTotalAmount(invoice, plays);
  let volumeCredits = calculateVolumeCredits(invoice, plays);
  let data = {
    totalAmount: totalAmount,
    volumeCredits: volumeCredits,
    performances: invoice.performances,
    plays: plays
  }
  return data
}
module.exports = {
  createStatementData,
};
