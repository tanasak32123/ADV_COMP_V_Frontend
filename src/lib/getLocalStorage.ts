export const getLocalStorage = (key: string) => {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
}