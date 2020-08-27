const {createStatementData} = require("./createStatementData");

function statement (invoice, plays) {
  let result = generateTxtResult(createStatementData(invoice, plays));
  return result; 
}

function generateTxtResult(data) {
  let result = `Statement for ${data.customer}\n`;
  result = generatePerformInfoTxtResult(data, result);
  result += `Amount owed is ${formatUSD(data.totalAmount)}\n`;
  result += `You earned ${data.volumeCredits} credits \n`;
  return result;
}

function generatePerformInfoTxtResult(data, result) {
  for (let perf of data.performances) {
    const play = data.plays[perf.playID];
    result += ` ${play.name}: ${formatUSD(calculateAmount(play, perf) )} (${perf.audience} seats)\n`;
  }
  return result;
}

function formatUSD(thisAmount){
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  return format(thisAmount / 100)
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

module.exports = {
  statement,
};
