'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const filteredMan = people.filter(person => person.sex === 'm');
  let manGroup;

  century === undefined
    ? manGroup = filteredMan
    : manGroup = filteredMan.filter(centuryDied =>
      Math.ceil(centuryDied.died / 100) === century);

  const averageAge = +((manGroup
    .map(age => age.died - age.born)
    .reduce((a, b) => a + b, 0)) / manGroup.length)
    .toFixed(2);

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filteredWomen = people.filter(person => person.sex === 'f');
  let womenGroup;

  withChildren === undefined
    ? womenGroup = filteredWomen
    : womenGroup = filteredWomen
      .filter(ismother => people
        .some(person => ismother.name === person.mother));

  const averageAge = +((womenGroup
    .map(age => age.died - age.born)
    .reduce((a, b) => a + b, 0)) / womenGroup.length)
    .toFixed(2);

  return averageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const kids = people
    .filter(child => {
      const trueMother = people.some(person => child.mother === person.name);
      const isSon = child.sex === 'm';

      return onlyWithSon ? isSon && trueMother : trueMother;
    });

  const ageDifference = kids.reduce((differentSum, child) => {
    const mother = people.find(mom => mom.name === child.mother);
    const difference = child.born - mother.born;

    return differentSum + difference;
  }, 0) / kids.length;

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
