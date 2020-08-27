const { createStatementData ,calculateAmount} = require("./createStatementData");

function statement(invoice, plays) {
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
    result += ` ${play.name}: ${formatUSD(calculateAmount(play, perf))} (${perf.audience} seats)\n`;
  }
  return result;
}

function formatUSD(thisAmount) {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  return format(thisAmount / 100)
}

function htmlStatement(invoice, plays) {
  let result = generateHtmlResult(createStatementData(invoice, plays));
  return result;
}
function generateHtmlResult(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n<table>\n<tr><th>play</th><th>seats</th><th>cost</th></tr>`
  result = generatePerformInfoHtmlResult(data, result);
  result += `</table>\n<p>Amount owed is <em>${formatUSD(data.totalAmount)}</em></p>\n`
  result += `<p>You earned <em>${data.volumeCredits}</em> credits</p>\n`
  return result;
}

function generatePerformInfoHtmlResult(data, result) {
  for (let perf of data.performances) {
    const play = data.plays[perf.playID]
    result += ` <tr><td>${play.name}</td><td>${perf.audience}</td><td>${formatUSD(calculateAmount(play, perf))}</td></tr>\n`;
  }
  return result;
}

module.exports = {
  statement,
  htmlStatement,
};
