// import { useNavigate } from 'react-router-dom';
// import useSearchHistory from './useSearchHistory';
// import s from './history.module.css';

// const History = () => {
//   const { searchHistory, removeSearchQuery } = useSearchHistory();
//   const navigate = useNavigate();

//   const handleSearchClick = (searchUrl: string) => {
//     navigate(searchUrl);
//   };

//   const getQueryFromUrl = (url: string) => {
//     const searchParams = new URLSearchParams(url.split('?')[1]);
//     return searchParams.get('q') || '';
//   };

//   return (
//     <div className={s['history-page']}>
//       <h2>Search History</h2>
//       {searchHistory.length === 0 ? (
//         <p>No search history yet</p>
//       ) : (
//         <ul className={s['history-list']}>
//           {searchHistory.map((searchUrl, index) => (
//             <li key={index} className={s['history-item']}>
//               <span
//                 onClick={() => handleSearchClick(searchUrl)}
//                 className={s['history-link']}
//               >
//                 {getQueryFromUrl(searchUrl)}
//               </span>
//               <button
//                 onClick={() => removeSearchQuery(searchUrl)}
//                 className={s['remove-button']}
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default History;

import { useNavigate } from 'react-router-dom';
import useSearchHistory from './useSearchHistory';
import s from './history.module.css';

const History = () => {
  const { searchHistory, removeSearchQuery } = useSearchHistory();
  const navigate = useNavigate();

  const handleSearchClick = (searchUrl: string) => {
    navigate(searchUrl);
  };

  const getQueryFromUrl = (url: string) => {
    const searchParams = new URLSearchParams(url.split('?')[1]);
    return searchParams.get('q') || '';
  };

  return (
    <div className={s['history-page']}>
      <h2>Search History</h2>
      {searchHistory.length === 0 ? (
        <p>No search history yet</p>
      ) : (
        <ul className={s['history-list']}>
          {searchHistory.map((searchUrl, index) => (
            <li key={index} className={s['history-item']}>
              <span
                onClick={() => handleSearchClick(searchUrl)}
                className={s['history-link']}
              >
                {getQueryFromUrl(searchUrl)}
              </span>
              <button
                onClick={() => removeSearchQuery(searchUrl)}
                className={s['remove-button']}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
