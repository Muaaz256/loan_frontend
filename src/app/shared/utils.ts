import {FilterField} from '../models/common';
import {OPERATORS} from './enums';

export function showOrHidePassword(containerClass, variableName, inputFieldId): void {
  const showValue = containerClass[variableName] = !containerClass[variableName];
  const elem = document.getElementById(inputFieldId);
  elem.setAttribute('type', showValue ? 'text' : 'password');
}

export function getFilterLookupExpressions(lookUpObj, lookupMapping): any {
  const lookups = {};
  Object.keys(lookUpObj).forEach(
    key => {
      const expr: string = lookupMapping[key];
      const filterField: FilterField = lookUpObj[key];
      lookups[`${expr}${filterField.lookup}`] = filterField.value;
    }
  );
  return lookups;
}

export function getSelectOptionsForDateAndNumbers(type: string):
  { value: string; label: string; } [] {

  return [
    {
      value: OPERATORS.EXACT,
      label: type === 'date' ? 'On' : 'Equals'
    },
    {
      value: OPERATORS.LT,
      label: type === 'date' ? 'Before (Excluding) ' : 'Less Than'
    },
    {
      value: OPERATORS.LTE,
      label: type === 'date' ? 'Before (Including)' : 'Less Than Or Equals'
    },
    {
      value: OPERATORS.GT,
      label: type === 'date' ? 'After (Excluding)' : 'Greater Than'
    },
    {
      value: OPERATORS.GTE,
      label: type === 'date' ? 'After (Including)' : 'Greater Than Or Equals'
    }
  ];
}
