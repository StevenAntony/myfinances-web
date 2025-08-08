export type AppContextType = {
    setReloadTransaction: (value: boolean) => void;
    reloadTransaction: boolean;
}

export type AppProviderProps = {
    children: ReactNode;
}