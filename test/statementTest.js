const test = require('ava');
const {statement , htmlStatement} = require('../src/statement');
const invoice = {
  'customer': 'BigCo',
  'performances': [
    {
      'playID': 'hamlet',
      'audience': 55,
    },
    {
      'playID': 'as-like',
      'audience': 35,
    },
    {
      'playID': 'othello',
      'audience': 40,
    },
  ],
};

const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
};


test('should_own_0_earn_0_when_statement_given_0_performances', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances':[],
  };
  const result = statement(invoice, plays);
  const expectResult = 'Statement for BigCo\n'+
  'Amount owed is $0.00\n'+
  'You earned 0 credits \n'
  t.is(expectResult, result);
});
test('should return owed 400 and earn 0 credits when statement given BigCo has one performance hamlet and audience is 30 ', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances':[
      {
        'playID': 'hamlet',
        'audience': 30,
      }
    ],
  };
//when
  const result = statement(invoice, plays);
  const expectResult = 'Statement for BigCo\n'+
  ' Hamlet: $400.00 (30 seats)\n'+
  'Amount owed is $400.00\n'+
  'You earned 0 credits \n'
  //then
  t.is(expectResult, result);
});
test('should return owed 410 and earn 1 credits when statement given BigCo has one performance hamlet and audience is 31 ', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances':[
      {
        'playID': 'hamlet',
        'audience': 31,
      }
    ],
  };
//when
  const result = statement(invoice, plays);
  const expectResult = 'Statement for BigCo\n'+
  ' Hamlet: $410.00 (31 seats)\n'+
  'Amount owed is $410.00\n'+
  'You earned 1 credits \n'
  //then
  t.is(expectResult, result);
});

test('should return owe 360 and earn 4 credits  given Customer BigCo2 has one performance as-like and audience is 20. ', t => {
  const invoice = {
    'customer': 'BigCo2',
    'performances': [
      {
        'playID': 'as-like',
        'audience': 20,
      },
    ],
  };

  const result = statement(invoice, plays);
  const expectResult = 'Statement for BigCo2\n' +
                         ' As You Like It: $360.00 (20 seats)\n' +
                         'Amount owed is $360.00\n' +
                         'You earned 4 credits \n'
  t.is(result, expectResult);
});
test('should return owe 468 and earn 4 credits given Customer BigCo has one performance as-like and the audience is 21. ', t => {
  const invoice = {
    'customer': 'BigCo2',
    'performances': [
      {
        'playID': 'as-like',
        'audience': 21,
      },
    ],
  };

  const result = statement(invoice, plays);
  const expectResult = 'Statement for BigCo2\n' +
                         ' As You Like It: $468.00 (21 seats)\n' +
                         'Amount owed is $468.00\n' +
                         'You earned 4 credits \n'
  t.is(result, expectResult);
});

test('should return owe 1730 and earn 47 credits given Customer BigCo has three performances. ' +
  'Hamlet has 55 audiences. ' +
  'As You Like Is has 35 audiences. ' +
  'Othello has 40 audiences. ', t => {

  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 55,
      },
      {
        'playID': 'as-like',
        'audience': 35,
      },
      {
        'playID': 'othello',
        'audience': 40,
      },
    ],
  };

  const result = statement(invoice, plays);
  const expectResult ='Statement for BigCo\n' +
                        ' Hamlet: $650.00 (55 seats)\n' +
                        ' As You Like It: $580.00 (35 seats)\n' +
                        ' Othello: $500.00 (40 seats)\n' +
                        'Amount owed is $1,730.00\n' +
                        'You earned 47 credits \n'
  t.is(result,expectResult );
});
test('should throw an exception given Customer BigCo has one unknown performance. ', t => {
  const plays = {
    'othello': {
      'name': 'Othello',
      'type': 'tragedy1',
    },
  };
  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'othello',
        'audience': 40,
      },
    ],
  };

  try {
    statement(invoice, plays);
    t.fail();
  }
  catch (e) {
    t.is(e.message, 'unknown type: tragedy1');
  }
});


test('should return owe 1730 and earn 47 credits in html type when generate html statement given Customer BigCo has three performances. ' +
  'Hamlet has 55 audiences. ' +
  'As You Like Is has 35 audiences. ' +
  'Othello has 40 audiences. ', t => {

  const invoice = {
    'customer': 'BigCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 55,
      },
      {
        'playID': 'as-like',
        'audience': 35,
      },
      {
        'playID': 'othello',
        'audience': 40,
      },
    ],
  };

  const result = htmlStatement(invoice, plays);
  const expectResult ='<h1>Statement for BigCo</h1>\n' +
                            '<table>\n' +
                            '<tr><th>play</th><th>seats</th><th>cost</th></tr> ' +
                            '<tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n' +
                            ' <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n' +
                            ' <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n' +
                            '</table>\n' +
                            '<p>Amount owed is <em>$1,730.00</em></p>\n' +
                            '<p>You earned <em>47</em> credits</p>\n'
  t.is(result,expectResult );
});

