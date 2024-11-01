import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage(() => sessionStorage)

export const sidebarIndexAtom = atomWithStorage('sidebarIndex', 0, storage);

export const booksArrayAtom = atom([]);

export const membersArrayAtom = atom([]);

export const transactionArrayAtom = atom([]);

export const searchTextAtom = atom('');

export const popUpAtom = atom(false);

export const selectedBookObjAtom = atom({});

export const selectedMemberObjAtom = atom({});

export const issueBookAtom = atom(true);

export const returnBooksAtom = atom([]);

export const currentDateAtom = atom('');

export const transactionCompletedAtom = atom(false);

export const openSortPopupAtom = atom(false);

export const openImportPopUpAtom = atom(false);

export const openMemberPopUpAtom = atom(false);

export const editMemberAtom = atom(false);

export const openBookPopUpAtom = atom(false);

export const editBookAtom = atom(false);