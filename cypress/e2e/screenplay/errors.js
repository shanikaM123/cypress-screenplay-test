class MissingAbilityError extends Error {}

class AbilityRequestError extends Error {
  constructor() {
    super(`Abilities may only be requested in interaction constructors.`);
  }
}

class UnsupportedTaskError extends Error {
  constructor(interactions) {
    super(
      `None of the interaction options is supported by the current actor: ${interactions}`,
    );
  }
}
