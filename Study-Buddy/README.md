# Study Buddy — AI entrepreneur project

## Problem and market
College students spend time turning dense lecture notes into explanations and practice. Study Buddy offers one focused workspace to explain notes and test recall. Target users are college students revising material. Future business hypothesis: a free limited tier with a paid document/history tier; this MVP makes no revenue or adoption claims.

## Features and flow
Paste notes -> choose Beginner/College/Advanced -> Explain it or Quiz me -> send request -> display explanation or interactive multiple-choice quiz -> grade against generated answer key. Copy and print/PDF are included. Input is limited to 18,000 characters and quizzes to 3, 5, or 8 questions.

## Live setup
Open AI settings. Obtain a Gemini API key at https://aistudio.google.com/apikey, paste it, and keep a model ID available to your account (default gemini-2.5-flash). Keys are held in page memory, cleared on refresh, and sent through the server only for inference. Notes go to Google Gemini. Provider quotas and charges may apply. Do not paste secrets or private records into notes.

## Two prompt engineering patterns
1. Persona: server system instruction makes the model a patient college tutor, adapting vocabulary and complexity to the selected level. It asks for grounded, concise explanations and uncertainty when notes are insufficient.
2. Few-shot: the system instruction contains two concrete input/output examples for explanations and two for quiz questions. These show the desired teaching style, grounded content, distractors, answer indexes, and explanations.
JSON response schemas are an additional formatting technique. User notes are delimited as data and the model is told not to follow instructions inside them. This reduces but does not eliminate prompt injection or hallucinations.

## Presentation / 3-minute demo script
0:00 Problem: Students have notes but need understandable explanations and active practice.
0:25 Solution: Show the two study modes and level selection.
0:40 Live demo: Connect key before presenting. Load MIPS sample; generate explanation. Describe li and bgt using the result.
1:20 Switch to Quiz me. Generate 3 questions, answer, and check score.
1:55 Paste fresh course notes; generate to show dynamic AI integration.
2:20 Explain Persona and Few-shot patterns using the server source and examples.
2:45 Impact: Faster conversion of notes into practice is the intended value; learning gains have not been measured. Future: document uploads, spaced repetition, and saved sessions.

## Verification and limitations
Fixed sample mode is rehearsal content, not generative AI, and accepts only the supplied MIPS sample. A real key and successful live request are required to demonstrate the assignment's AI integration. Live inference cannot be verified without a user key. Model outputs can be wrong; quiz scores compare selections with the generated key. No progress history or file uploads. The app does not store notes or keys; upstream providers may process requests under their own policies.

## Source and local operation
worker/index.js exports a standards-based Worker fetch handler; no third-party runtime packages. scripts/build.sh and scripts/validate-artifact.mjs package and validate deployment. To run locally with Node 22+, use node scripts/local-server.mjs then visit http://localhost:8080. Run node --test tests/app.test.mjs for request validation, prompt/schema construction, provider errors, and output validation using mocked inference. Tests do not measure live model quality.

## Evaluation ideas
Use unfamiliar notes, verify each generated claim against the source, check that quizzes have exactly one intended answer, compare levels, and test empty input, invalid credentials, and quota errors. Do not claim hallucination-free outputs.

## API reference
https://ai.google.dev/api/generate-content
https://ai.google.dev/gemini-api/docs/generate-content/structured-output
