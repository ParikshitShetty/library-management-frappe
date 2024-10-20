import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage(() => sessionStorage)

export const sidebarIndexState = atomWithStorage('sidebarIndex', 0, storage);