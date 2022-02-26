export const createItem = (dispatchFn: React.Dispatch<React.SetStateAction<any>>, itemAdditionalProps: any) => {
  dispatchFn(
    (prevState: typeof itemAdditionalProps[]) =>
      (prevState = [
        ...prevState,
        {
          ...itemAdditionalProps,
        },
      ])
  );
};
