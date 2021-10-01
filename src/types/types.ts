export type Items = {
  id: string;
  title: string;
  completed: boolean;
};

export type Id = {
  id: string;
};

export type StateType = {
  todos: {
    items: Array<Items>;
    activeFilter: string;
  };
};