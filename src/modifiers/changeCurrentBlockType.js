import { EditorState, Modifier, RichUtils, } from 'draft-js';

const changeCurrentBlockType = (editorState, type) => {
  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const newSelection = selection.merge({
    anchorOffset: 0,
    focusOffset: selection.focusOffset,
  });
  const newContentState = Modifier.removeRange(currentContent, newSelection, 'backward');
  const newEditorState = EditorState.push(editorState, newContentState, 'backspace-character');
  return RichUtils.toggleBlockType(newEditorState, type);
};

export default changeCurrentBlockType;
