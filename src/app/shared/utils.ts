export function showOrHidePassword(containerClass, variableName, inputFieldId): void {
  const showValue = containerClass[variableName] = !containerClass[variableName];
  const elem = document.getElementById(inputFieldId);
  elem.setAttribute('type', showValue ? 'text' : 'password');
}
