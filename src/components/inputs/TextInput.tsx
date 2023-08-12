import { Component, For } from "solid-js"

interface TextInputProps {
  onValueChange: (value: string) => void;
  placeholder?: string;
  value?: string;
  type: "textarea" | "input"
}

export const TextInput: Component<TextInputProps> = props => {
  if(props.type === "textarea") {
    return (
      <textarea
        class="h-40 outline-none w-full bg-tertiary px-3 py-2 resize-none rounded-lg"
        placeholder={props.placeholder || ""}
        value={props.value || ""}
        onChange={(e) => props.onValueChange(e.target.value)}
      />
    );
  }

  return (
    <input
      type="text"
      class="h-10 outline-none w-full bg-tertiary px-3 py-2 rounded-lg"
      placeholder={props.placeholder || ""}
      value={props.value || ""}
      onChange={(e) => props.onValueChange(e.target.value)}
    />
  );
}
