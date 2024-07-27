import { useAuth } from '../../Authentication/Auth-context';
import { useNavigate } from 'react-router-dom';

interface FavoriteButtonProps {
  characterId: string;
  isInFavorites: boolean;
  onAddFavorite: (id: string) => void;
  onRemoveFavorite: (id: string) => void;
}

const FavoriteButton = ({
  characterId,
  isInFavorites,
  onAddFavorite,
  onRemoveFavorite,
}: FavoriteButtonProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleFavoriteAction = () => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    if (isInFavorites) {
      onRemoveFavorite(characterId);
    } else {
      onAddFavorite(characterId);
    }
  };

  return (
    <button onClick={handleFavoriteAction}>
      {isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
    </button>
  );
};

export default FavoriteButton;
