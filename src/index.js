import React from 'react';

import handleBlockType from './modifiers/handleBlockType';
import handleInlineStyle from './modifiers/handleInlineStyle';

function checkCharacterForState(editorState, character) {
  let newEditorState = handleBlockType(editorState, character);
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getStartKey();
  const currentBlock = contentState.getBlockForKey(key);
  const type = currentBlock.getType();

  if (editorState === newEditorState && type !== 'code-block') {
    newEditorState = handleInlineStyle(editorState, character);
  }
  return newEditorState;
}

const createMarkdownShortcutsPlugin = (config = { insertEmptyBlockOnReturnWithModifierKey: true }) => {
  const store = {};
  return {
    store,
    initialize({ setEditorState, getEditorState }) {
      store.setEditorState = setEditorState;
      store.getEditorState = getEditorState;
    },
    handleBeforeInput(character, editorState, _, { setEditorState }) {
      if (character.match(/[A-z0-9_*~`]/)) {
        return 'not-handled';
      }
      const newEditorState = checkCharacterForState(editorState, character);
      if (editorState !== newEditorState) {
        setEditorState(newEditorState);
        return 'handled';
      }
      return 'not-handled';
    },
  };
};

export default createMarkdownShortcutsPlugin;
