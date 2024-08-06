export function getNextId(key) {
  let currentId = localStorage.getItem(key) || '0';
  let nextId = parseInt(currentId) + 1;
  localStorage.setItem(key, nextId.toString());
  return nextId;
}

export function generateTaskId(){
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}`;
}