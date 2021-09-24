import React from 'react';
import './test.css';
const Search = ({
  id,
  keyword,
  isFocused,
  type = 'text',
  onSearch,
  children,
}) => {
  const inputRef = React.useRef();
  // console.log('ref value is ...', inputRef);

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      console.log('dom & id', inputRef.current, inputRef.current.id);
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children} </label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={keyword}
        autoFocus={isFocused}
        onChange={onSearch}
      />
      <p className="pinkFont">search for: {keyword}</p>
    </>
  );
};

export default Search;
