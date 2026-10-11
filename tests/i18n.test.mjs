import test from 'node:test';
import assert from 'node:assert/strict';
import { extraCopy, translateLearningText, mobileNavText } from '../src/locale.js';
import { courses, lessons, languages } from '../src/content.js';

test('English, Spanish, Catalan labels remain aligned', () => {
  const keys = Object.keys(extraCopy.en).sort();
  for(const ui of ['es','ca']) {
    assert.deepEqual(Object.keys(extraCopy[ui]).sort(), keys);
    assert.deepEqual(Object.keys(mobileNavText[ui]).sort(), Object.keys(mobileNavText.en).sort());
    for (const key of keys) assert.ok(extraCopy[ui][key].trim(), `${ui}.${key}`);
  }
});

test('course titles, lesson prompts and questions translate for each interface language', () => {
  assert.equal(translateLearningText('At a café', 'es'), 'En una cafetería');
  assert.equal(translateLearningText('At a café', 'ca'), 'En una cafeteria');
  for(const ui of ['en','es','ca']) {
    for(const language of Object.keys(languages)) {
      for(const d of courses[language]) {
        assert.ok(translateLearningText(d.title, ui));
        assert.ok(translateLearningText(d.lesson.question, ui));
      }
      for(const lesson of lessons[language]) {
        assert.ok(translateLearningText(lesson.desc, ui));
        assert.ok(translateLearningText(lesson.q, ui));
      }
    }
  }
});
