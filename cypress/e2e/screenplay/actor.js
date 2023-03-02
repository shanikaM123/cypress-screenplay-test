import { AbilityRequestError, MissingAbilityError, UnsupportedTaskError } from './errors';
import { Question } from '../screenplayPages/question';
import { Task } from '../screenplayPages/task';

function hasThenProperty(obj) {
  return !!obj.then;
}

function isPromise(value) {
  return typeof value === 'object' && hasThenProperty(value) && typeof value.then === 'function';
}

export const isAbilityFactory = (ability) =>
  typeof ability === 'object' && typeof ability.create === 'function';

export class Actor {
  constructor(abilities) {
    this.abilities = abilities;
    this.preparing = false;
  }

  ability(type) {
    if (!this.preparing) {
      throw new AbilityRequestError();
    }

    const ability = this.abilities.filter(
      (ability) => ability.constructor.name === type.prototype.constructor.name
    ).shift();

    if (!ability) {
      throw new MissingAbilityError();
    }

    return ability;
  }

  prepare(interactions) {
    this.preparing = true;

    const executor = (
      interactions instanceof Array ? interactions : [interactions]
    )
      .map((interaction) => {
        try {
          return new interaction(this);
        } catch (err) {
          if (err instanceof MissingAbilityError) {
            return null;
          }
          throw err;
        }
      })
      .filter((executor) => executor !== null)
      .shift();

    this.preparing = false;

    if (executor === undefined || executor === null) {
      throw new UnsupportedTaskError(
        (interactions instanceof Array ? interactions : [interactions]).map(
          (interaction) => interaction.prototype.constructor.name,
        ),
      );
    }

    return executor;
  }

  async perform(task, param) {
    const result = this.prepare(task).invoke(param);
    if (isPromise(result)) {
      return new Promise((resolve, reject) => {
        result.then(() => resolve(this)).catch(reject);
      });
    } else {
      return new Promise((resolve) => {
        resolve(this);
      });
    }
  }

  ask(question, param, assert) {
    this.prepare(question).invoke(param, assert);
    return this;
  }
}
