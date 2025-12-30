interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBox(props: SearchBoxProps) {
 return <input
   value={props.value}
   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
     const value = event.target.value;
     props.onChange(value);
   }}
 />;
}

export default SearchBox;