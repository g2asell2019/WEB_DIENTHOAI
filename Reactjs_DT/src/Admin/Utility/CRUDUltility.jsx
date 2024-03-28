export function validateInput(requiredArgument) {
  let isValid = true;
  let arrInput = requiredArgument;

  for (let i = 0; i < arrInput.length; i++) {
    console.log("check inside loop", this.state[arrInput[i]], arrInput[i]);
    if (!this.state[arrInput[i]]) {
      isValid = false;
      alert("Missing parameter: " + arrInput[i]);
      break;
    }
  }

  return isValid;
}
