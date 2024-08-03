export function getNextId(key) {
  let currentId = localStorage.getItem(key) || '0';
  let nextId = parseInt(currentId) + 1;
  localStorage.setItem(key, nextId.toString());
  return nextId;
}