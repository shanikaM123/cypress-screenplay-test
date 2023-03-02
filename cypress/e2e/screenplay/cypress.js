const { AbilityFactory } = require('./actor');
const { createQuestion, QuestionProcedure } = require('./question');
const { createTask, TaskProcedure } = require('./task');

/**
 * Cypress ability base class.
 */
class UseCypress {
  create() {
    return cy;
  }
}

function createCypressTask(procedure) {
  return createTask(UseCypress, procedure);
}

function createCypressQuestion(procedure) {
  return createQuestion(UseCypress, procedure);
}

module.exports = {
  UseCypress,
  createCypressTask,
  createCypressQuestion,
};
