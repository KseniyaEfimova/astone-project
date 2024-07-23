export const getCharacterImageUrl = (url: string): string => {
  if (!url) {
    return '';
  }
  const id = url.split('/').filter(Boolean).pop();
  return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
};
