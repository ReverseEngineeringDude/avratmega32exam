import questions from './src/data/questions.js';

questions.forEach(q => {
  if ([1, 2].includes(q.order)) {
    console.log(`\n=== Exp ${q.order} ===\n`);
    console.log(q.code);
  }
});
