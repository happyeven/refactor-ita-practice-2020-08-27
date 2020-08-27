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



test('case 1 , bigco without performance ', t => {
  t.true(true);
  t.is(1, 1);
  t.deepEqual({a: 1}, {a: 1});
});

test('case 1 , BigCo without performance ', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances':[],
  };
  const plays = [];

  const result = statement(invoice, plays);
  const expectResult = 'Statement for BigCo\n'+
  'Amount owed is $0.00\n'+
  'You earned 0 credits \n'
  t.is(expectResult, result);
});


