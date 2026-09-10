import questions from './src/data/questions.js';

const targetIds = [1, 2, 4, 5, 6, 8, 15, 24];

questions.forEach(q => {
  if (targetIds.includes(q.order)) {
    console.log(`\n=== Exp ${q.order} ===\n`);
    console.log(q.code);
    console.log('\n--- Explanations ---');
    console.log(JSON.stringify(q.codeExplanation, null, 2));
    console.log('\n--- Important Code ---');
    console.log(JSON.stringify(q.importantCode, null, 2));
  }
});
