import questions from './src/data/questions.js';

let issues = 0;

questions.forEach(q => {
  const codeStr = q.code || "";
  
  // check code explanations
  if (q.codeExplanation) {
    q.codeExplanation.forEach((exp, idx) => {
      // we remove some spaces to make matching robust
      const cleanLine = exp.line.trim().replace(/\s+/g, ' ');
      const cleanCode = codeStr.replace(/\s+/g, ' ');
      
      if (!cleanCode.includes(cleanLine) && !codeStr.includes(exp.line.trim())) {
        console.log(`[Exp ${q.order}] Mismatch in codeExplanation[${idx}]:`);
        console.log(`  Line: "${exp.line}"`);
        issues++;
      }
    });
  }

  // check important code
  if (q.importantCode) {
    q.importantCode.forEach((imp, idx) => {
      const cleanSnippet = imp.snippet.trim().replace(/\s+/g, ' ');
      const cleanCode = codeStr.replace(/\s+/g, ' ');
      
      if (!cleanCode.includes(cleanSnippet) && !codeStr.includes(imp.snippet.trim())) {
        console.log(`[Exp ${q.order}] Mismatch in importantCode[${idx}]:`);
        console.log(`  Snippet: "${imp.snippet}"`);
        issues++;
      }
    });
  }
});

if (issues === 0) {
  console.log("No mismatches found!");
} else {
  console.log(`Found ${issues} issues.`);
}
