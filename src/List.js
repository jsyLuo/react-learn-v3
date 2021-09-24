import React from 'react';
const List = ({ res, children }) =>
  res.map((ele) => {
    return;
    <>
      {children}
      <Item key={ele.objectID} {...ele} />)
    </>;
  });

const List2 = ({ res, onRemoveEle, children }) =>
  res.map((ele) => {
    // console.log('in List2 and this is...', this);
    return (
      <Item
        key={ele.objectID}
        // deleteItem={() => {
        //   onRemoveEle(ele);
        // }}
        // deleteItem={onRemoveEle.bind(this, ele)}
        deleteItem={onRemoveEle.bind(null, ele)}
        {...ele}
      />
    );
  });

const Item = ({ title, url, author, num_comments, points, deleteItem }) => {
  return (
    <div>
      <span style={{ 'margin-right': 30 }}>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
      <button onClick={deleteItem}>delete</button>
    </div>
  );
};

/*
const Item = ({ data: { title, url, author, num_comments, points } }) => {
  return (
    <div>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
    </div>
  );
};
*/
export default List2;
