import test from 'node:test';
import assert from 'node:assert/strict';
import { languages, courses, lessons } from '../src/content.js';

test('all five target languages have five dialogues and three lessons', () => {
  assert.deepEqual(Object.keys(languages).sort(), ['de','fr','ja','ko','zh']);
  for (const key of Object.keys(languages)) {
    assert.equal(courses[key].length, 5, `${key} dialogue count`);
    assert.equal(lessons[key].length, 3, `${key} lesson count`);
    for (const dialogue of courses[key]) {
      assert.ok(dialogue.title && dialogue.category && dialogue.lines.length >= 3);
      for (const line of dialogue.lines) {
        assert.equal(line.length, 6);
        assert.ok(line[1] && line[3] && line[4] && line[5]);
      }
      assert.ok(dialogue.lesson.question && dialogue.lesson.choices.length >= 2);
      assert.ok(dialogue.lesson.answer >= 0 && dialogue.lesson.answer < dialogue.lesson.choices.length);
    }
    for (const lesson of lessons[key]) {
      assert.equal(lesson.words.length, 3);
      assert.ok(lesson.q && lesson.choices.length >= 2);
      assert.ok(lesson.answer >= 0 && lesson.answer < lesson.choices.length);
    }
  }
});
