export function showEndOfCollectionMessage() {
  iziToast.error({
    title: 'Error',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topCenter',
  });
}
