const { AbilityType, Actor, isAbilityFactory } = require('./actor');

/**
 * Type definition for task interactions.
 */
const TaskInteraction = {
  invoke(param) {}
};

/**
 * Type definition for tasks.
 *
 * An task is a list of interactions that accept a parameter of type P and don't
 * yield a result, but modify the state as a side effect.
 */
class TaskType {
  constructor(actor) {}
}

/**
 * Shorthand for creating tasks using a specific ability.
 *
 * @param ability
 *   A constructor for an ability service.
 * @param procedure
 *   The procedure to fulfill this task.
 */
function createTask(ability, procedure) {
  return class {
    /**
     * A ability service object to invoke commands on.
     */
    ability;

    /**
     * An actor to perform sub-tasks.
     */
    actor;

    constructor(actor) {
      this.actor = actor;
      this.ability = actor.ability(ability);
    }
    invoke(param) {
      return procedure(
        isAbilityFactory(this.ability) ? this.ability.create() : this.ability,
        param,
      );
    }
  };
}

module.exports = {
  TaskInteraction,
  TaskType,
  createTask,
};
