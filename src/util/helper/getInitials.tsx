export const getInitials = (name: string): string => {
  if (!name) return "";

  const initials = name.match(/\b\w/g) || [];
  return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
};
