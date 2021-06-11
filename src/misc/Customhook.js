import { useCallback, useState ,useEffect} from "react";


export function useModalstate(defaultvalue=false){
  const [isOpen,setisOpen]=useState(defaultvalue)

  const open=useCallback(()=>setisOpen(true),[])
  const close=useCallback(()=>setisOpen(false),[])

  return {isOpen ,open ,close}
}

export const useMediaQuery = query => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = evt => setMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};
