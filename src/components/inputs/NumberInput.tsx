import { Component, For } from "solid-js"

interface NumberInputProps {
  onValueChange: (value: number) => void;
  placeholder?: string;
  value?: number | string;
}

export const NumberInput: Component<NumberInputProps> = props => {
  return (
    <input
      type="number"
      class="h-10 outline-none w-full bg-tertiary px-3 py-2 rounded-lg"
      placeholder={props.placeholder || ""}
      value={props.value || 0}
      onChange={(e) => props.onValueChange(Number(e.target.value))}
    />
  )
}
