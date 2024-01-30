import InfoSpeaker from "../classes/InfoSpeaker.js";
import InputError from "../classes/InputError.js";
import OperationFailed from "../classes/OperationFailed.js";

function useRightErrorSpeak(err) {
  if (err instanceof TypeError || err instanceof InputError) {
    InfoSpeaker.invaldInput(err.message);
  }
  if (err instanceof OperationFailed) {
    InfoSpeaker.error();
  }
}

export default useRightErrorSpeak;
