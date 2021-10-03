export type Items = {
  id: string;
  title: string;
  completed: boolean;
};

export type Id = {
  id: string;
};

export type Message = {
  message: string;
}

export type Data = {
  id?: string;
  title: string;
  completed?: boolean;
}

export type StateType = {
  todos: {
    items: Array<Items>;
    activeFilter: string;
  };
};

export interface TodosState {
  error: string | null | undefined
  items: Array<Items>
  activeFilter: string
  isLoading: boolean
  addNewTodoLoading: boolean
  addNewTodoError: string | null | undefined
}