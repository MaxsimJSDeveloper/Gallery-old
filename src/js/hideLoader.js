import { refs } from './refs';

export function hideLoader() {
  return refs.loader.classList.add('hidden');
}
