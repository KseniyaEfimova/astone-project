import React from 'react';
import { Suggestion } from '../../types/star-wars-api-types.ts';
import s from './search-bar.module.css'; // TODO: css

interface SuggestionListProps {
  suggestions: Suggestion[];
  onSuggestionClick: (suggestion: Suggestion) => void;
}

const SuggestionList: React.FC<SuggestionListProps> = ({
  suggestions,
  onSuggestionClick,
}) => (
  <ul className={s.suggestions}>
    {suggestions.map((suggestion: Suggestion) => (
      <li
        key={suggestion.id}
        onClick={() => onSuggestionClick(suggestion)}
        className={s.suggestionItem}
      >
        {suggestion.name}
      </li>
    ))}
  </ul>
);

export default SuggestionList;
