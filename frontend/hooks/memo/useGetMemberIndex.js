import { useMemo } from 'react';

export default function useGetMemberIndex({ selectedMemberObj, members}){
    const memberIndex = useMemo(() => {
        if (selectedMemberObj.id){
          const index = members.findIndex(book => book.name === selectedMemberObj.name);
          return index;
        } else return members.length;
    },[selectedMemberObj]);
    return memberIndex;
}