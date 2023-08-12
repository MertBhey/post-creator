import { Component, For } from "solid-js"

type InputOption = { label: string; value: string; }
interface SelectInputProps {
  options: InputOption[];
  onValueChange: (item: InputOption["value"]) => void;
}

export const SelectInput: Component<SelectInputProps> = props => {
  return (
    <select class="h-10 outline-none w-full bg-tertiary px-3 rounded-lg" onchange={(e) => props.onValueChange(e.target.value)}>
      <option value={""}>Select an overlay image</option>
      <For each={props.options}>
        { (item) => <option value={item.value}>{item.label}</option> }
      </For>
    </select>
  )
}
