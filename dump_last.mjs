import questions from './src/data/questions.js';

questions.forEach(q => {
  if (q.order >= 20) {
    console.log(`\n=== Exp ${q.order}: ${q.title} ===\n`);
    console.log(q.code);
    console.log('\n--- Explanations ---');
    console.log(JSON.stringify(q.codeExplanation, null, 2));
    console.log('\n--- Important Code ---');
    console.log(JSON.stringify(q.importantCode, null, 2));
    console.log('\n--- Viva Questions ---');
    console.log(JSON.stringify(q.vivaQuestions, null, 2));
  }
});
