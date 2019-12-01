import React, { Dispatch, SetStateAction } from "react";
import AceEditor from "react-ace";
import "./CodeTextArea.scss";

import "brace/mode/html";
import "brace/mode/css";
import "brace/mode/javascript";
import "brace/theme/monokai";

interface ICodeTextAreaProps {
  language: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const CodeTextArea = ({ language, value, setValue }: ICodeTextAreaProps) => {
  return (
    <label className="code-textarea">
      {language.toUpperCase()} code:
      <AceEditor
        mode="javascript"
        theme="monokai"
        name={language}
        value={value}
        onChange={e => setValue(e)}
        editorProps={{ $blockScrolling: true }}
        showGutter={false}
        style={{ width: "100%", minHeight: "15rem", height: "auto" }}
      />
    </label>
  );
};

export default CodeTextArea;
