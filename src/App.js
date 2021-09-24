import React from 'react';
import './style.css';
import List from './List';
import Search from './Search';

export default function App() {
  const [itemValue, setItemValue] = React.useState(
    localStorage.getItem('searchKey') || 'x'
  );

  const initStories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  // const [stories, setStories] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [isError, setIsError] = React.useState(false);

  const storiesReducer = (state, action) => {
    switch (action.type) {
      case 'INIT_STORIES':
        return {
          ...state,
          isError: false,
          isLoading: true,
        };
      case 'FETCH_STORIES_SUCCESS':
        return {
          ...state,
          isError: false,
          isLoading: false,
          data: action.payload,
        };
      case 'FETCH_STORIES_FAILED':
        return {
          ...state,
          isError: true,
          isLoading: false,
          data: [],
        };
      case 'REMOVE_STORIES':
        return {
          ...state,
          data: state.data.filter(
            (ele) => ele.objectID !== action.payload.objectID
          ),
        };
      default:
        throw new Error('12345');
    }
  };

  const [storiesStateObj, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  // const getAsyncData = () => Promise.resolve(initStories);
  const getAsyncData = () =>
    new Promise((resolve, reject) => setTimeout(reject(), 2000));
  React.useEffect(() => {
    // setIsLoading(true);
    //setTimeout(() => {
    dispatchStories({
      type: 'INIT_STORIES',
    });
    getAsyncData()
      .then((result) => {
        //  setStories(result);
        dispatchStories({
          type: 'FETCH_STORIES_SUCCESS',
          payload: result,
          other: [
            {
              title: 'dahui',
              url: 'https://redux.js.org/',
              author: 'test paragragh',
              num_comments: 2,
              points: 5,
              objectID: 10,
            },
          ],
        });
        // setIsLoading(false);
      })
      .catch(() =>
        // dispatchStories('FETCH_STORIES_FAILED')
        // setIsError(true)
        dispatchStories({
          type: 'FETCH_STORIES_FAILED',
        })
      );
    //}, 2000);
  }, []);

  const recieveFromChild = (e) => {
    setItemValue(e.target.value);
  };
  const filterArr = storiesStateObj.data.filter((ele) =>
    ele.title.toLowerCase().includes(itemValue.toLowerCase())
  );

  const MyHello = () => 'hello wolrd';

  React.useEffect(() => {
    localStorage.setItem('searchKey', itemValue);
  }, [itemValue]); //换成[]看看效果

  const handleRemoveEle = (ele) => {
    // const newStories = stories.filter((e) => e.objectID !== ele.objectID);

    // dispatchStories({
    //   type: 'SET_STORIES',
    //   payload: newStories,
    // });
    // setStories(newStories);

    dispatchStories({
      type: 'REMOVE_STORIES',
      payload: ele, //{ objectID: ele.objectID },
    });
  };

  return (
    <div>
      <Search
        id="dahui"
        isFocused
        onSearch={recieveFromChild}
        keyword={itemValue}
      >
        <strong>search keyword:</strong>{' '}
      </Search>

      {storiesStateObj.isError && <p> sth is error </p>}
      {storiesStateObj.isLoading ? (
        <p>加载中……</p>
      ) : (
        <List res={filterArr} onRemoveEle={handleRemoveEle}>
          {MyHello}
        </List>
      )}
    </div>
  );
}
