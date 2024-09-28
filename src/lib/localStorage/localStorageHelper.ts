
export function saveToLocalStorage(state: string) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (e) {
        console.warn("Gagal menyimpan state ke localStorage:", e);
    }
}
  
  
export function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) return undefined; 
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Gagal mengambil state dari localStorage:", e);
        return undefined;
    }
}
  