import { createContext } from "react";
import { Advice } from "../App";

export const SearchContext = createContext<object[] | string[]>([""]);

export const RandomContext = createContext<Advice>({ id: 0, advice: "" });

export const SaveCondext = createContext<Advice[]>([]);
