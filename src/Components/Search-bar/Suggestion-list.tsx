import { Suggestion } from '../../types/star-wars-api-types.ts';
import s from './search-bar.module.css';

interface SuggestionListProps {
  suggestions: Suggestion[];
  onSuggestionClick: (suggestion: Suggestion) => void;
}

const SuggestionList = ({
  suggestions,
  onSuggestionClick,
}: SuggestionListProps) => (
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
