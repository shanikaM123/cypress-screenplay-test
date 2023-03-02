const { AbilityType, Actor, isAbilityFactory } = require('./actor');

/**
 * Type definition for question interactions.
 */
class QuestionInteraction {
  constructor(actor) {
    this.actor = actor;
  }

  invoke(param, assert) {
    throw new Error("Method not implemented.");
  }
}

/**
 * Type definition for questions.
 *
 * An question is a list of interactions that accept a parameter of type P and
 * and accept an assertion callback of type R.
 */
class QuestionType {
  constructor(actor) {
    this.actor = actor;
  }

  invoke(param, assert) {
    throw new Error("Method not implemented.");
  }
}
QuestionType.prototype = Object.create(QuestionInteraction.prototype);

/**
 * Shorthand for creating questions using a specific ability.
 *
 * @param ability
 *   A constructor for an ability service.
 * @param procedure
 *   The procedure to answer this question.
 */
function createQuestion(ability, procedure) {
  return class extends QuestionInteraction {
    /**
     * A ability service object to invoke commands on.
     */
    ability;

    /**
     * An actor to perform sub-tasks.
     */
    actor;

    constructor(actor) {
      super(actor);
      this.actor = actor;
      this.ability = actor.ability(ability);
    }

    invoke(param, assert) {
      if (this.ability) {
        procedure(
          isAbilityFactory(this.ability) ? this.ability.create() : this.ability,
          param,
          assert,
        );
      }
    }
  };
}

module.exports = {
  QuestionInteraction,
  QuestionType,
  createQuestion,
};
