import { refs } from './refs';

export function showLoader() {
  return refs.loader.classList.remove('hidden');
}
