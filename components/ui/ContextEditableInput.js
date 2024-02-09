import React from "react";
import PropTypes from "prop-types";
import { useModes, useSlide, useContext } from "@livepreso/content-react";
import { EditableInput } from "./EditableInput";

function useEditableReadOnly(allowedModes) {
  const { isPresomanager, isScreenshot, isRemote, isShareOnline, isReadOnly, isPreview, isPresent, isReview } =
    useModes();

  // Safe to say it's read only in these modes
  if (isPresomanager || isScreenshot || isRemote || isShareOnline || isReadOnly) {
    return true;
  }

  if (isPreview && !allowedModes.includes("prep")) {
    return true;
  }

  if (isPresent && !allowedModes.includes("present")) {
    return true;
  }

  if (isReview && !allowedModes.includes("review")) {
    return true;
  }

  return false;
}

export function ContextEditableInput({ id, tagName, allowedModes, children }) {
  const { slideKey } = useSlide();
  const [value, setValue] = useContext(`context-editables.${slideKey}.${id}`);

  const readOnly = useEditableReadOnly(allowedModes);

  return (
    <div>
      <EditableInput
        tagName={tagName}
        readOnly={readOnly}
        value={value ?? children}
        onChange={(val) => {
          setValue(val);
        }}
      />
    </div>
  );
}

ContextEditableInput.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  tagName: EditableInput.propTypes.tagName,
  allowedModes: PropTypes.arrayOf(PropTypes.oneOf(["prep", "present", "review"])),
};

ContextEditableInput.defaultProps = {
  children: "",
  tagName: EditableInput.defaultProps.tagName,
  allowedModes: ["prep"],
};
