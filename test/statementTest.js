const test = require('ava');
const {statement} = require('../src/statement');
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


