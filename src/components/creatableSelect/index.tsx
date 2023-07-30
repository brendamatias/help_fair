import ReactCreatableSelect from 'react-select/creatable'

type Option = {
  value: string
  label: string
}

type CreatableSelectProps = {
  options: Option[]
  onCreate: (value: string, newValue?: boolean) => void
}

export const CreatableSelect = ({
  options,
  onCreate,
}: CreatableSelectProps) => {
  return (
    <ReactCreatableSelect
      placeholder="Digite o nome do item"
      isClearable
      onCreateOption={(value) => onCreate(value, true)}
      onChange={(value) => onCreate(value?.label as string, false)}
      options={options}
      classNames={{
        valueContainer: () => 'text-sm px-0',
        control: () => 'h-12 px-3',
        container: () => 'w-full',
      }}
    />
  )
}
