// // src/redux/hooks.ts
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import type { RootStateType, AppDispatch } from "../redux/store";

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;



import { useDispatch, useSelector } from "react-redux";
import type { RootStateType, AppDispatch } from "../redux/store";

// Typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed selector
export const useAppSelector = <TSelected>(
  selector: (state: RootStateType) => TSelected
) => useSelector(selector);
